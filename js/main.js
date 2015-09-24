(function () {

  window.sr = new scrollReveal();

  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  // Mobile nav
  var gblHeadBtn = $('.gbl-head-btn');
  var gblHeadNav = $('.gbl-head-nav');
  gblHeadBtn.click( function() {
    $(this).toggleClass('active');
    gblHeadNav.toggleClass('active');
  });

  // Tabs
  var tabHeadItem = $('.tab-head-item');
  var tabContent = $('.tab-content');
  tabHeadItem.click( function() {
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    var tabID = $(this).data('tab-id');
    $('#' + tabID).siblings('.tab-content').removeClass('active');
    $('#' + tabID).addClass('active');
  });

  // Change services bg colour on scroll
  var servicesContainer = $('.services-container');

  if ($(servicesContainer).length > 0) {
    var servicesStrategy;
    var servicesHacking;
    var servicesUX;
    var servicesUXdesign;
    var servicesDesign;
    var servicesAgile;
    var servicesTests;
    var servicesCollab;

    var scrollPositions = debounce(function () {
      servicesStrategy = $('#servicesStrategy').offset().top - 200;
      servicesHacking = $('#servicesHacking').offset().top - 200;
      servicesUX = $('#servicesUX').offset().top - 200;
      servicesUXdesign = $('#servicesUXdesign').offset().top - 200;
      servicesDesign = $('#servicesDesign').offset().top - 200;
      servicesAgile = $('#servicesAgile').offset().top - 200;
      servicesTests = $('#servicesTests').offset().top - 200;
      servicesCollab = $('#servicesCollab').offset().top - 200;
    }, 100);

    var servicesBG = debounce(function () {
      var windowTop = $(window).scrollTop();

      if (windowTop > servicesCollab) {
        servicesContainer.css({'background-color':'#ed4f7e' });
      } else if (windowTop > servicesTests) {
        servicesContainer.css({'background-color':'#9b5ca4' });
      } else if (windowTop > servicesAgile) {
        servicesContainer.css({'background-color':'#faad40' });
      } else if (windowTop > servicesDesign) {
        servicesContainer.css({'background-color':'#a4ce4e' });
      } else if (windowTop > servicesUXdesign) {
        servicesContainer.css({'background-color':'#37bec0' });
      } else if (windowTop > servicesUX) {
        servicesContainer.css({'background-color':'#0ea2dc' });
      } else if (windowTop > servicesHacking) {
        servicesContainer.css({'background-color':'#ed4f7e' });
      } else {
        servicesContainer.css({'background-color':'#9b5ca4' });
      }
    }, 100);

    $(window).resize(scrollPositions).scroll(servicesBG);
    scrollPositions();
    servicesBG();
  }

  // Smooth Scrolling for Internal Links
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

  // Google Maps: Pan between different Locations
  var marker;
  var map;

  $('#londonBtn').click( function() {
    var latLng = new google.maps.LatLng(51.485672, -0.118554);
    marker.setPosition(latLng);
    map.panTo(latLng);
  });
  $('#sofiaBtn').click(function(){
    var latLng = new google.maps.LatLng(42.6742392, 23.3543577);
    marker.setPosition(latLng);
    map.panTo(latLng);
  });

  // Initialise google map
  function initialize() {
    var mapProp = {
      center: new google.maps.LatLng(51.485672, -0.118554),
      zoom: 15,
      panControl: false,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: true,
      streetViewControl: false,
      overviewMapControl: false,
      rotateControl: true,
      scrollwheel: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map"), mapProp);
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(51.485672, -0.118554),
      animation: google.maps.Animation.DROP
    });
      marker.setMap(map);
      map.panTo(marker.position);
      google.maps.event.addListener(marker, "click", function () {
    });
  }
  // Initialise map if visible
  if ($('#map').length) {
    google.maps.event.addDomListener(window, 'load', initialize);
  }


  // Stop HTML 5 video laoding on mobile
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    document.getElementById('gif1').style.visibility = 'visible';
    document.getElementById('gif1').style.backgroundImage = 'url(/img/projects/pharma-int.gif)';

    document.getElementById('gif2').style.visibility = 'visible';
    document.getElementById('gif2').style.backgroundImage = 'url(/img/projects/learning.gif)';

    document.getElementById('gif3').style.visibility = 'visible';
    document.getElementById('gif3').style.backgroundImage = 'url(/img/projects/mobile-dir.gif)';
  }

  else {
    //Add HTML 5 video on desktop
    function addSourceToVideo(element, src, type) {
        var source = document.createElement('source');

        source.src = src;
        source.type = type;

        element.appendChild(source);
    }


    var video1 = document.createElement('video');
    document.getElementById("video1").appendChild(video1);
    addSourceToVideo(video1, '/img/projects/pharma-int.mp4', 'video/mp4');
    addSourceToVideo(video1, '/img/projects/pharma-int.webm', 'video/webm');
    addSourceToVideo(video1, '/img/projects/pharma-int.ogv', 'video/ogg');
    // addSourceToVideo(img, '/img/projects/pharma-int.jpg');
    video1.play();
    video1.muted = true;
    video1.loop = true;

    var video2 = document.createElement('video');
    document.getElementById("video2").appendChild(video2);
    addSourceToVideo(video2, '/img/projects/learning.mp4', 'video/mp4');
    addSourceToVideo(video2, '/img/projects/learning.webm', 'video/webm');
    addSourceToVideo(video2, '/img/projects/learning.ogv', 'video/ogg');
    // addSourceToVideo(img, '/img/projects/learning.jpg');
    video2.play();
    video2.muted = true;
    video2.loop = true;

    var video3 = document.createElement('video');
    document.getElementById("video3").appendChild(video3);
    addSourceToVideo(video3, '/img/projects/mobile-dir.mp4', 'video/mp4');
    addSourceToVideo(video3, '/img/projects/mobile-dir.webm', 'video/webm');
    addSourceToVideo(video3, '/img/projects/mobile-dir.ogv', 'video/ogg');
    // addSourceToVideo(img, '/img/projects/mobile-dir.jpg');
    video3.play();
    video3.muted = true;
    video3.loop = true;
  }

}()); // end 'use strict'