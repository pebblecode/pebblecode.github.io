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

  // Navigation appear on scroll up
  var gblHead = $('.gbl-head');
  $(window).scroll(function() {
    if ($(this).scrollTop() >= 50) {
      gblHead.addClass('gbl-head-scroll');
    }
    else {
      gblHead.removeClass('gbl-head-scroll');
    }
  });

  // Mobile nav
  var gblHeadBtn = $('.gbl-head-btn');
  var gblHeadNav = $('.gbl-head-nav');
  gblHeadBtn.click( function() {
    $(this).toggleClass('active');
    gblHeadNav.toggleClass('active');
  });

  // Detect touch/click devices
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $('body').addClass('touch-device');
  } else {
    $('body').addClass('click-device');
  }

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

    var scrollPositions = debounce(function () {
      servicesStrategy = $('#servicesStrategy').offset().top - 200;
      servicesHacking = $('#servicesHacking').offset().top - 200;
      servicesUX = $('#servicesUX').offset().top - 200;
      servicesUXdesign = $('#servicesUXdesign').offset().top - 200;
      servicesDesign = $('#servicesDesign').offset().top - 200;
      servicesAgile = $('#servicesAgile').offset().top - 200;
      servicesTests = $('#servicesTests').offset().top - 200;
    }, 100);

    var servicesBG = debounce(function () {
      var windowTop = $(window).scrollTop();

      if (windowTop > servicesTests) {
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
        $('html, body').animate({
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

  // Initialise google maps
  function initialize() {
    initmap('map', 51.485672, -0.118554);
  }
  function healthinit() {
    initmap('healthmap', 51.5148475,-0.1269898);
  }
  function insureinit() {
    initmap('insuremap', 51.5144918,-0.0803065);
  }

  // Initialise google map
  function initmap(mapname, lat, lon) {
    var mapProp = {
      center: new google.maps.LatLng(lat, lon),
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
    map = new google.maps.Map(document.getElementById(mapname), mapProp);
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lon),
      animation: google.maps.Animation.DROP
    });
      marker.setMap(map);
      map.panTo(marker.position);
      google.maps.event.addListener(marker, "click", function () {
    });
  }
  // Initialise maps if visible
  if ($('#map').length) {
    google.maps.event.addDomListener(window, 'load', initialize);
  }
  if ($('#healthmap').length) {
    google.maps.event.addDomListener(window, 'load', healthinit);
  }
  if ($('#insuremap').length) {
    google.maps.event.addDomListener(window, 'load', insureinit);
  }

  // Console advert
  console.log('%cHey! Love the console? Then check out our careers page.','font-family: "brandon-grotesque","Helvetica Neue",Helvetica,Arial,"Lucida Grande",sans-serif;font-weight: 900;font-style: italic;text-transform: uppercase;letter-spacing: -1px;text-shadow: 3px 4px 0 rgba(0,0,0,0.1);font-size:42px;color:#ed4f7e;');

}()); // end 'use strict'
