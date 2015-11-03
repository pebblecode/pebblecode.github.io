---
layout: post
title:  Working From Home Slack Bot
author: Mike James
categories: [hacks,javascript,node, slack]
---
So back in June we had a hackday and produced an initial release of what we call WFH (working from home) bot (see [original post](/blog/hack-day-wfh-bot)). We have a remote working policy, so rather than having a long WFH email chain being sent individually everyday we've built a system to help. Slack is core to all internal chat communications and everyone uses it. It also provides a flexible API which makes it good place to interact with WFH. 

The first version of WFH was private on Github, today we're releasing it as OpenSource. As we figured this might be useful to other people working remotely. This post documents the recent changes and features. Its here for you to play with and [host your own](https://github.com/pebblecode/wfh-api). 

###What's changed?
We've had a play around with the api and had some interations, we've also experimented with one version in Erlang. We've settled at the moment for a node.js version, as most of us devs here at pebble write JavaScript. But we're going to continue playing with Erlang as its an interesting platform.

#### Parameters
We now have parameters in the slash commands.

`default: (wfh,wfo)` 
Allows you to change your default status. Say for example you change; to working from home by default and come to the office less frequently.

`message: I'm at a conference` 
messages allow you to give some description. 

####Statuses
We have InOffice, OutOfOffice, Sick and Holiday. All statuses last for a full working day. Say you want to set the status for your next day at work to another status you can do that after 8pm as we figured most people won't be updating their status for the current working day at 8pm. 


###Architecture
![image of architecture](/img/posts/2015-11-03-wfh-slack/diagram.png)

###Integrations
The api has full CRUD functionality, see the docs for more details. So this is open for your own integrations. We've used this to integrate with [Tribe HR](https://github.com/pebblecode/tribehr-holiday-fetcher) and [send Emails at 10am](https://github.com/pebblecode/wfh-email-cron)

###We'd love to hear from you
Let us know what you do with WFH bot.


