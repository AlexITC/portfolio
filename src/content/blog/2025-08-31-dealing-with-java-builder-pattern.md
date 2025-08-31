---
title: "Dealing with Java builder's pattern"
description: "Explores a nice alternative to deal with Java builder's pattern in Scala"
pubDate: "2025-08-31"
heroImage: ../../assets/dealing-with-java-builder-pattern/post_photo.jpeg
---

If you have been using Java libraries for a while, I'm confident that code like this looks familiar to you, right?

```scala
genai.types.LiveConnectConfig
  .builder()
  .inputAudioTranscription(
    genai.types.AudioTranscriptionConfig.builder().build()
  )
  .outputAudioTranscription(
    genai.types.AudioTranscriptionConfig.builder().build()
  )
  .responseModalities(genai.types.Modality.Known.AUDIO)
  .systemInstruction(...)
  .speechConfig(...)
  .tools(tool)
  .temperature(0.7f)
  .enableAffectiveDialog(true)
  .proactivity(
    genai.types.ProactivityConfig.builder().proactiveAudio(true).build()
  )
  .build()
```

> Snippet from [geminilive4s-0.2.0](https://github.com/AlexITC/geminilive4s/blob/b1021c643db573a90443f1f0c1ecea4fa7c674b6/audio/src/main/scala/com/alexitc/geminilive4s/GeminiService.scala#L189-L233)

Given that `geminilive4s` is a library, it can't assume that everyone using it requires the same set of arguments, if I wanted to allow configuring `proactivity`, I could surely receive that as an argument and just do this:

```scala
.proactivity(
  genai.types.ProactivityConfig.builder().proactiveAudio(proactiveAudio).build()
)
```

Not so fast, Google's `genai` crashes at runtime because it does not like getting unexpected parameters:

```log
[info] Live session closed with code: 1007 and reason: Invalid JSON payload received. Unknown name "proactivity" at 'setup': Cannot find field.
[error] com.google.genai.errors.GenAiIOException: WebSocket closed unexpectedly: Invalid JSON payload received. Unknown name "proactivity" at 'setup': Cannot find field.
[error] 	at com.google.genai.AsyncLive$GenAiWebSocketClient.onClose(AsyncLive.java:234)
[error] 	at org.java_websocket.client.WebSocketClient.onWebsocketClose(WebSocketClient.java:688)
[error] 	at org.java_websocket.WebSocketImpl.closeConnection(WebSocketImpl.java:557)
[error] 	at org.java_websocket.WebSocketImpl.eot(WebSocketImpl.java:612)
[error] 	at org.java_websocket.client.WebSocketClient.run(WebSocketClient.java:546)
[error] 	at java.base/java.lang.Thread.run(Thread.java:1583)
```

This fails because the parameter is only accepted when `v1alpha` API is enabled, the same problem occurs if I want to conditionally enable transcripts like:

```scala
...
.inputAudioTranscription(
  genai.types.AudioTranscriptionConfig.builder().build()
)
```

A typical way to resolve this is by using a base builder + the mutation applied conditionally, like:

```scala
// apply the default values
val base = genai.types.LiveConnectConfig.builder()

if (proactiveAudio)
  base.proactivity(
    genai.types.ProactivityConfig.builder().proactiveAudio(proactiveAudio).build()
  )
else base
```

But, we have a ton of configurable arguments, it is insane to write `base` then `baseWithProactivity` then `baseWithTranscription` and so on.

We'll overcome to this by leveraging Scala functions, let's define a transformation function that conditionally applies a given change to the builder object:

```scala
type Builder = LiveConnectConfig.Builder
def transform(when: Boolean)(f: Builder => Builder)(builder: Builder): Builder =
  if (when) f(builder)
  else builder

```

Then, we can define all conditional transformations:

```scala
val options = List(
  transform(params.disableAutomaticActivityDetection)(
    _.realtimeInputConfig(
      RealtimeInputConfig
        .builder()
        .automaticActivityDetection(
          AutomaticActivityDetection.builder().disabled(true).build()
        )
        .build()
    )
  ),
  transform(params.inputAudioTranscription)(
    _.inputAudioTranscription(AudioTranscriptionConfig.builder().build())
  ),
  transform(params.outputAudioTranscription)(
    _.outputAudioTranscription(AudioTranscriptionConfig.builder().build())
  ),
  transform(params.enableAffectiveDialog)(_.enableAffectiveDialog(true)),
  transform(params.proactivity)(
    _.proactivity(ProactivityConfig.builder().proactiveAudio(true).build())
  )
)
```

Finally, we apply these transformations sequentially:

```scala
// apply the default values
val base = genai.types.LiveConnectConfig.builder()

options
  .foldLeft(base) { case (builder, apply) => apply(builder) }
  .build()
```

The nice builder usage now looks like this:

```scala
def make(params: GeminiConfig): LiveConnectConfig = {
  def transform(when: Boolean)(
      f: LiveConnectConfig.Builder => LiveConnectConfig.Builder
  )(builder: LiveConnectConfig.Builder): LiveConnectConfig.Builder = {
    if (when) f(builder) else builder
  }

  val options = List(
    transform(params.outputAudioTranscription)(
      _.outputAudioTranscription(AudioTranscriptionConfig.builder().build())
    ),
    transform(params.enableAffectiveDialog)(_.enableAffectiveDialog(true)),
    // ... more transformation follow
  )

  val base = LiveConnectConfig
    .builder()
    .responseModalities(Modality.Known.AUDIO)
    // ... more defaults follow

  options
    .foldLeft(base) { case (builder, apply) => apply(builder) }
    .build()
}
```

> Snippet from [geminilive4s snapshot](https://github.com/AlexITC/geminilive4s/blob/0b91da2c186b2004ce352b3f67b62189c7707e13/audio/src/main/scala/com/alexitc/geminilive4s/internal/GeminiLiveConfigBuilder.scala)

Like you can see, we can now easily extend this to support more configuration options while keeping code readable.
