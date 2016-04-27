# pebblecode.com

The Jekyll based website for pebblecode.com.

## Getting Started

#####1. Install [bundler](http://bundler.io/):

`gem install bundler`

You may need to include sudo at the start if there is a permissions error.

#####2. Install jekyll bundle:

`bundle install`


#####3. Build and view the website locally:

`cd [project folder]`

`jekyll serve`

To host the site on the network for testing, you'll need

`jekyll serve --host=0.0.0.0`


#####3.5. Build and view the website locally with live reloading:

`cd [project folder]`

`guard`

This will start up a server on port 4000, and it will reload on any changes to SASS, JS, and content.

#####4. View the website:

`http://localhost:4000`

## Developing
Template source can be found in `_layouts`. Component source can be found in `_includes`. Sass styles can be found in `_sass`. The jekyll website is then built into the `_site` folder which includes all of the files needed to make the website.

## Content
Most of the major editable content can be found in the markdown files (such as 1-services.md). Use the number at the start of the filename to order the pages.


## Creating a Blog Post
Create a Markdown file within the `_posts` folder. The name structure is a backward date followed by the title of your post, for example: `2011-10-18-a-day-with-clojure.md`. All of the content within this file is written using the [Markdown language](http://daringfireball.net/projects/markdown/syntax).

At the top of your markdown file there should be the post information like so:

```
---
layout: post
title:  On Average, the World is Happy
author: Ian Black
categories: hackday
thumbnail: /img/blog/happy.jpg
---
```

You can set whether an article is featured at the top of the blog homepage by setting: `feature: true` within the information section at the top of the markdown file. Make sure only *one* post is set to this.

Images are linked like this:
```
![3DS](/img/posts/2015-07-17-solving-the-right-problem/3ds.jpg)
```
The caption is included within square brackets `![caption]` and the path to the image file included within the regular brackets directly after. Include images within the `img/posts/` folder and create a new folder named after your post file name.

#### Categories
Creating new categories isn't advised due to categorised blog templates needing to be created manually. Either seek out already created categories within the `blog/tag` folder or use the following top categories:

```
Health, Transport, Design, Agile, Lightning Talks, Hacks, Tutorial, Opinion, Digital Transformation, Lean, Innovation, Bluetooth
```

## Deploying
Once you are happy, push this file to the `master` branch to go LIVE.

#### Tips
- Always wrap video elements in a `<div class="video"></div>` element if you want it to look awesome.
- Use an h3 at the start of articles to give a summary of the post.
