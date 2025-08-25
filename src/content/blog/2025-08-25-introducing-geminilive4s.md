---
title: "Introducing geminilive4s"
description: "A library for interacting with Gemini Live API through Scala"
pubDate: "2025-08-25"
heroImage: ../../assets/geminilive4s-intro/post_photo.png
---

Scala is the most beautiful language I have worked with, it is specially powerful to build the trendy AI integrations we see everyday, Scala is superior to Python in almost every way, but, we don't have the tooling Python has for AI.

> For the impatient, this is the link to [geminilive4s](https://github.com/AlexITC/geminilive4s)

It's been some time since I started playing with audio processing through AI, so far, the most pragmatic tool I have found is [Google's Gemini](https://gemini.google.com/) which exposes [Gemini Live API](https://ai.google.dev/gemini-api/docs/live).

While Gemini Live API is available through the [google-genai](https://cloud.google.com/vertex-ai/generative-ai/docs/sdks/overview) SDK, it exposes a Java SDK which we can use from Scala.

If you go down this path, you will quickly realize that many of the docs do not have examples for Java, and, the API does not provide a nice experience.

I could have gone the usual way and pick Python which would have allowed me to run my experiments in a considerably shorter time, instead, I have decided to build something others can reuse in Scala with the hope see more Scala AI experiments.

The first time I got to use Gemini SDK, I created a few Scala abstractions which were difficult to use and maintain, gladly, I have got this to a decent shape that can be wrapped into a library.

This is how a minimal application looks like:

```scala
import cats.effect.{IO, IOApp}
import com.alexitc.geminilive4s.GeminiService
import com.alexitc.geminilive4s.demo.{MicSource, SpeakerSink}
import com.alexitc.geminilive4s.models.{AudioStreamFormat, GeminiPromptSettings}

object MinimalDemo extends IOApp.Simple {
  val promptSettings = GeminiPromptSettings(
    prompt = "You are a comedian and your goal is making me laugh"
  )

  override def run: IO[Unit] = {
    val audioFormat = AudioStreamFormat.GeminiOutput
    val pipeline = for {
      gemini <- GeminiService.make(
        apiKey = sys.env("GEMINI_API_KEY"),
        promptSettings = promptSettings,
        functions = List.empty
      )
      micStream = MicSource.stream(audioFormat)
      speaker = SpeakerSink.open(audioFormat)

      _ <- micStream
        .through(gemini.conversationPipe) // mic to gemini
        .foreach { chunk =>
          // gemini to speaker
          IO.blocking(speaker.write(chunk.chunk, 0, chunk.chunk.length)).void
        }
    } yield ()

    pipeline.compile.drain
  }
}
```

Beautiful, isn't it?

```shell
# try it yourself with https://scala-cli.virtuslab.org
scala-cli https://raw.githubusercontent.com/AlexITC/geminilive4s/refs/heads/main/examples/MinimalDemo.scala
```

The audio pipeline is clean and composable but the key part is that it allows [Automatic Function Calling](https://ai.google.dev/gemini-api/docs/function-calling) -let Gemini invoke Scala functions-.

This is how to define a function that terminates the process when Gemini decides, extracting a `summary` from the conversation:

```scala
  def makeGeminiFunction(haltProcess: IO[Unit]): GeminiFunction = {
    GeminiFunction(
      declaration = genai.types.FunctionDeclaration
        .builder()
        .name("process_completed")
        .description(
          "Complete the process when the user say bye or similar, make sure to include the summary you captured"
        )
        .parameters(
          genai.types.Schema
            .builder()
            .`type`(genai.types.Type.Known.OBJECT)
            .properties(
              Map(
                "summary" -> genai.types.Schema
                  .builder()
                  .`type`(genai.types.Type.Known.STRING)
                  .example(
                    "Today was a great day because we got a lot of sunlight."
                  )
                  .description("The summary from the conversation")
                  .build()
              ).asJava
            )
            .required("summary")
            .build()
        )
        .build(),
      executor = invocation =>
        val summary = invocation.args.get("summary")
        IO.println(s"Process completed, summary: $summary") >>
          haltProcess.as(Map("response" -> "ok", "scheduling" -> "INTERRUPT"))
    )
  }
```

```shell
# Try it with:
scala-cli https://raw.githubusercontent.com/AlexITC/geminilive4s/refs/heads/main/examples/NoteTakerDemo.scala
```

I know, we need to deal with the untyped world from Gemini's SDK but this is a nice trade-off to keep the library being flexible enough to support everything Gemini API supports without re-defining the whole Gemini API in Scala.

Let me know what you build on top of [geminilive4s](https://github.com/AlexITC/geminilive4s)!
