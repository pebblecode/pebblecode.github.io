---
layout: post
title: pebble.it site redesign
date: '2012-09-06T09:18:47+01:00'
categories:
- pebble.it
- design
- css
tumblr_url: http://blog.pebblecode.com/post/30986543254/pebble-it-site-redesign
author: Mark Durrant
---
<p>Recently I was asked to design a new site for our awesome sister company <a href="http://pebbleit.com/">pebble.it</a>. Rather than write a blog post going through the entire process I&rsquo;ve decided to just talk about a few key points within the development for the new pebble.it site. A lot of development ideas were carried over from the pebblecode.com design, I wrote a blog post about that process <a href="http://blog.pebblecode.com/blog/our-website-redesign">here</a> which is a good preface to this post.</p>

<h3>The concept</h3>

<p>After getting the brief from Paul (MD of pebble.it) I came to him with a few high level ideas for the site. I showed Paul some research I had done on the &ldquo;international typographic style&rdquo; also know as the &ldquo;Swiss style&rdquo; such as the work of <a href="http://www.josef-muller-brockmann.net/">Josef Muller Brockmann</a>. We both really liked this style and talked about how we could use it for the website. This was the to be the main inspiration for the site. Hopefully you can see the influence of this style within the site. For example the heavy use of Helvetica and use of a single color. However as the site progressed the site became a lot less rigid than you would typically find within the &ldquo;Swiss style&rdquo;.</p>

<h3>Mobile first</h3>

<p><a href="http://www.lukew.com/">Luke Wroblewski</a> first proposed the idea of <a href="http://www.lukew.com/ff/entry.asp?933">&ldquo;mobile first design&rdquo;</a> back in 2009. Since then the idea has been gaining more and more traction within the web development community. When I re-designed the pebblecode.com site I didn&rsquo;t take this approach, after having read a lot of praise for the idea I decided I would try and take a mobile first approach to designing pebbleit.com.</p>

<p>After having tried it I&rsquo;m fairly confident that mobile first is the best way to go about designing a responsive web site. From a design point of view it&rsquo;s much easier to expand a smaller design into a larger area than it is to to the opposite (and probably gives better results). More importantly I think going &ldquo;mobile first&rdquo; helped us to really refine the content and kept our focus on the core features of the site.</p>

<h3>Designing in browser</h3>

<p>More and more I&rsquo;ve been designing &ldquo;in browser&rdquo;. I&rsquo;m always starting with sketches or illustrator mock ups but I&rsquo;m finding I&rsquo;m making more and more design decision in the browser and doing all most all of the detail work in CSS rather than copying from flat documents. There are a few reasons why I&rsquo;m using this approach more and more but the one that stuck out on this project was the ease of getting instant feedback. Illustrator or Photoshop Documents are fine for getting an idea across but they have a few drawbacks.</p>

<ul><li>Not everyone can open .psd or .ai files. And most people can&rsquo;t edit them.</li>
<li>They don&rsquo;t show any interactive elements. For example hover states.</li>
<li>You need to create multiple files for mobile &amp; desktop versions.</li>
<li>These files can be large and therefore awkward to send.</li>
</ul><p>Working directly in HTML &amp; CSS takes out a lot of these headaches and can really speed up feedback.</p>

<h3>Organizing Sass</h3>

<p>Whilst working on the pebble {code} site we mainly used classes applied to the <code>&lt;body&gt;</code> tag and Sass&rsquo;s nesting feature to organize our code. Something that looked a bit like this.</p>

<pre><code>.page-products{

  .row{
    margin-top: 22px;
    margin-bottom: 36px;
    .columns6{
      margin-left: 0;
      p {
        margin-top: 22px;
      }
    }
  }

  .vistazo{
    .img{
      background-color: blue;
      background-image: url("/images/vistazo.jpg");
    }
    a{
      color: blue;
    }
  }

  .open-source{
    .columns6 {
      margin-left: 0;
    }
    p{
      margin-top: 22px;
      margin-bottom: 0;
    }
  }
}
</code></pre>

<p>Now this works but it dose create a couple problems. Firstly it produces very inefficient CSS. For example the <code>.vistazo</code> and <code>open-source</code> classes are unique and doesn&rsquo;t require nesting, using nesting in this way created unnecessary CSS. Secondly its very difficult to pick out the start and end of sections visually means you spend longer searching for the rules you want to edit.</p>

<p>With the pebble.it Sass I used a different style of organization. This method has been tweaked from and idea in this <a href="http://csswizardry.com/2012/04/my-html-css-coding-style/">post</a> by Harry Roberts (skip to &ldquo;Section titles&rdquo; for the idea I&rsquo;m discussing). So my new organizational style would look more like this looks.</p>

<pre><code>// ==========================================================
// §PAGE-PRODUCTS
// ==========================================================

.page-products{

  .row{
    margin-top: 22px;
    margin-bottom: 36px;
    .columns6{
      margin-left: 0;
      p {
        margin-top: 22px;
      }
    }
  }
}

.vistazo{
  .img{
    background-color: blue;
    background-image: url("/images/vistazo.jpg");
  }
  a{
    color: blue;
  }
}

.open-source{
  .columns6 {
    margin-left: 0;
  }
  p{
    margin-top: 22px;
    margin-bottom: 0;
  }
}

// ==========================================================
</code></pre>

<p>Not a huge difference, but it produces much cleaner CSS and it&rsquo;s a lost easier to visually distinguish sections when looking through the code. Also worth mentioning is that in Harry&rsquo;s article he suggests using <code>$</code> for section headers to make searching in your text editor a little easier, Sass uses <code>$</code> to declare variables so I&rsquo;m using <code>§</code> to avoid conflicts.</p>

<p>The new pebble.it site was a really fun project to work on and I&rsquo;m really happy with the result. Even better along the way I&rsquo;ve discovered a few new tricks and tactics that are going to make it into my daily toolbox.</p>
