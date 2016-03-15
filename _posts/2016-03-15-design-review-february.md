---
layout: post
title: Design Review, February 2016
author: John Mildinhall
categories: [design]
thumbnail: /img/blog/worms.jpg
---

**Uber redesign shenanigans**

One of the biggest things to drop in Februrary was the [Uber redesign](https://newsroom.uber.com/celebrating-cities-a-new-look-and-feel-for-uber/). The response has been [mixed at best](http://boingboing.net/2016/02/04/a-close-look-at-the-new-uber-l.html), and plenty of pixels have been spilled in trying to interpret the internal machinations of the company through the redesign.


>I like some parts of it. But the app icons are just bizarre.<br><br>Mark

>Nothing beats a good adaptive brand. But, coming up with a name like “The Bit” for standard things like app/website components is a bit lame...<br><br>Peter

**Diagetic is a new one on me**

Some [leaked design documentation](http://imgur.com/a/Y2HV1?utm_source=designernews) for Tom Clancy's 'The Division' popped up early in the month. These propose a 'diagetic' UI, i.e. one that rests within the physical world rather than is applied on top of it. This sort of thing is only really possible using the high resolutions that modern consoles can supply, and I expect it will only get more common with the advent of both ubiquitous 4K, and augmented reality which appears to be just round the corner. 

**Kerning ftw**

Knowledge of kerning is a ticket to the secret society of designers. Here's [how to do it](https://designschool.canva.com/blog/kerning/), and here's [how not to do it](http://fuckyeahkeming.com/)

**Scrolljacking is evil and we must destroy it**

Scrolljacking is the use of DOM scripting to interfere with the regular operation of the native browser scrolling function. For the most part we believe that it actively damamges the user experience. By removing regular scrolling the user has a handrail removed, and they are often unable to easily find items or otherwise navigate the page. 

Here is the archetypal jank-tastic scrolljacked page:
http://www.apple.com/uk/mac-pro/

Notice a few things:

1. The performance is terrible. Ironically it probably only scrolls reasonably on a Mac Pro.
2. Quite often, there is literally NO feedback on screen that your scrolling is doing anything.
3. It feels very laborious to get through.
4. It makes it harder and slower to find the information you need.
5. It kills the native search function in the browser.
6. Any robots will give up trying to crawl it.
7. It's also massively heavy as a page. 

So don't do it. 

**but...**

[This page](http://www.mynameis.fr/en#art-ligue) has a subtle brand of scrolljacking. It simply nudges the scrolltop to be aligned with the nearest section after a pause in scrolling. The key to this is clearly the unobtrusiveness of the effect. It ensures that the page looks as good as possible, and also enables the neat alignment of the "my name is" flourish in the top left. 

>This is a simple way to scroll jack to give focus to the main content without being annoying <br><br>Peter

**Showoff corner**

[A CSS husky](http://codepen.io/davidkpiano/full/wMqXea/) by David Khourshid, and a [CSS Button](http://codepen.io/DeptofJeffAyer/pen/waLYxy) by Jeff Ayer.

**Back of the net**

England's Premier League has dropped core sponsorship for the next season. That means they need a [re-brand](http://www.creativereview.co.uk/cr-blog/2016/february/designstudio-rebrands-premier-league/). We really like the simplicty and impact of the new branding.

>That redesign is lovely. I'd like to see a more fleshed out version as an alternate though <br><br>Niall

>I am excited to see the rest of the brand components, mostly the badge which I think is why they removed the body of the lion. <br><br>Peter

**Hybrid apps**

We're still not at the stage where HTML5 performs as well as native code on tablets and phones. But that doesn't mean we can't still use some [HTML5 elements to improve re-usability in native apps](https://www.smashingmagazine.com/2016/02/building-first-class-app-leverages-website-case-study/
). 

**Geek corner**
[Better nth child css](https://github.com/pascalduez/postcss-quantity-queries). (also has sass alternative) 


**It's crazy, but it might just work**

Interactive graphs can involve a lot of work. There are many libraries out there that will help, but sometimes you just need something simple. [This idea](https://www.fontshop.com/content/ff-chartwell-making-all-the-charts) involves using fonts to create simple graphs. We haven't tried it yet, but once we have we'll report back.




