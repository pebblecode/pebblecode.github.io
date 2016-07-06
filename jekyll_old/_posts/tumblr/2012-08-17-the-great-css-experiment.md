---
layout: post
title: The great (CSS) experiment
date: '2012-08-17T11:10:00+01:00'
categories: [CSS, Sass, CSS reset, Open Source]
tumblr_url: http://blog.pebblecode.com/post/29614270562/the-great-css-experiment
author: Mark Durrant
---
<h2>The tale of one man’s journey into the dark underbelly of CSS frameworks and the shiny wonderland of Sass.</h2>

<p>Recently I was asked by George our CD if I had any ideas for open source projects I’d like to start. I had been toying with the idea of trying to fix some of the problems I had been finding when using Twitter Bootstrap. The project seemed achievable and productive, a quick search found several people had the same issues as me with <a href="http://twitter.github.com/bootstrap/">Twitter Bootstrap.</a></p>

<p>If you&rsquo;re not familiar with Twitter Bootstrap it might be time to take a look. It’s an excellent CSS (and jQuery) framework that lets developers get off the ground quickly when starting new projects. A truly awesome tool for developers who don’t want to think about any messy ‘design’ stuff when they start out on a new project.</p>

<p>Unfortunately with the power of Twitter Bootstrap comes with a few catches. Firstly Twitter Bootstrap comes with a lot of options, this leads to a very large CSS file that&rsquo;s easy to get lost in.  Secondly Twitter Bootstrap is implemented by adding specific Twitter Bootstrap classes to your HTML. This means that you end up with  a lot of non-semantic classes. And thirdly Twitter Bootstrap enforces a particular HTML structure which is often very element heavy.</p>

<p>I set out to find solutions these problems, give people a better way to use Twitter Bootstrap, fix the internet, and make the world a better place. Lofty goals which all seemed achievable. I knew I’d be using Sass to make all this magic happen so the first thing I did was read up on the <a href="http://sass-lang.com/docs.html">Sass docs.</a> After a little research I found a few Sass tricks that I thought could solve my first two issues with Twitter Bootstrap.</p>

<p>Step one was to separate out Twitter Bootstrap to several more bite sized sections. These could then be included into the stylesheet with the ‘@import’ Sass command. Step two was to apply all classes in SCSS rather than HTML. This was achieved by using ‘@extend’.</p>

<p>These two workarounds got me pretty close to my imagined Twitter Bootstrap utopia. Unfortunately it really wasn’t that simple. Whilst the project was successful at what it aimed to do it still wasn’t something I was happy with. The problem was two fold. One, my edits made Bootstrap better in some ways but definitely more difficult to use, which is one of the main reasons its so popular. And two, all the other little niggles I had with bootstrap were still there, and even with my tweaks Bootstrap still wasn’t for me.</p>

<p>I still think the project has potential and it’s available on github for any interested parties. <a href="https://github.com/pebblecode/Sass-strap/">https://github.com/pebblecode/Sass-strap/</a></p>

<p>After all this I still wasn’t done. After realizing that Bootstrap just wasn’t for me whatever way I tweaked it I decided to build my own framework. Focusing on only a few key areas grids typography and buttons. This went pretty smoothly and I got to delve a lot deeper into Sass. Trying out a few of the more complicated features of Sass.</p>

<p>This resulted in a few different mixins one each to handle grids, type, and buttons. Whilst I don’t think this project succeeded either (reasons for that later.) The individual mixins will definitely work their way into my toolbox and I will probably publish them as Gists when I get around to tidying them up.</p>

<p>So why was this little project “unsuccessful”? Well as happy as I am with the individual mixins I don’t think they worked very well together. I also think they need quite a lot of work before they’d be useful to anyone but me. However this mini framework did spin off into one last project.</p>

<h2>Introducing PCR. The “Pebble Custom Reset”.</h2>

<p>After discussing the previously mentioned experiment with George an idea formed for using some of the techniques I had been working on to create a simple customizable CSS reset.</p>

<p>For those not in the know a CSS reset is a small piece of CSS code that a developer can use to give themselves a fresh start when creating a new web project. The goal of the project was to give developers a quick and easy way to customise their resets on a project by project basis.</p>

<p>This project had a much narrower scope than either of its predecessors and I think thats why it succeeded. I’m very happy with the finished article. It’s lean and does one thing and one thing well.</p>

<p>The full code and a demo can be found <a href="http://pebblecode.github.com/PCR/">here.</a> I’d love to get any feedback on this. From anyone beginner to pro. And I really hope that someone other than me finds it useful.  </p>

<p>So what did I learn from this great experiment. Well quite a few things.</p>

<ul><li>As much as I personally dislike Twitter Bootstrap I have a lot more respect for it now. It’s not perfect for every project but it excels at some things. And the amount of time and effort that must have been needed to create it is phenomenal. </li>
<li>Commenting code helps others and you to understand your code. As I’m mostly self taught and often I’m working by myself or someone sat right next to me I often didn&rsquo;t feel the need to comment much. When I’ve been commenting the code that I’ve planned to release publicly I’ve found it very helpful to my understanding of the project.</li>
<li>Share early share often. I’m a little bit of a perfectionist and I tend to only want to show others what I’m working on when I’m happy with the level it’s at. This just isn’t as productive as sharing often. Two heads are better than one. All the internets heads together is also good. </li>
<li>Start small and grow. One of the main reasons that my two first ideas weren&rsquo;t successful was that there scope was just too big. A much better way to do things is build a base and add to it gradually. </li>
</ul><p>Now none of these ideas are revolutionary, but I learn by doing and this little CSS adventure has taught me a lot very quickly.</p>
