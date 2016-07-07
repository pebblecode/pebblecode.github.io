pebblecode.com
======

This is the main repo for the [pebble {code}](pebblecode.com) website, hosted on gh-pages. The website is built using Hugo and using tech such as gulp, postcss and es2015.

Initial boilerplate is based off of [hugulp](https://github.com/jbrodriguez/hugulp) by Juan B. Rodriguez.

<br>

***

## Getting Started

#### Install Hugo
`brew install hugo`

#### Install Node
`brew install node`

#### Install npm dependencies
`npm install`


<br>

***

## Run Gulp
Run the `default` gulp task with:

`npm start`

<br>

This will do the following:
- The **styles**, **scripts** and **images** tasks get executed first to do the heavy lifting of compressing images and minifying css/js files.
- The **revision** task runs next to fingerprint the optimized assets.
- Then the **hugo:all** task is invoked to generate the static site<br>
hugo will run as if invoked like this:
```
$ hugo --config=./hugo/config.yaml -s ./hugo -d ./public --buildDrafts=true --verbose=true --baseUrl="http://localhost:3000/"
```

- The **reference:all** task replaces all asset ocurrences with their fingerprinted versions
- Finally, the browser is reloaded so that you can very quickly check the changes you made

<br>

***

## Publish step
There's also a `publish` task you can run:

`npm run publish`

<br>

This will perform all the steps above, but Hugo will be run with as follows:

`hugo --config=./hugo/config.yaml -s ./hugo -d ./public"`
