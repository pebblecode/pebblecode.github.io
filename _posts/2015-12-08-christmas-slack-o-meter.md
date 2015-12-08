---
layout: post
title:  Christmas Slack Hack
author: Jonathan King
categories: [hacks,javascript,node,slack]
---
On December 3rd we held our last Hackathon of 2015 here at Pebble Towers. We hold these fantastic events every quarter, and believe they are a great way to brush up on skills, or learn new ones entirely. This hacakthon was no exception, and we had some really great projects come out of it. I'm going to focus on a simple hack we made using Slack's Outgoing Webhooks and a Hapi API, but we hope to share some of the larger ones with you very soon, too!

### Format

The format should be fairly recognisable to anyone that has been to a hackathon, but essentially it goes like this:

1. Gather together early in the morning, inevitably huddled around the coffee machine.

1. Start pitching ideas with over-caffeinated excitement at the prospect of playing with the latest tech.

1. Try to boil your ideas down into an achievable MVP.

1. Inevitably overreach and underestimate.

1. HACK!

1. Eat!

1. HACK!

1. Desperately try to finish your project before 5:30 when you have to present a live demo.

1. Be amazed by what your colleagues managed in the same amount of time.

1. Collapse, exhausted, in a satisfied heap of geeks.

### The Project

One of the topics for this Hackathon was Christmas, so we chose a simple Hack that would reflect the ubiquitous festive sentiment around Pebble Towers. 

![Ubiquitous Festive Excitement](https://pbs.twimg.com/media/CVF1N6pWwAAWdue.jpg:large)

### The First Idea

Obviously we were going to make something huge, loud and fantastically ambitious. We wanted a massive sign with flashing lights, sound, and a HTML front-end displayed on the big monitor in the corner of our office. This would sound a klaxon and go crazy every time a certain keyword was mentioned on one of the public channels on Slack. Since the Hackathon's topic was Christmas, our keywords would be christmassy things like 'turkey', 'sleigh bells', or 'over-commercialised'. We We lost no time in making a big mess and covering our desks in wires, arduinos, raspberry pis and coffee. 

![Clorama Hacking on the Hardware](/img/posts/2015-12-08-christmas-slack-o-meter/making-a-mess.jpg)

The team consisted of Aisling, fashioning the front-end, Clorama, hacking on the hardware and me bashing away at the backend. In no time we had our own mini-PRISM, our very own internal GCHQ snooping on every message in our public Slack channels. By using Slack's [outgoing webhooks](https://api.slack.com/outgoing-webhooks) we could POST every message to our own servers and analyse the text to find incidences of our trigger keywords.

I used [Hapi](hapijs.com), a rich API framework that we've used for Hacks before. I wanted to use this Hackathon to familiarise myself with its structure, and I found it great - a quickly assembled springboard to launch our application from. For persistence we used [MongoDB](https://www.mongodb.org/) and to simplify DB connections and schema we used [Mongoose](http://mongoosejs.com/), both of which play nicely with Hapi.

![George Hiding His Face](/img/posts/2015-12-08-christmas-slack-o-meter/george-hiding.jpg)

But the hardware was still giving us a headache. After much deliberating and some eating of humble Pi we decided to scale back our ambitions and instead focus on the Live Demo we would have to give in what suddenly seemed like very little time.

### The Second Idea

We decided to make something interactive, a simple challenge that we could issue during the Live Demo. Our front-end would be a huge gauge that would constantly poll our API for the current number of triggered keywords and display it using a big, red, jolly needle. Ho ho ho. We would then challenge our audience to send the needle flying with a deluge of Christmas excitement. The first person to send the needle over edge of the gauge would be declared the winner, preferably amid explosions and baubles.

Now with a suitably re-scoped idea, we set to work on the front-end. We made a simple script that would poll our API and translate that into a `transform: rotate(x)` css declaration for the needle.

![Pic of front-end](jgnnksdnjsdkng)

With a bit of frantic typing right up until the last moment, we managed to do it. And here's a screencapture of the amazing, exhilirating moment when we declared the winner. 

![Gif of explosion](jgnnksdnjsdkng)

### In Summary

It was a great Hackathon, and we learnt a lot about some technologies we'd never even touched before. Although the end result was a bit naff, and there's a low probability that our invention will actually save mankind, we did manage demonstrably measurable amounts of good cheer.


