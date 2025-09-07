---
title: "Releasing geminilive4s 0.3.0"
description: "Let Gemini start the conversation + manual voice activity"
pubDate: "2025-09-07"
heroImage: ../../assets/geminilive4s-intro/post_photo.png
---

If you haven't, check out the release post: [Introducing geminilive4s ](https://alexitc.com/blog/2025-08-25-introducing-geminilive4s/).

Today, [geminilive4s 0.3.0](https://github.com/AlexITC/geminilive4s/releases/tag/v0.3.0) has been released, which simplfies the usage API while introducing a few useful changes:

1. Let Gemini start the conversation.
2. Manual voice activity.

Let's dive into them.

### Let Gemini start the conversation

Imagine that you are building a support agent phone line, typically, as long as the call is connected, you would hear the sound from the agent to explain you what's going on. Still, Gemini has to wait for messages before speaking. Yes, even if there goes 30 seconds with no input, Gemini will wait patiently.

Now, setting `geminiMustSpeakFirst = true` causes Gemini to start the conversation, this is done by sending a `Hello` message automatically after starting the conversation, this simple trick has worked surprisignly well: 

```scala
gemini.conversationPipe(geminiMustSpeakFirst = true)
```


### Manual voice activity

Gemini has Voice Activity Detection enabled by default which means that Gemini stops speaking when it detects that the user is speaking 
(see [Change voice activity detection settings](https://cloud.google.com/vertex-ai/generative-ai/docs/live-api/streamed-conversations#voice-activity-detection)), still, there could be scenarios where this needs to be handled outside of Gemini, which can be done by setting `disableAutomaticActivityDetection = true`:

```scala
  val config = GeminiConfig(
    ...
    // We disable the automatic voice detection since we are sending manual signals
    disableAutomaticActivityDetection = true,
    // required to disable VAD
    customApiVersion = Some(GeminiCustomApi.V1Alpha)
  )
```

This requires sending the activity `Start` to let Gemini know that a user started speaking, and, activity `End` to signal that the user stopped speaking and its now Gemini's turn:

```scala
  // user started speaking
  GeminiInputChunk(new Array(0), Some(GeminiInputChunk.ActivityEvent.Start))

  // user is done speaking
  GeminiInputChunk(new Array(0), Some(GeminiInputChunk.ActivityEvent.Start))
```

This also requires listening to Gemini output events for the `turnComplete` flag set to `true` which Gemini uses to signal that it is done speaking, in this example, we listen to Gemini's output, signaling the activity `Start` event when Gemini completed its turn, which causes Gemini to pay attention to the user:

```scala
  geminiOutputStream
    .filter(_.turnComplete)
    .map { _ =>
      GeminiInputChunk(
        new Array(0),
        Some(GeminiInputChunk.ActivityEvent.Start)
      )
    }
    .through(startTurnTopic.publish)
```

This snippet is part of a new example where the user signals that it is done speaking by pressing `Enter`: [TakeManualTurns.scala](https://github.com/AlexITC/geminilive4s/blob/f3aba11e0c6bd0995ad70253e50c42182063137d/examples/TakeManualTurns.scala)



```shell
✅ Connected to Gemini Live API
Microphone recording started...
Speaker started...
Sending wake up signal
🤖 Gemini has finished speaking. You can speak now. Press [ENTER] when you are done

🤫 You manually ended your turn. Gemini is now responding...
🤖 Gemini has finished speaking. You can speak now. Press [ENTER] when you are done

🤫 You manually ended your turn. Gemini is now responding...
🤖 Gemini has finished speaking. You can speak now. Press [ENTER] when you are done

🤫 You manually ended your turn. Gemini is now responding...
🤖 Gemini has finished speaking. You can speak now. Press [ENTER] when you are done

🤫 You manually ended your turn. Gemini is now responding...
🤖 Gemini has finished speaking. You can speak now. Press [ENTER] when you are done

🤫 You manually ended your turn. Gemini is now responding...
🤖 Gemini has finished speaking. You can speak now. Press [ENTER] when you are done
```

### Bonus
With these changes, it is possible to put Gemini on both sides, here they are discussing about Laminar vs Slinky for Scala.js:

[laminar-vs-slinky.mp3](/posts/geminilive4s-0-3-0/laminar-vs-slinky.mp3)
