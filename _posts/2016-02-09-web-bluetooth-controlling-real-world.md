---
layout: post
title:  Web Bluetooth - Controlling the Real World from your Browser
author: Peter O'Shaughnessy
categories: [bluetooth]
---

*Last week I gave a presentation at [Front Endgineers](http://www.meetup.com/Front-Endgineers-London/events/228029543/)
about the Connected Devices revolution, why I believe [Web Bluetooth](https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web?hl=en) 
is the most exciting new browser API, and why [drone flipping](https://www.youtube.com/watch?v=-FO9thLaiug) is my new 
favourite use of JavaScript...*

> We can now break out from the browser and start controlling the physical world around us.

I’m excited about the potential to interact with real physical devices, because as we’re seeing, everything is getting 
connected and everything is becoming smart. There’s [smart earphones](http://www.bragi.com/), [smart jewellery](http://www.vinaya.com/) 
and even [smart dog collars](https://twitter.com/collr_io/status/672478840137064448) (that's one of our [pebble {code}](http://pebblecode.com/) hacks!)

Of course, not every smart device may strike you as being the most immediately useful...

![Smart Tambourine](/img/posts/2016-02-09-web-bluetooth-controlling-real-world/smart-tambourine.png)

...But some of it will be (including, we hope, something that we’re working on, but can't reveal just yet!). There's 
potential for smart devices to improve people’s lives. And the trend is exploding: it's [predicted that there’ll be 25 
billion connected devices by 2020](https://viget.com/uploads/image/blog/internet-of-things.png).

We’ve had the digital revolution. Next comes the *digital plus physical* revolution. The line between the two is going 
to blur.

One of the key technology drivers of this revolution is Bluetooth - or more specifically, [Bluetooth Low Energy](https://www.bluetooth.com/what-is-bluetooth-technology/bluetooth-technology-basics/low-energy), 
the relatively recent variant that is perfect for small, low-powered devices. 

Up until very recently, if you wanted to develop an app that uses Bluetooth, you needed to break out your Java / 
Objective-C / Swift, and write some native code. Or use an off-the-shelf plugin for Cordova or React Native. But now 
Bluetooth is also coming to the Web…

The new Web Bluetooth API is currently a [draft spec](https://webbluetoothcg.github.io/web-bluetooth/) - [here's the
entry on caniuse.com (*new!*)](http://caniuse.com/#feat=web-bluetooth). As of now, it's only available 
[behind a flag](https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web#before-we-start)
on Chrome for Android Dev edition, Chrome OS, or Firefox OS. But let's take a look!

The API is pretty simple - it’s based around Bluetooth’s system of [services and characteristics](https://developer.bluetooth.org/TechnologyOverview/Pages/GATT.aspx), 
and it's Promise-based. In this [Google Developers example](https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web?hl=en), 
we’re looking for a device that includes a battery service. The user will get a prompt to pair with a device. Then we 
can connect to it, grab the relevant service and characteristic, and read out its value:

    navigator.bluetooth.requestDevice({
        filters: [{services: ['battery_service']}]
      })
      .then(device => device.connectGATT())
      .then(server => {
        return server.getPrimaryService('battery_service');
      })
      .then(service => {
        return service.getCharacteristic('battery_level');
      })
      .then(characteristic => {
        // Read battery level...
        return characteristic.readValue();
      });
  
This simple example is not all that exciting though, so I thought I'd introduce a 
[Parrot Mini Drone](http://www.parrot.com/usa/products/minidrones/)! 

![Parrot Mini Drone](/img/posts/2016-02-09-web-bluetooth-controlling-real-world/parrot-mini-drone.jpg)

I wrote a little [Drone Controller app](https://github.com/poshaughnessy/web-bluetooth-parrot-drone) that lets you 
connect to the drone, make it take off, flip and land. It's in pure JavaScript and runs just in your mobile web browser:

<div class="video">
  <iframe width="420" height="315" src="https://www.youtube.com/embed/-FO9thLaiug" frameborder="0" allowfullscreen></iframe>
</div>

I think the fact it's just a web app is pretty cool - imagine in the future just visiting *controlmydrone.com*...

It's only for Chrome for Android Dev right now, but hopefully browser support will get better over the next few months. 
The [source code is here](https://github.com/poshaughnessy/web-bluetooth-parrot-drone) if you'd like to try it out. It's 
a work in progress and the API is not yet stable, so please be careful! 

...But let's have fun too :-) The Connected Devices revolution is happening. We can now break out from the browser and 
start controlling the physical world around us. It's an exciting time to be a web developer!

--

*The [slides from my talk are here](http://www.slideshare.net/pebblecode/web-bluetooth-controlling-the-real-world-from-your-browser) and check out [more Web Bluetooth demos here](https://github.com/WebBluetoothCG/demos#/web-bluetooth-demos)*
