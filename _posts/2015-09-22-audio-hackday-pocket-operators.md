---
layout: post
title:  Audio HackDay - Pocket Operator
author: Martin Schinz
categories:
  - hack day
---

# Pocket Operator Hack

A visualization for audio produced by [Pocket Operator](https://www.teenageengineering.com/products/po) audio devices.

## The audio hardware

[teenage engineering](https://www.teenageengineering.com/) make awesome programmable music synthesizers with lcd screens called pocket operator. Just having one is great, but by adding more, you can create full-on pumping electronica. The devices communicate via a standard headphone socket, and sync to the [click track](https://en.wikipedia.org/wiki/Click_track) produced by the first device. You can create patterns via the soft buttons on the device front, a bit like using the legendary drum machines of days past. Additional effects and transforms give the musician a huge variety of sounds.

## Visualise it

Our idea was to synchronise a visualization to the click track produced by the devices.

We couldn’t quite get the right wiring for the audio of the click track to be picked up by the laptop we were planning to run our visualisation on. As a stop gap, we started to simulate a trigger from the device’s audio by using the [Reactive Extensions for JavaScript](https://github.com/Reactive-Extensions/RxJS) to produce an event (a click) at a given time interval. We wired this click to trigger to call a function in the visualisation, that would then modify a parameter. Being cheesy and going for the most obvious change, we settled on modifying the colour of the visualisation on the beat, as that seemed to give the most compelling experience.

## Getting into the groove

In a very short time John had some visually very interesting things flying around on his screen, utilising the [threejs](http://threejs.org) library, and triggering colour changes on the (still artificial) click track events. Martin started feeling the pressure to feed some signals into this arrangement, and get some synchronisation between the audio and the visual.

While the team was unable to get the click track into their computers, there were some other paths open. The obvious thing was to crank the audio from the devices up, and use the laptop’s microphone to get to the audio. This we did, much to the pleasure of the other teams in our vicinity. (There were louder and more annoying sources of sound in the vicinity, so we didn’t feel too bad about it for short periods).

## The tech that works is the best tech on a hack day

Utilising the [web audio api](http://webaudioapi.com) Martin went on to create a simple analyzer that would trigger an event whenever the level of the audio from the microphone would exceed a certain threshold. This had the added benefit of allowing us to make funny noises in front of the laptop and observe the visual results. At around 4 PM the majority of the functionality was working in the app, and John and Martin had a little session to work on the arrangement of the patterns from the Pocket Operators.

## Presentation

The presentation played out really nicely, and John performed his arrangement live, which sounded really awesome. There is definitely a talented musical performer hidden inside John somewhere, and I can’t wait for more of his performances.

Here is a video that was recorded at a later time as a rough idea of what it
looks like:

<div class="video"><iframe src="https://drive.google.com/a/pebblecode.com/file/d/0B4GD8iS9GCpqZ2VUZ3lEY0VDd0U/preview" width="640" height="480"></iframe></div>

## Lessons learned

John said that he really enjoyed learning about the [Reactive Extensions](https://rx.codeplex.com/), and that the event driven programming model was something he wanted to explore more. Martin is really happy that the [Reactive Extensions](https://rx.codeplex.com/) serve as a mechanism to apply the same programming paradigms on multiple language stacks, and is excited about the richness of the library landscape in javascript. The web audio api in the browser was really simple to use, and analysing buffers of raw audio is something Martin didn’t expect to be doing within the scope of one hack day.

## Link to source

You can find the source for this project on [github](https://github.com/pebblecode/pocketOperator).
