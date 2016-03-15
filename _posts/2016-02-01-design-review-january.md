---
layout: post
title: Design Review, February 2016
author: John Mildinhall
categories: [design]
thumbnail: /img/blog/dragon-test.png
---

#Uber redesign shenanigans

One of the biggest things to drop in Februrary was the [Uber redesign](https://newsroom.uber.com/celebrating-cities-a-new-look-and-feel-for-uber/). The response has been [mixed at best](http://boingboing.net/2016/02/04/a-close-look-at-the-new-uber-l.html), and plenty of pixels have been spilled in trying to interpret the internal machinations of the company through the redesign.


>I like some parts of it. But the app icons are just bizarre.<br><br>Mark

>Nothing beats a good adaptive brand. But, coming up with a name like “The Bit” for standard things like app/website components is a bit lame...<br><br>Peter

#Diagetic is a new one on me

Some [leaked design documentation](http://imgur.com/a/Y2HV1?utm_source=designernews) for Tom Clancy's 'The Division' popped up early in the month. These propose a 'diagetic' UI, i.e. one that rests within the physical world rather than is applied on top of it. This sort of thing is only really possible using the high resolutions that modern consoles can supply, and I expect it will only get more common with the advent of both ubiquitous 4K, and augmented reality which appears to be just round the corner. 

#Kerning ftw

Knowledge of kerning is a ticket to the secret society of designers. Here's [how to do it](https://designschool.canva.com/blog/kerning/), and here's [how not to do it](http://fuckyeahkeming.com/)

#Scrolljacking is evil and we must destroy it

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

##but...

[This page](http://www.mynameis.fr/en#art-ligue) has a subtle brand of scrolljacking. It simply nudges the scrolltop to be aligned with the nearest section after a pause in scrolling. The key to this is clearly the unobtrusiveness of the effect. It ensures that the page looks as good as possible, and also enables the neat alignment of the "my name is" flourish in the top left. 

>This is a simple way to scroll jack to give focus to the main content without being annoying <br><br>Peter

#Showoff corner

[A CSS husky](http://codepen.io/davidkpiano/full/wMqXea/) by David Khourshid, and a [CSS Button](http://codepen.io/DeptofJeffAyer/pen/waLYxy) by Jeff Ayer.

#Back of the net

England's Premier League has dropped core sponsorship for the next season. That means they need a [re-brand](http://www.creativereview.co.uk/cr-blog/2016/february/designstudio-rebrands-premier-league/). We really like the simplicty and impact of the new branding.

>That redesign is lovely. I'd like to see a more fleshed out version as an alternate though <br><br>Niall

>I am excited to see the rest of the brand components, mostly the badge which I think is why they removed the body of the lion. <br><br>Peter

#Hybrid apps

We're still not at the stage where HTML5 performs as well as native code on tablets and phones. But that doesn't mean we can't still use some [HTML5 elements to improve re-usability in native apps](https://www.smashingmagazine.com/2016/02/building-first-class-app-leverages-website-case-study/
). 

#Geek corner
[Better nth child css](https://github.com/pascalduez/postcss-quantity-queries). (also has sass alternative) 










We are always pushing links each others' ways in the design team at pebble {code}. A healthy level of discussion and debate is stimulating, fun, and keeps us interested. We decided that it was about time we share some of these discussions with the wider world.

![dragon](/img/blog/dragon-test.png)
Dragon, by Niall

## Debate of the Month

**Designs should return to being more playful**

How much whimsical decoration should we put around our designs? How beneficial is playfulness? Do design embellishments add to the journey or distract from it? Have we lost something since we moved away from the whimsical flash sites of yore?

**For**

> I think sometimes people undervalue the role of aesthetics and beauty in design.
Particularly in the Digital space, where so much is focussed on tools, reduction, and measured behaviours. Empathy and excitement are important tools to hold a viewer's attention, and the dressing you put around a message doesn't have to diminish that message. In most cases it will actually improve it. I'm in favour of a more balanced approach to UX, where form and function are considered more equal.
<br><br>*TL;DR people like playful, shiny things.*
<br><br>Niall

**Against**

> We often talk about design in terms of style vs substance or beauty vs utility. However I believe this to be a false dichotomy. We need to address the idea that style has to be sacrificed for us to create substantial work. Or that it’s impossible to create something truly creative that has a focus on usability.
<br><br>When we talk about web design in this context people often cite the perceived homogeneity of modern web design verses the ‘creative’ flash sites of yesteryear as a negative consequence of more designers optimising for utility.
<br><br>Firstly we’ve got to understand the motivations for these designs. There’s certainly a divide between designs that are optimised for sales, information, or entertainment. A site optimised for sales may not be very interesting to the user but could still provide an excellent user experience. Similarly a site created to entertain could be confusing yet interesting and still fulfil its goals.
<br><br>*TL;DR You don't have to sacrifice utility to make beautiful things.*
<br><br>Mark

Further arguments for and against this motion:

For: [Is the internet killing creativity?](https://www.smashingmagazine.com/2016/01/is-the-internet-killing-creativity/)

Against: [Design != Art](http://austinknight.com/writing/design-is-not-art/)



## Tools

Getting images to look right on all sorts of devices can be a pain. [Responsive image breakpoints generator](http://www.responsivebreakpoints.com/) is a service that aims to be the aspirin, if not the morphine.

We sometimes find it hard to find the right unicode character. Here's something that can help: [Draw a shape, get the closest unicode character](http://shapecatcher.com/)

### Colour names

It can be hard dealing with named colour variables in SASS. There are two general approaches - 1) name all the colours yourself (e.g. beige, taupe, cerulean). 2) Give them semantic names (e.g. $button-cancel). Here is a third and possibly better method by [Sorting out your SASS colour names](https://davidwalsh.name/sass-color-variables-dont-suck), using [Name that colour](http://chir.ag/projects/name-that-color/#D0006F).


## General CSS

### Pedantic CSS

The book you need to read to become [The One at CSS](http://book.mixu.net/css/).

### Blend modes became a hot topic.

Sadly blend modes are not available in IE, if you need to support that. But what if you have an angry client asking for pop and pizzaz? Maybe blend modes are your answer. Sometimes they [don't work so well](https://css-tricks.com/snippets/sass/tint-shade-functions/), but there are ways to fix them. A good introduction to how they work in theory and practice is [here](http://webdesign.tutsplus.com/tutorials/blending-modes-in-css-color-theory-and-practical-application--cms-25201?ref=webdesignernews.com). You can do some pretty advanced effects with blend-mode, including [Instagram effects](http://www.cssfilters.co/).

Blend modes can also be used with two images (rather than a single image and a solid colour or gradient). I built a [2 picture blend mode tester](https://dl.dropboxusercontent.com/u/17961414/index.html) (Apologies for the Dropbox link), where you can choose two images and try out the different blend modes on them. The github repo is [here](https://github.com/pebblecode/blend-mode-tester).

![blend modes](https://camo.githubusercontent.com/4326984b4beb9894291a0f5c8604e867ab31b3a8/68747470733a2f2f646c2e64726f70626f7875736572636f6e74656e742e636f6d2f732f7a6b7037686c65676b327a61356c742f63616765312e706e673f646c3d30)


## Templates

Our very own Peter Tait has created a [simple SASS grid](https://github.com/petertait/GRID).

> It’s just a very simple grid system that I made based on a few grids I’ve come across including:
<br>- Change number of columns easily with variable
<br>- Has mobile targeted grid
<br>- minimal amount of sass code
<br><br>Peter

## Graphic Design
Highlights include a flash new logo for a favourite chicken restaurant, [Nandos](http://www.designweek.co.uk/nandos-global-rebrand-looks-to-re-connect-with-south-african-roots/), and a fancy new identity for an [Argentinian gym](http://www.itsnicethat.com/articles/julian-villagra-le-club-gym-190116?utm_source=twitter&utm_medium=social&utm_campaign=intsocial).

This post about [lovely cartographic lines](https://mapzen.com/blog/lines) includes an interesting discourse on the possible meaning of lines, and plenty of inspiration that can be taken outside of cartography.

We always enjoy people doing radical things to stay creative, so this
[One month gif-a-thon](https://vimeo.com/channels/staffpicks/151850021) was right up our street. This gif:![Animated Op Art](https://49.media.tumblr.com/fbf9bf87b095352e5d418417f8cb7d5f/tumblr_nyhi39spuZ1tl8u0ko1_500.gif) made our eyes go funny... We asked science, and science said:

> Each blink of the eyelids is associated with a concurrent suppression of vision that lasts as long as 200 msec. <br><br> [Ridder & Tomlinson, 1993](http://www.ncbi.nlm.nih.gov/pubmed/8266635)

Which explains why when you blink fast, the image appears to jump around, rather than swirl.

Over on Kickstarter, the [give me $ to make massive tube map](https://www.kickstarter.com/projects/1960956629/the-world-metro-map?ref=thanks_tweet) effort piqued our interest.

![metro](https://ksr-ugc.imgix.net/projects/2176367/photo-original.gif?v=1449474408&w=1024&h=768&fit=crop&auto=format&frame=1&q=92&s=740d3320528e4ffe710c959d60c81c57)

> Cool idea, maybe not best execution <br><br>Peter

Maybe the massive $$ (funded 10x over!) will give them the chance to work on the style in more depth.

Finally, we enjoyed the presentation of the new [UAL Prospectus identity](http://www.spystudio.co.uk/projects/university-of-the-arts-london--2015).

![prospectus](http://res.cloudinary.com/uwp/image/upload/c_fill,w_1400/qvns76oqfe3d7tkgjilu)


## CMS

It is a designer fact of life that at some point, you will be dealing with a CMS. We liked this post concerning [how to make the difficult choice of which CMS to go for](http://coryetzkorn.com/blog/choosing-the-best-cms/).

Hugo is apparently the [new hotness in CMS-land](https://gohugo.io/overview/introduction/). By pre-processing the html, rather than doing it on the fly, it is supposed to be faster than your normal one (and believe me, we've come across some super-slow CMSs in our time). We will try it out and report back.


## Typography

We are always delighted to see new things in the field of typography. Here are some of our favourites for the month:

* [An open-source highway sign font](http://overpassfont.org/)
* [An SVG Icon system boilerplate](https://github.com/una/svg-icon-system-boilerplate)
* [The average font, as chosen by a neural network](http://erikbern.com/2016/01/21/analyzing-50k-fonts-using-deep-neural-networks/)
* [The best font for data-heavy interfaces](https://www.designernews.co/stories/62324-what-are-the-best-typefaces-for-dataheavy-web-interfaces)
* [The 10 most popular fonts of the year](https://www.typewolf.com/blog/most-popular-fonts-of-the-year)
* [A flag building typeface](http://www.flagsmithfont.com/)

## Speak your brainz

[Nobody wants to use your product](https://www.smashingmagazine.com/2016/01/nobody-wants-use-your-product/)


## Careers
The need for designers to have a degree is a hot topic at pebble {code} at the moment. Increasingly, we are not seeing any difference in the skill level of those with and without degrees. The additional three years of work experience may mean that candidates without a degree are pound-for-pound more experienced and independent at the same age as those who do. We were interested to read that [Penguin have dropped the degree requirement for their candidates](http://www.theguardian.com/books/2016/jan/18/penguin-ditches-the-need-for-job-seekers-to-have-university-degrees).


## Design / Science

### Not the way to do it.

This [UI Evidence website](http://www.goodui.org/evidence/) was bandied around earlier in the month.


> Summarising evidence in user research should be a good thing, but this is not the way to do it. The designer does not appear to understand p values. Making p < .25 the threshold for significance is ludicrous. The very fact that these tests are lumped together means that you should have a more stringent p threshold (and the standard is .05). This can be achieved with the [Bonferroni correction](https://en.wikipedia.org/wiki/Bonferroni_correction). If this was applied to the data, I doubt whether there would be many significant tests at all. This site on the other hand is supporting [p hacking](https://en.wikipedia.org/wiki/Data_dredging).
<br><br>John

### The way to do it
Nielsen-Norman group have discovered that flat design results in [loss of efficiency for users](https://www.nngroup.com/articles/flat-design-long-exposure/).



## General

### UX Timeline

Go [back in time](http://uxtimeline.com/spotify.html ) to see how the UX of famous brands such as Vimeo and Spotify have changed over time.


## And finally:

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">I call this one “The impossibility of using more instructions to fix user design flaws.” <a href="https://t.co/P5FTtLoN6j">pic.twitter.com/P5FTtLoN6j</a></p>&mdash; mudge (@mudge) <a href="https://twitter.com/mudge/status/685418851262173184">January 8, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
