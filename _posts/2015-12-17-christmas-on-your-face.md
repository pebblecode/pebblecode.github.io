---
layout: post
title:  A Christmas Carol
author: C.Dickens
categories: [hacks,javascript,node,photography]
thumbnail: /img/blog/xmas-face-diag.png
---
Photography was dead to begin with. There was no doubt whatever about that. At least according to Scrooge. He rejected camera phones, and invitations for Christmas selfies from his jolly nephews & nieces. He yelled at his overworked employees for sharing Instagram photos, and rejected apps of any kind. 

But one cold December night, Scrooge was visited by the ghost of his former partner. He warned of the coming of three Spirits, who would visit over the course of the next pebble hack day.

The first was a tall man, covered in Lycra, with a dark, full beard and a passion for JavaScript. He took Scrooge on a journey in to Node.js and gphoto2, explaining how these modern tools could connect the power of the web to physical objects like the classic Canon 100D. When Scrooge heard this, his mind drifted back to his collection of beautiful glass lenses, gathering dust in his office.

Scrooge’s second visitor was a smaller, and less handsome than the first, but not without a certain charm. A camera swung from his neck and a sketchbook nestled in his hand. He whisked Scrooge away to his studio full of illustrated Christmas scenes. Scrooge turned to the Spirit and asked _“What are you to do with these illustrations, for they are full of faceless creatures?”_

The spirit replied _"Perhaps they are representation of the person you could become..."_

As the second spirit faded in to the dark, Scrooge was brimming with excitement. If he could combine the power of the mobile web with his DSLR, then, under the guise of a convivial Christmas photo booth app, he could capture all sorts of data about his staff. He grabbed his mac, camera, tripod and set to work. The landing page was constructed in HTML & CSS, using SVG illustrations for the button. A simple user input, _naughty_ or _nice_ was required to allow activation of the shutter button that triggered the camera.

Data would then be passed to the node server which, processed the request. The response sent signals to the camera to fire the shutter and download the resulting image. This image would then be passed to a second web page, to be loaded behind a relevant festive illustration.

![Process diagram](/img/blog/xmas-face-diag.png)

Without warning, a booming voice declared _“Merry Christmas to all!”_ 

Scrooge spun around to see the third and final spirit looming over him. He was a broad shouldered man, with a round face, and a grin from ear to ear. He threw himself in to Scrooge’s chair and whipped out his phone. As the shutter clicked, the spirit was presented with his self portrait, clothed in a full red suit and surrounded by snow.

_“Ho Ho Ho! What a fine full face of hair you’ve given me!”_ The spirit cried. As his body faded away, his laughter continued to echo through the streets of Vauxhall.

That same day Scrooge took joyous photos of all his staff, both naughty and nice, before taking them out for a massive booze up, ping pong and some arm wrestling. The team rejoiced at this miracle transformation. From then on, he kept the spirit of Christmas alive in his heart and also on [GitHub](https://github.com/pebblecode/xmas-on-your-face) for anyone who wanted to share his vision.

![Santa Claus](/img/blog/xmas-face-photo.png)

## Merry Christmas to all!

