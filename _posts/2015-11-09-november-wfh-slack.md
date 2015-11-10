---
layout: post
title:  Working From Home Slack Bot
author: Mike James
categories: [hacks,javascript,node, slack]
---
Here at pebble{code} we have the freedom to work remotely. It's been a part of our culture from the early days. So back in June this year we had one of our hackdays and produced a service we call WFH (working from home) bot (see [original post](/blog/hack-day-wfh-bot)). The idea behind the hack day was to try out some new tech and solve some problems along the way. The bot helps prevent long email chains on who is working where. Slack is core to all internal chat communications. 

The first version of WFH was private, and today we're releasing it as OpenSource. As we figured this useful! So its here for you to play with and [host your own](https://github.com/pebblecode/wfh-api) under [MIT](http://opensource.org/licenses/mit-license.php). 

###Architecture
![image of architecture](/img/posts/2015-11-03-wfh-slack/diagram.png)

###What's changed?
We've had a play around with the api and had some iterations, we've also experimented with one version in Erlang [here](https://github.com/pebblecode/wfh2_backend). We've settled at the moment for a Node.js version, as most of us devs here at pebble write JavaScript. But we're going to continue playing with Erlang as its an interesting platform.

#### Parameters
We now have parameters in the slash commands.

  `default:wfh` or `default:wfo` 
  Allows you to change your default status. Say for example you change, to working from home by default and come to the office less frequently.

  `message: I'm at a conference` or `message: I wan't to sit in my pants all day and work from home` 
  messages allow you to give some description. 

![Screen shot](/img/posts/2015-11-03-wfh-slack/screenshot.png)

####Statuses
We have InOffice, OutOfOffice, Sick and Holiday. All statuses last for a full working day. Say you want to set the status for your next day at work to another status you can do that after 8pm as we figured most people won't be updating their status for the current working day at 8pm. 

###Integrations
The api has full CRUD functionality, see the docs for more details. So this is open for your own integrations. We've used this to integrate with [Tribe HR](https://github.com/pebblecode/tribehr-holiday-fetcher) and [send Emails at 10am](https://github.com/pebblecode/wfh-email-cron)

Also its on a TV in the office, built using react and flux, deployed on s3.
![TV](/img/posts/2015-11-03-wfh-slack/tv.jpg)

###We'd love to hear from you
We're pretty proud of our WFH bot, we can see various features being added over time. Its pretty simple to extend its a [hapi api](http://hapijs.com/). Do let us know what features you'll like to see with WFH bot.
