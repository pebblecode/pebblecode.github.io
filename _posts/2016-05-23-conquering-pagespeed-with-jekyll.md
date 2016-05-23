---
layout: post
title: Conquering PageSpeed with Jekyll
author: Peter Tait
categories: [performance, user experience]
---

### At pebble {code} we are always looking at ways to squeeze out performance gains within any project we work on, including our own website.

As the title has already given away, we focused primarily on Google’s PageSpeed to help measure the performance of our site. PageSpeed is a good start because it doesn’t just focus on performance in terms of speed but also user experience. This article will be a retrospective of what steps we took to try and reach the holy grail of a 100/100 green box on PageSpeed.


## Starting Gate
We opened up PageSpeed to find the red boxes of doom for our homepage. The user experience score was a good 98/100, however the speed score was a cool 55/100 for mobile and 65/100 for desktop.

#### Main areas of our focus:
- Avoid any render blocking javascript and css
- Optimise how css is delivered
- Reduce the amount of javascript being loaded that page doesn’t require
- Optimise images
- Increase spacing of links to reach a score of 100/100 in mobile user experience

## Render blocking javascript and css
There were three offending requests delaying the rendering of the page. One of which was a Typekit javascript request. Typekit does offer an advanced asynchronous embed code, however we chose to use an altered script that utilises the browsers sessionStorage. SessionStorage allows browsers to locally cache the font files and avoid having to redownload as they browse between pages. See below the code, courtesy of this [gist](https://gist.github.com/skddc/9134225):


    (function(d) {
      var tkTimeout=3000;
      if(window.sessionStorage){if(sessionStorage.getItem('useTypekit')==='false'){tkTimeout=0;}}
      var config = {
        kitId: ‘[KIT ID]’,
        scriptTimeout: tkTimeout
      },
      h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+"wf-inactive";if(window.sessionStorage){sessionStorage.setItem("useTypekit","false")}},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+="wf-loading";tk.src='//use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
    })(document);


With Typekit sorted, two render-blocking requests remained – both of which were css files. The first css file we set to tackle was an externally loaded file from Recruitee. The Recruitee stylesheet was used for our job listings which were embedded using Recruitee’s own scripts and styles. We decided to remove this request all together and pick out the styles we required and include this into our main css file. We use Scss for our styles making this as simple as creating a `_recruitee.scss` sheet and importing that into the `main.scss` file.

The final remaining render blocking request was our main stylesheet, this also proved to be the most tricky.

## Optimising css Delivery
Our css was delivered in a regular way of including an external minified stylesheet in the `<head>`. However, PageSpeed gulped at this. There were two problems with this method:

- The rendering of the content is blocked until the stylesheet has fully loaded (that’s a big deal for slow network connections).

- Delaying the stylesheet request so content can be loaded would cause an ugly FOUC (flash of unstyled content), which simply made our eyes cry.

Fortunately, Jekyll has a nifty built in feature called Scssify. Scssify makes it easy to include Scss directly into the <head> as inlined and minified css. Inlining critical css has become all the rage of late and for good reason. The idea is we load essential styles such as those that define the page layout and above the page fold. We can then allow for the remaining styles to load asynchronously and avoid render blocking.

We created a new `critical.scss` file and placed this into the `_includes` folder. This file simply included a list of imported Scss stylesheets which contained critical styles. Then we placed this snippet into the `<head>` and Jekyll takes care of the rest:


    { capture include_to_scssify }
     { include critical.scss }
    { endcapture }
    { { include_to_scssify | scssify } }


We’re making progress. Critical styles are now inlined, which allows us to load the main stylesheet asynchronously. Many modern browsers have a new way of doing this using the `rel=”preload”` attribute that forces the browser to load the stylesheet preemptively. However, we can’t rely on that entirely so we used a polyfill script called [loadCSS](https://github.com/filamentgroup/loadCSS). loadCSS checks to see if the browser supports `rel=”preload”`, if the browser doesn’t then loadCSS includes the stylesheet asynchronously.

## Reduction in Unrelated Javascript
We host Jekyll on gh-pages which generally works great, the main benefits are free quick servers and easy automatic deployment that anybody in the team can enjoy without any build process. However, there is a downside whereby Github doesn’t allow plugins with Jekyll. This means we have no way of bundling javascript in a minified way (unless we want to create our own build process before pushing to Github). As a result we had to find a way to reduce unrelated javascript. We did this by inlining specific javascript code into the footer of each layout and utilising liquid’s if statements to manually add in extra scripts if required. Like so:

`footer.html` (in `_includes`):

    { if include.prettyprint }
      <script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js" defer></script>
    { endif }

prettify.js is only required for the `post.html` template (in `_layouts`):

    { include footer.html prettyprint=true }

Fortunately, our website uses only a small amount of javascript which makes this possible. With the remaining global javascript request, we defer this to avoid any render blocking of the dom.


## Optimising Images
Jekyll has no clever way of optimising images, so this is something we have to keep in check manually. There are several tools on the market for image optimisation ranging from [ImageMagick](http://www.imagemagick.org/script/index.php) for the command line to a more GUI approach of [ImageOptim](https://imageoptim.com/). We started with Photoshop to ensure the image dimensions are set to the minimum and export sizes are reduced fully. Photoshop does a lot of the heavy duty work before we can do a final batch optimisation with ImageOptim or similar.

Another technique to optimise images is to sprites. We use Sketch for all of our user interface needs here at pebble {code} and there is a simple plugin called [Sketch CSS Sprite Mixin](https://github.com/littlebusters/Sketch-CSS-Sprite-Mixin) that outputs the Scss required for sprites. The Scss includes a nifty mixin and a variable for each icon. We do some tweaks to the mixin so it accepts an svg file instead of png. The benefit of svg is it’s vector format allows for scaling to retina and beyond with ease. Armed with our sprite, we now have a reduction in requests and a single small file for all of our icons.


## Time for Testing
Now we’ve implemented a bunch of improvements, it’s time for testing in PageSpeed again. We did this using the excellent Ngrok service. Our mobile speed shot up to around 80/100. Feeling pretty chuffed with ourselves until we saw our beloved User Experience score drop down to 70/100. PageSpeed showed warnings for elements not fitting the mobile viewport. Luckily, this was as a result of our main stylesheet not loading in time for PageSpeed to recognise the styling for images. A quick fix was to add a max-width of 100% to all images into the `critical.css`. Add in a few extra tweaks to increase the spacing of certain links on mobile and we smashed the 100/100 in user experience.

#### Only two recommended warnings remained on our Ngrok site:

- Improve server response

- Leverage browser caching

We knew the slow server response was down to Ngrok’s server not being terribly fast, so an extra gain when we push live would be expected. Unfortunately, browser caching wasn't quite as simple. Although, Github’s servers gzip and cache the resources, the time of which they are cached for is too short in the eyes of Google. The only way to fix this would be to place a service such as Cloudfront on top of our gh-pages site.

## Final thoughts
We pushed our changes live and can happily say we now score:

#### Desktop:
- Speed: 93/100

#### Mobile
- Speed: 90/100

- User experience: 100/100

All in the green zone, I think this is the best we can expect without the help of caching our resources. We can now sleep happy in the knowledge our visitors can zip across [pebblecode.com](pebblecode.com) in no time.