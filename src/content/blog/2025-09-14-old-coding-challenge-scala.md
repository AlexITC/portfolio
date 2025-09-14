---
title: "An old coding challenge I resolved with Scala"
description: "Details about an old coding challenge which I resolved with Scala"
pubDate: "2025-09-14"
heroImage: ../../assets/old-coding-challenge-scala/post_photo.png
---

It is well-known that take-home tests/coding challenges are a normal requirement when interviewing for Software Engineer roles, it is yet to be seen whether AI will cause these to be removed...

While many of these challenges require you to resolve them with a given language, many others allow you to use anything.

A long time ago I received a HackerRank challenge where Scala was accepted, the goal was writing code that reads data from stdin and prints the result to stdout (similar to the way how programming competitions work).

While the team I was applying to did not use Scala, I took my chances with it, and, I was glad to see that my solution was well-received:

> "an exceedingly well documented and structured solution"

> "Very impressive piece of work"

This post walks through this coding challenge that I worked on ~7 years ago.

### The problem

While I saved only the code, AI was able to generate a similar problem description:

#### CSS Selector Matching

You are given a simplified DOM tree and a list of CSS selectors.

Your task is to count how many elements match each selector.

The DOM tree is given as JSON with these fields:

- tag (string, always present)
- id (string or null)
- classes (array of strings, may be empty)
- children (array of child nodes)

A selector can contain:

- A tag name (e.g. `div`)
- An id, starting with # (e.g. `#main`)
- One or more classes, starting with . (e.g. `.item.active`)

Selectors can be combined with spaces for descendant matching, e.g.

- `div p` -> any `<p>` inside a `<div>` (at any depth).

An element matches a selector if:

- Its tag matches (if specified).
- Its id matches (if specified).
- It contains all listed classes.

The input is a JSON object with:

- hierarchy: the DOM tree (root element).
- tests: an array of selectors (strings).

The output is an array of integers, one for each selector, representing the number of matching elements.

Example input:

```json
{
  "hierarchy": {
    "tag": "body",
    "id": null,
    "classes": [],
    "children": [
      {
        "tag": "div",
        "id": "content",
        "classes": ["container"],
        "children": [
          { "tag": "p", "id": null, "classes": ["text"], "children": [] }
        ]
      }
    ]
  },
  "tests": ["p", "div p", "#content .text"]
}
```

Example output:

- `[1,1,1]`

Explanation:

- There is a single element with tag `p`.
- The `p` element is within a `div`.
- There is an element with class `text` within an element with id `content`.

An important constaint is that I was not allowed to bring any libraries, given the need to deal with JSON, Java's `Gson` was available.

### Solution

At the end of this post, you can find a link to original code I submitted (unchanged, with comments).

#### Input handling (Java)

While I can't remember the whole process, I'm sure that the first thing I wanted to do is getting rid of Java, I had to create a representation for the input that `Gson` can actually deal with.

`JavaDOMElement` is a Java-friendly model for an item from the DOM tree:

```scala
case class JavaDOMElement(
    tag: String,
    id: String,
    classes: java.util.List[String],
    children: java.util.List[JavaDOMElement])
```

`JavaTestCase` models the whole input:

```scala
case class JavaTestCase(
    hierarchy: JavaDOMElement,
    tests: java.util.List[String])
```

Then, the way to read the input becomes this:

```scala
import com.google.gson.Gson

val gson = new Gson()
val inputReader = new InputStreamReader(java.lang.System.in)
val test = gson.fromJson(inputReader, classOf[JavaTestCase])
val rootElementMaybe = Option(test.hierarchy)
```

#### Input handling (Scala)

I have created a Scala-friendly mirror for the tree-structure `JavaDOMElement`:

```scala
import scala.collection.JavaConverters._

case class DOMElement(
    tag: String,
    id: Option[String],
    classes: List[String],
    children: List[DOMElement])

object DOMElement {
  def fromJava(java: JavaDOMElement): DOMElement = {
    val children = Option(java.children)
        .map(_.asScala.toList)
        .map { list => list.map(fromJava) }
        .getOrElse(List.empty)

    val classes = Option(java.classes)
        .map(_.asScala.toList)
        .getOrElse(List.empty)

    DOMElement(
      java.tag,
      Option(java.id),
      classes,
      children)
  }
}
```

I have created a `CSSSelector` class to hold the input test cases in a Scala-friendly way:

```scala
case class CSSSelector(
    tag: Option[String],
    id: Option[String],
    classes: List[String])
```

I needed a way to parse this input:

```scala
class CSSSelectorParser {
  def parseCSSSelectors(string: String): List[CSSSelector] = {
    string.split(" ").toList.map(parseCSSSelector)
  }

  private def parseCSSSelector(string: String): CSSSelector = {
    val splitByClass = string.split("\\.")
    val tagOrIdMaybe = splitByClass.headOption.filter(_.nonEmpty)
    val classes = splitByClass.drop(1)

    tagOrIdMaybe
        .map { tagOrIdString =>
          val (tagMaybe, idMaybe) = parseTagOrId(tagOrIdString)
          CSSSelector(tagMaybe, idMaybe, classes.toList)
        }
        .getOrElse { CSSSelector(None, None, classes.toList) }
  }

  private def parseTagOrId(tagOrIdString: String): (Option[String], Option[String]) = {
    val splitById = tagOrIdString.split("\\#")
    val tagMaybe = splitById.headOption.filter(_.nonEmpty)
    val idMaybe = splitById.lift(1).filter(_.nonEmpty)
    (tagMaybe, idMaybe)
  }
}
```

#### Output

Having the input ready, I can now deal with the output, let's define the function signature to handle the input:

```scala
class DOMProcessor {
  def countMatchingElements(element: DOMElement, selectorList: List[CSSSelector]): Int = ???
}
```

Then, this would be the code to deal with the whole input/output:

```scala
import java.io.InputStreamReader

import scala.collection.JavaConverters.asScalaBufferConverter

import com.google.gson.Gson

object Solution {

  def main(args: Array[String]): Unit = {
    val cssSelectorParser = new CSSSelectorParser
    val domProcessor = new DOMProcessor
    val gson = new Gson()
    val inputReader = new InputStreamReader(java.lang.System.in)
    val test = gson.fromJson(inputReader, classOf[JavaTestCase])
    val rootElementMaybe = Option(test.hierarchy)
        .map(DOMElement.fromJava)

    val answers = Option(test.tests)
        .map(_.asScala.toList)
        .getOrElse(List.empty)
        .map { selectorString =>
          val selectors = cssSelectorParser.parseCSSSelectors(selectorString)

          rootElementMaybe
              .map { rootElement =>
                domProcessor.countMatchingElements(rootElement, selectors)
              }
              .getOrElse(0)
        }

    val answer = answers.mkString("[", ",", "]")
    println(answer)
  }
}
```

### DOMProcessor

The glue-code is now ready, it is time to do the actual implementation.

`DOMElement` is a tree-representation, typically, these are traversed using recursion, this is why `countMatchingElements` is a recursive function taking a `DOMElement`, applying the list of `CSSSelector` to it, then, returning the number of elements that matched all the selectors, the logic is simple:

1. When there are no more selectors, there are `0` elements matching.
2. When there is a single selectors, check whether it matches the current `DOMElement` and its descendants.
3. Where there are more than 1 selector, check if the current selector matches the current `DOMElement:
   1. When `true`, check its descendants with the remaining selectors.
   2. When `false`, ignore the element and check its descendants with all the selectors.

```scala
def countMatchingElements(element: DOMElement, selectorList: List[CSSSelector]): Int = selectorList match {
  case selector :: Nil =>
    val currentCount = if (matches(element, selector)) 1 else 0
    val childrenCount = element
        .children
        .map { child => countMatchingElements(child, selectorList) }
        .sum
    currentCount + childrenCount

  case selector :: remaining =>
    if (matches(element, selector)) {
      element.children.map { child => countMatchingElements(child, remaining) }.sum
    } else {
      element.children.map { child => countMatchingElements(child, selectorList) }.sum
    }

  case _ => 0
}
```

The most beautiful piece is the missing function where Scala truly shines, check whether a `DOMElement` matches the given selector, recursively evaluating each case until all filters pass:

```scala
private def matches(element: DOMElement, selector: CSSSelector): Boolean = selector match {
  case CSSSelector(Some(expectedTag), _, _) =>
    element.tag == expectedTag &&
        matches(element, selector.copy(tag = None))

  case CSSSelector(_, Some(expectedId), _) =>
    element.id.contains(expectedId) &&
        matches(element, selector.copy(id = None))

  case CSSSelector(_, _, expectedClasses) =>
    expectedClasses.forall { expectedClass => element.classes.contains(expectedClass) }

  case _ => true
}
```

With the latest pattern-matching available Scala 3.7, this can become even simpler:

```scala
private def matches(element: DOMElement, selector: CSSSelector): Boolean = selector match {
  case CSSSelector(tag = Some(expectedTag)) =>
    element.tag == expectedTag &&
        matches(element, selector.copy(tag = None))

  case CSSSelector(id = Some(expectedId)) =>
    element.id.contains(expectedId) &&
        matches(element, selector.copy(id = None))

  case CSSSelector(classes = expectedClasses) =>
    expectedClasses.forall { expectedClass => element.classes.contains(expectedClass) }

  case _ => true
}
```

### Final words

While I haven't done many coding challenges with Scala, I have been lucky that many places I have interviewed with are nice to allow me using it.

As promised, the original code is in this [Github gist](https://gist.github.com/AlexITC/8eca4f432c6e4e4346d2fe700ba07c36)
