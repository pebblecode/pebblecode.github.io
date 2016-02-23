---
layout: post
title: 'Maths and Motion - An introduction to paperJS'
author: Niall Henn
categories: [tutorial]
thumbnail: /img/blog/maths-and-motion/nh-maths-01.jpg
---

![first dot](/img/blog/maths-and-motion/nh-maths-01.jpg)

Hi there,

This is a tutorial aimed at introducing [paper.js](http://paperjs.org/) and basic vector maths. We’re going to go right the way through from making points to making some interactive bits move.
Going over a few techniques common to the creative coding world.

The files are in the [Repo](https://github.com/pebblecode/maths-and-motion-1) below and everything we've done can by done by editing the index.html, but all the stages are there as well if you want to cheat.

I’ve optimised for fun and pizzazz over good code, so don’t judge too harshly!

If you just want the code, then feel free to pull down the [Repo](https://github.com/pebblecode/maths-and-motion-1) and play around with it.

Otherwise, sit comfortably and I’ll talk you through the process from start to finish. Thanks for joining us!

## 1

First step is to set up your document. I’m going to presume you know a little about HTML already, and the below all makes sense to you.

PaperJs uses its own paperscript syntax, which is essentially an extended version of javascript that contains various helpful functions for geometry.

The important thing to note is that the script tag that calls your paperscript file needs to specify a canvas, which in this case is the ID of the canvas listed within the body (which can be whatever you want).

For ease of use, we're going to put our code directly into the the index.html file, (as opposed to in an external file) so that'll be set up like so:

    <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="mobile-web-app-capable" content="yes">
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
          <title>PaperJs Experiments</title>

          <link rel="stylesheet" href="style.css">
          <script type="text/javascript" src="js/paper-full.js"></script>

            <script type="text/paperscript" canvas="mycanvas">
               // INSERT CODE HERE
            </script>
        </head>
        <body>

          <canvas id="mycanvas" class="fullwidthbgcanvas" resize></canvas>

        </body>
      </html>


Our CSS file doesn’t need much in it except canvas and window sizing to make it 100%, and a little background colour.

In our style.css

    html,
    body {
      margin: 0;
      padding: 0;
      height: 100%;
    }

    .fullwidthbgcanvas {
      width: 100%;
      height: 100%;
      background: #113;
      position: fixed;
      z-index: -1;
      margin: 0;
      padding: 0;
      top: 0;
      left: 0;
    }

WooHoo!
Now we’re ready to start writing paperJs code!

## 2

So in the space we put "INSERT CODE HERE"..

Let’s start by using the very basic currency of paperJS; a circle, placed at a point. The following two lines of code will place one in the centre of the screen, and give it a white colour. (change fillColor to strokeColor to get an outline instead)

    var myCircle = new Path.Circle(view.center, 20);
    myCircle.fillColor = "white";

We’re initialising a new Circle (note the capitalisation) passing it two arguments; one for the centre point of the screen `view.center` and the other for the radius of the circle `20`

If we go to our file in the browser, we should see just that.

![Image 2](/img/blog/maths-and-motion/nh-maths-02.jpg)

It’s pretty basic at the moment, but it’s a fundamental part of what we’re doing so it’s great to get an initial handle on it.

## 3

Next we’re going to look at making a few more circles, in order to make a triangle.

For this quick walkthrough, we’re going to do it in a very scrappy way and duplicate the code above three times, changing the position of the point each time.
We’re going to initialise a variable for the centre point, then create 3 points that space out from there.

      var c = view.center;

      var p1 = new Point(c.x + 100, c.y+100);
      var myCircle = new Path.Circle(p1, 10);
      myCircle.fillColor = "white";

      var p2 = new Point(c.x - 100, c.y+100);
      var myCircle = new Path.Circle(p2, 10);
      myCircle.fillColor = "white";

      var p3 = new Point(c.x, c.y-100);
      var myCircle = new Path.Circle(p3, 10);
      myCircle.fillColor = "white";

You’ll see we get a triangle of dots.
Lovely!

![Image 3](/img/blog/maths-and-motion/nh-maths-03.jpg)


## 4

For our next step, we’re going to upgrade that triangle of circles into an actual triangle, and neaten up some of the code in the process.

But as any good programmer will tell you, it’s terrible form to repeat stuff, so of course we make that code a little neater and more modular.

You’ll notice that rather than calling `new Circle`, we’re now calling `new Path` that creates a (you guessed it!) path.

We’re also setting up an array of points, which we then pass to the Path initialisation function instead.

      var c = view.center;
      var Radius = 50;

      var points = [
        new Point(c.x + Radius, c.y+Radius),
        new Point(c.x - Radius, c.y+Radius),
        new Point(c.x, c.y-Radius)
        ];

      var path = new Path(points);
          path.fillColor = "white";

![Image 4](/img/blog/maths-and-motion/nh-maths-04.jpg)

So now we can wrap that code in a function instead, meaning we can create the same triangle wherever we want, as we pass it the centre point when we create it.

      function createTriangle(triangleCenter){
          var c = triangleCenter;
          var Radius = 50;

        var points = [
          new Point(c.x + Radius, c.y+Radius),
          new Point(c.x - Radius, c.y+Radius),
          new Point(c.x, c.y-Radius)
          ];

        var path = new Path(points);
          path.fillColor = "white";
          // path.fillColor = Color.random();
      }

      createTriangle(view.center);

      function onMouseMove(event) {
        createTriangle(event.point);
      }

You’ll see that we also added paperJs’s onMouseMove event to draw the triangle wherever we wanted. It’s pretty sweet, huh?

And if you uncomment the line that mentions `Color.random()` you’ll see one of the other advantages of building triangles in a function; we can now add random seeds to generate things differently every time that function is called - making unique shapes.

Lovely stuff.


## 5

So let’s add a bit of order to proceedings.
We’re going to add a new ability to our create Triangle function, so when we create it change the radius of the triangle.
So let’s add radius as an argument to the createTriangle function.

    function createTriangle(_triangleCenter, _radius){
      var c = _triangleCenter;
      var Radius = _radius;

      var points = [
        new Point(c.x + Radius, c.y+Radius),
        new Point(c.x - Radius, c.y+Radius),
        new Point(c.x, c.y-Radius)
        ];

      var path = new Path(points);
      var triangleColor = Color.random();
      path.fillColor = triangleColor;
    }

And instead of drawing one triangle in the middle.
We’re going to start at the left edge, and draw a triangle at a specified interval until we reach the right edge.

Note, that we're using a variable for the distance of the triangles, and the radius of the triangles is half of this.

    var triDistance = 50;

    for(var i = 0; i < view.size.width; i+= triDistance) {
        var Radius = triDistance/2;
        var triangleCenter = new Point(i,view.center.y);
        createTriangle(triangleCenter, Radius);
    }

![Image 5](/img/blog/maths-and-motion/nh-maths-09.jpg)

Now we're going to do the same loop from top to bottom.
Ao let's add another for loop around that code.

    var triDistance = 50;

    for(var i = 0; i < view.size.width; i+= triDistance) {
      for(var j = 0; j < view.size.height; j+= triDistance) {

        var Radius = triDistance/2;
        var triangleCenter = new Point(i,j);
        createTriangle(triangleCenter, Radius);
      }
    }

![Image 5](/img/blog/maths-and-motion/nh-maths-10.jpg)

Loooaaaddsss of triangles!


## 6

But one of the great things about triangles in that they tessalate really well.
So let's look at fitting new triangles into the gaps left there.

A nice accident of the way that we created the triangles is that if we invert the radius, we invert the triangle, so for the second one let's do that and place it half the distance across (which we already have in the form of the radius variable).

    var triDistance = 50;

    for(var i = 0; i < view.size.width; i+= triDistance) {
        for(var j = 0; j < view.size.height; j+= triDistance) {
          var Radius = triDistance/2;
          var triangleCenter = new Point(i,j);
          createTriangle(triangleCenter, Radius);

          var nextTriangleCenter = new Point(i+Radius,j);
          createTriangle(nextTriangleCenter, -Radius);
        }
      }

[Algebraic!](http://www.webetmascara.ca/wp-content/uploads/2013/09/Think-Geek.jpg)

Doesn't that look lovely?

![Image 6](/img/blog/maths-and-motion/nh-maths-11.jpg)

## 7

It does look lovely, but some boring people might say it's a little too lurid in the colour scheme.
They'd be wrong of course, but let's humour them and limit the colours.

We're going to make an array of colours and access a random value from it when we create the triangles.

Let's change our createTriangle function to be something like the following.
The triangleColor variable is the one we've changed.
The triangle generating loops will remain the same.

    var colours = ['#363938', '#386567', '#5C4134', '#C4A778', '#CE9B59'];

    function createTriangle(_triangleCenter, _radius){
      var c = _triangleCenter;
      var Radius = _radius;

      var points = [
        new Point(c.x + Radius, c.y+Radius),
        new Point(c.x - Radius, c.y+Radius),
        new Point(c.x, c.y-Radius)
        ];

      var path = new Path(points);
      var triangleColor = colours[Math.floor(Math.random()*colours.length)];
      path.fillColor = triangleColor;
    }

[Niiccee!](https://www.youtube.com/watch?v=GdCNtgOO18E)


![Image 7](/img/blog/maths-and-motion/nh-maths-06.jpg)


## 8

So far, so static..
So let's try and add some movement to it.

One of our first issues is that we have no way of addressing the triangles individually.
We're pushing a triangle to the canvas, then overwriting it each time, so let's make an array of triangles and push to that instead.

First we're going to amend our createTriangle function so it adds our new triangle to an array rather than just to the canvas. We're going to pass the name of the array as an argument into the function.


    var colours = ['#363938', '#386567', '#5C4134', '#C4A778', '#CE9B59'];

    function createTriangle(_triangleArray, _triangleCenter, _radius){
      var c = _triangleCenter;
      var Radius = _radius;

      var points = [
        new Point(c.x + Radius, c.y+Radius),
        new Point(c.x - Radius, c.y+Radius),
        new Point(c.x, c.y-Radius)
        ];

      var path = new Path(points);
      var triangleColor = colours[Math.floor(Math.random()*colours.length)];
      path.fillColor = triangleColor;

      _triangleArray.push(path);
    }


So we first create an empty array named triArray, and then when we create our triangles, we pass the name of the array to it like so.

    var triArray = [];
    var triDistance = 50;

    for(var i = 0; i < view.size.width; i+= triDistance) {
        for(var j = 0; j < view.size.height; j+= triDistance) {
          var Radius = triDistance/2;
          var triangleCenter = new Point(i,j);
          createTriangle(triArray, triangleCenter, Radius);

          var nextTriangleCenter = new Point(i+Radius,j);
          createTriangle(triArray, nextTriangleCenter, -Radius);
        }
      }


But right now, this just looks the same as before.
So as a great way of illustrating it, let's take a look at paperJS's onFrame function, which runs the code inside it 30 times a second - this is how movement happens in paperJS.

We're going to use a function of paperJS where we can access the fill colour of our shape, and increase the hue of each individual triangle every frame.

Let's write the below code underneath our generation loops.

    function onFrame(event) {
       for(var i = 0; i < triArray.length; i++) {
            triArray[i].fillColor.hue +=5;
       }
    }


Wooo... Constantly Changing Colours!

![Image 8](/img/blog/maths-and-motion/nh-maths-12.jpg)


We can change that to a random colour to get some similar eye burning results.

    function onFrame(event) {
       for(var i = 0; i < triArray.length; i++) {
            var triangleColor = Color.random();
            triArray[i].fillColor = triangleColor;
        }
    }

WWWWAAAAAAHHHHHHHHHH!!!!

Let's slow the framerate down slightly. Note, there's no way to do this natively in paperJS.
We have to write our own version by making a count variable that we increment each frame.
When it gets to 20, we change the colour of the triangles.

    var count = 0;

    function onFrame(event) {
      count++;

      if (count >= 20){
          count = 0;
          for(var i = 0; i < triArray.length; i++) {
            var triangleColor = Color.random();
            triArray[i].fillColor = triangleColor;
          }
      }
    }

That's a lot nicer! Your eyes are very grateful!


## 9

Colours are nice and all, but we can do a lot more with our triangles!

Let's try something different and vary the size.
We're going to use a sine function based on the seconds elapsed since the animation.
Note, we no longer the the framerate moderation as the sine is naturally a lot smoother.


    function onFrame(event) {
       for(var i = 0; i < triArray.length; i++) {
          var sinus = Math.sin(event.time * 2 + (i*400));
          triArray[i].scaling = sinus;
        }
    }


![Image 9](/img/blog/maths-and-motion/nh-maths-07.jpg)


Pretty lovely huh?
You can now amaze your friends with your triangle creating abilities.

Aaaannnnnddd that's about it for this tutorial.
We made some awesome triangles, then we made them move in some lovely ways.

Tune in next time when we'll look at adding some interaction and a few other techniques for movement.
Should be a blast.

If you try this tutorial, we'd really love to hear how you got on and any thoughts you might have.
Let us know on the [Twitter!](https://twitter.com/pebblecode)

[Niall](https://twitter.com/niallhenn)