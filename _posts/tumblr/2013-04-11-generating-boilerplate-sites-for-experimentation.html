---
layout: post
title: Generating boilerplate sites for experimentation with Github and shell aliases.
date: '2013-04-11T15:10:29+01:00'
tags: []
tumblr_url: http://blog.pebblecode.com/post/47700920100/generating-boilerplate-sites-for-experimentation
author: Mark Durrant
---
<p>I often want to create a small boilerplate site to experiment with as it&rsquo;s great to try new things out in a sandboxed environment. You can completely focus on the problem at hand and not have to work around existing code. In this post I&rsquo;m going to talk about how I generate my boilerplate and why I&rsquo;ve chosen this workflow.</p>

<h3>Why don&rsquo;t you use…</h3>

<p>There are a few online services that let you experiment with front end development such as <a href="http://jsfiddle.net/">js fiddle</a> and <a href="http://codepen.io/">Codepen</a>. They do a great job and allow you to easily share or show off your code, however I still prefer to experiment locally for several reasons…</p>

<ul><li>I want to use the tools I&rsquo;m comfortable with. Working in a dedicated text editor is much more pleasant than writing code in a text box within a browser. I also have several command line and GUI tools I use regularly that I may want to experiment with.</li>
<li>If I decided to move the project past the experimentation stage I can do so easily, without having to copy code from an online service.</li>
<li>It&rsquo;s easy to include images and other local media, I don&rsquo;t need to upload assets to the web in order to experiment with them. </li>
</ul><h3>Or you could try…</h3>

<p>There are also a couple of command line tools that let you generate boilerplate sites such as <a href="http://yeoman.io/">Yeoman</a>. Tools such as Yeoman are amazing and can do much more than just generate boilerplate sites, unfortunately as with all software all these extra functions come at a price. Yeoman does far more than I need which makes it much harder for me to use and understand.</p>

<h3>My approach</h3>

<p>My experimentation workflow starts with a Github repo containing  a bare-bones site that fits the way I work. My current experiments repo is a super simple static site that focuses on Sass. You can see my experiments base repo on Github <a href="https://github.com/markdurrant/experiment_base">here</a>.</p>

<p>As my experiments base is stored as a simple Git repo, it&rsquo;s easy for me to update it when I find new methods or tools that I&rsquo;d like to include in future experiments.</p>

<p>I can then clone this boilerplate site into a directory of my choice with git clone.</p>

<pre><code>$: git clone git@github.com:yourUserName/YourRepoName.git yourExperimentsDirectory
</code></pre>

<p>After this, I remove Git so that no changes I make, accidentally leak back to my original repo. That way any changes I make to the original repo don&rsquo;t affect any of the experiments created from it.</p>

<pre><code>$: rm -rf .git
</code></pre>

<p>To make this process quicker I have strung these commands together in a shell function. I&rsquo;m using the excellent <a href="http://ridiculousfish.com/shell/">fishfish shell</a> (which I would highly recommend) so my function looks something like this.</p>

<pre><code>function experiment
  git clone git@github.com:yourUserName/YourRepoName.git $argv
  cd $argv
  rm -rf .git/
end
</code></pre>

<p>However if you&rsquo;re using bash, you&rsquo;ll want something more like this.</p>

<pre><code>function experiment () {
  git clone git@github.com:yourUserName/YourRepoName.git $1
  cd $1
  rm -rf .git/
}
</code></pre>

<p>I&rsquo;ve been using this system for a while now and it&rsquo;s working really well for me. I especially like that there&rsquo;s no &lsquo;magic&rsquo; involved. I know what&rsquo;s happening at every step in the process and there&rsquo;s no framework or new technology to learn.</p>

<p>If you have any idea how this process could be improved or if you have an example of your personal boilerplate that you&rsquo;d like to share please get in touch in the comments.</p>
