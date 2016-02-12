---
layout: post
title: Thoughts on Code Reviews
author: Dave Hillier
categories: [code reviews, pair programming, coding]
---

Code reviews are a widely accepted practice in both enterprise and open source. In the words of [Coding Horror: Just Do
it](http://blog.codinghorror.com/code-reviews-just-do-it/). As we use Github for VCS, this is built into our tooling with Pull Requests. However, sometimes making the most of
a code review can be hard and feel like you’re just going through the motions.
I’ve had developers struggle and lose sight of why we’re doing them so I attempted to write a list of some points to
think about.

## Prefer pair programming

We don’t often do pair programming, but it can be a superior alternative to Code Review.  You might want to consider
pairing though a code review. It gives you much more context, allowing more effective communication between you and
the reviewer. It’s also harder to ignore or miss the comments when someone is sat next to you.

## I don’t understand - Stupidity is a virtue

The hardest thing for a developer to admit is that they don’t understand. In some ways it is an admission of
imperfection. However, the default position for a code reviewer should be that they don’t understand; maybe it hadn't
occurred to the author that it’s complex or they may have even made a mistake.
I find being walked through the story of a code review is much better for my understanding with the intent of the
author rather than trying to understand just by looking at the raw text.

## Code reviews for knowledge sharing

Code reviews do offer some value in early bug catching, but can we use them as a tool for knowledge sharing? Think of
the reviewer as the person who will next work on the code. What do you need to tell them to hand over? In the more
Agile teams that I’ve worked in, the knowledge transfer was far more likely to happen.

## Code reviews as an opportunity to ask for help

Some of the best code reviews that I’ve had are when I could ask questions of the reviewer about approaches that they
prefer. Maybe this is just pair programming in disguise.

## Code review is too late

If the author of the code has completed the task and it works to specification, but it doesn’t meet standards or its
overly complex then is it really fair to ask them to re-write it all? Sometimes that is what is necessary, but at the
least it’s quite inefficient.  Consider reviewing smaller chunks or again pair programming.

## Big Picture

Do we excessively focus on the line-for-line changes? Recently, in a code review, one reviewer commented on the naming
of a method on an interface. The other reviewer looked at the bigger picture and suggested removing the interface
entirely.

## Do our tools encourage micro-review?

Similarly to above, Pull Requests encourage you to look only at the changes line-for-line. I’m convinced this makes me
miss things sometimes.

## Patches Welcome

Instead of doing a code review with loads of comments, why not just checkout the code and actually make the changes?
Sometimes this can be the most effective way.

## Objective vs Subjective?

When is it OK to reject a reviewer’s comment? The assumption shouldn’t be that the reviewer is always correct or
vice-versa.

![More of a guideline](http://lovelace-media.imgix.net/uploads/207/10400640-ff63-0131-6fed-0add9426c766.gif)

## Slow turn around

Pull Requests often take a long time to be reviewed. This causes context-switching problems for the developer
committing the code. One of the reasons I prefer pairing the review is that you can choose someone who is immediately
available while the code is in your head. Similarly, I think it’s best if you can turn reviews around quickly when
they are assigned to you.

## Good enough

When is the code good enough? Think continuous improvement/kaizen. What is the point of diminishing returns? You don’t
have to raise everything.

## Automation

I see a lot of comments on whitespace, formatting etc. You should automate this. Most IDEs have linter support these
days and you should already have a build. If the code doesn’t comply with your coding standards then the build
should fail!

## Sprawling coding standards

Relating to the above. Are your coding standards too big to enforce? Will only the rules-lawyers do it? Avoid standards
that can’t be enforced automatically.

