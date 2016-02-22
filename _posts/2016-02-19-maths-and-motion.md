---
layout: post
title: 'Maths and Motion - An introduction to paperJS'
author: Niall Henn
categories: [tutorial]
---

![first dot](/img/blog/maths-and-motion/nh-maths-01.jpg)

Hi there,

This is a tutorial aimed at introducing paper.js and basic vector maths. We’re going to go right the way through from making points to making some interactive bits move.
Going over a few techniques common to the creative coding world.

I’ve optimised for fun and pizzazz over good code, so don’t judge too harshly!

If you just want the code, then feel free to pull down the repo and play around with it.

Otherwise, sit comfortably and I’ll talk you through the process from start to finish. Thanks for joining us!

##1

First step is to set up your document. I’m going to presume you know a little about HTML already, and the below all makes sense to you.

PaperJs uses its own paperscript syntax, which is essentially an extended version of javascript that contains various helpful functions for geometry.

The important thing to note is that the script tag that calls your paperscript file needs to specify a canvas, which in this case is the ID of the canvas listed within the body (which can be whatever you want).

So our index.html file:

    <!DOCTYPE html>
    <html>
      <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

      <link rel="stylesheet" href="/css/style.css">
      <script type="text/javascript" src="/js/vendor/paper-full.js"></script>
      <script type="text/paperscript" canvas="mycanvas" src="myscript.js"></script>

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

Now we’re ready to start writing paperJs code!

##2

In our myscript.js file.

Let’s start by using the very basic currency of paperJS; a circle, placed at a point. The following two lines of code will place one in the centre of the screen, and give it a white colour. (change fillColor to strokeColor to get an outline instead)

  var myCircle = new Path.Circle(view.center, 20);
  myCircle.fillColor = 'white';

We’re initialising a new Circle (note the capitalisation) passing it two arguments; one for the centre point of the screen `view.center` and the other for the radius of the circle `20`

If we go to our file in the browser, we should see just that.

![first dot](/img/blog/maths-and-motion/nh-maths-02.jpg)

It’s pretty basic at the moment, but it’s a fundamental part of what we’re doing so it’s great to get an initial handle on it.

##3

Next we’re going to look at making a few more circles, in order to make a triangle.

For this quick walkthrough, we’re going to do it in a very scrappy way and duplicate the code above three times, changing the position of the point each time.
We’re going to initialise a variable for the centre point, then create 3 points that space out from there.

      var c = view.center;

      var p1 = new Point(c.x + 100, c.y+100);
      var myCircle = new Path.Circle(p1, 10);
      myCircle.fillColor = 'white';

      var p2 = new Point(c.x - 100, c.y+100);
      var myCircle = new Path.Circle(p2, 10);
      myCircle.fillColor = 'white';

      var p3 = new Point(c.x, c.y-100);
      var myCircle = new Path.Circle(p3, 10);
      myCircle.fillColor = 'white';

You’ll see we get a triangle of dots.
Lovely!

![first dot](/img/blog/maths-and-motion/nh-maths-03.jpg)


##4

For our next step, we’re going to upgrade that triangle of circles into an actual triangle, and neaten up some of the code in the process.

But as any good programmer will tell you, it’s terrible to repeat stuff, so of course we make that code a little neater and more modular.

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
          path.fillColor = 'white';

![first dot](/img/blog/maths-and-motion/nh-maths-04.jpg)

So now we can wrap that code in a function instead, meaning we can create the same triangle wherever we want, as we parse it the centre point when we create it.

      function createTriangle(triangleCenter){
          var c = triangleCenter;
          var Radius = 50;

        var points = [
          new Point(c.x + Radius, c.y+Radius),
          new Point(c.x - Radius, c.y+Radius),
          new Point(c.x, c.y-Radius)
          ];

        var path = new Path(points);
          path.fillColor = 'white';
          // path.fillColor = Color.random();
      }

      createTriangle(view.center);

      function onMouseMove(event) {
        createTriangle(event.point);
      }

You’ll see that we also added paperJs’s onMouseMove event to draw the triangle wherever we wanted. It’s pretty sweet, huh?

And if you uncomment the line that mentions `Color.random()` you’ll see one of the other advantages of building triangles in a function; we can now add random seeds to generate things differently every time that function is called - making unique shapes.

Lovely stuff.


##5

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


Now we're going to do the same loop from top to bottom.

    var triDistance = 50;

    for(var i = 0; i < view.size.width; i+= triDistance) {
      for(var j = 0; j < view.size.height; j+= triDistance) {

        var Radius = triDistance/2;
        var triangleCenter = new Point(i,j);
        createTriangle(triangleCenter, Radius);
      }
    }

Loooaaaddsss of triangles!


##6

But one of the great things about triangles in that they tessalate really well.
So let's look at fitting new triangles into the gaps left there.

    var triDistance = 50;

    for(var i = 0; i < view.size.width; i+= triDistance) {
        var Radius = triDistance/2;
        var triangleCenter = new Point(i,j);
        createTriangle(triangleCenter, Radius);

        var nextTriangleCenter = new Point(i+Radius,j);
        createTriangle(nextTriangleCenter, -Radius);
    }

