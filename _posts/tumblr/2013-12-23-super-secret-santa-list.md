---
layout: post
title: Super Secret Santa List
date: '2013-12-23T09:29:00+00:00'
categories: []
tumblr_url: http://blog.pebblecode.com/post/70882297862/super-secret-santa-list
author: John Mildinhall
---
<p><span>For the pebble {code} Christmas hack, I decided to confront an issue that has plagued yuletide revellers for years: How to get your friends and family to just give you the money rather than buy you presents.</span></p>
<div></div>
<div>To that end, I created <a href="http://johnmildinhall.github.io/supersecretsantalist/" target="_blank">supersecretsantalist.com</a>. While purporting to be a proper facebook app that is customised to give you a Christmas List for the sharer, in fact it gives everyone the same message: </div>
<div></div>
<div>&lsquo;Can you just give me the money? Thanks&rsquo;</div>
<div></div>
<div></div>
<div></div>
<div>To sugar the pill, the message is delivered by a cute Robin in a 3d snowstorm. Users can share the app with their friends. </div>
<div></div>
<div>For added creepiness, the app also allows the administrator to see who is logged in at any particular moment thanks to the realtime data that Firebase provides.</div>
<div></div>
<div><img src="https://31.media.tumblr.com/92b053b3bb313516a9c1f010b4e1d4f5/tumblr_inline_mzv9vn5A9a1svon23.png"/>
</div>
<div></div>
<div>This app is a personal testbed for Firebase, in particular its simple log on feature which allows extremely easy authentication using Facebook, Github, Google Apps, Email and other services. </div>
<div></div>
<div><a href="https://github.com/johnmildinhall/supersecretsantalist" target="_blank">Github repo</a></div>
<div></div>
<div></div>
<div><strong>Using Firebase to make a Facebook app - learnings.</strong></div>
<div></div>
<div>On the whole this works very well. There are a few little gotchas to note:</div>
<div></div>
<div><strong>'Only one person can log into my Firebase app with Facebook&rsquo;</strong></div>
<div>
<ul><li>If the app is in Sandbox mode on Facebook, your app will only work with the developer&rsquo;s credentials (probably just you). You need to take it out of Sandbox mode to test with more people, or to add them as developers on Facebook.</li>
</ul><div><strong>'Facebook throws an error because I have to enter &rsquo;<a href="https://auth.firebase.com/auth/facebook/callback" target="_blank">https://auth.firebase.com/auth/facebook/callback</a>&rsquo; as my site URL&rsquo;</strong></div>
<ul><li>There is an issue with using Facebook functionality (such as sharing) as Firebase requires that you give its own callback address as your site URL. This however means that you will receive a 191 error from Facebook, as the address that you are running from does not match the Firebase URL. The answer to this is to put your site address into the mobile site URL field in the Facebook app settings. This appears to work well.</li>
</ul><div><strong>'How can I develop a Firebase app locally and have Facebook sharing and comments work?&rsquo;</strong></div>
<ul><li>If you are developing locally, create a simple python server (on a mac you can use the command <span>python -m SimpleHTTPServer in terminal). Y</span>ou can enter your site address as <a href="http://127.0.0.1:8000/" target="_blank">http://127.0.0.1:8000</a> in Facebook, and you should be able to test Facebook functionality locally.</li>
</ul></div>
