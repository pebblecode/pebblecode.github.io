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
  var scrollCurrent = 0;
  $(window).scroll(function() {
    var scrollDiff = $(this).scrollTop();
    if(scrollDiff > scrollCurrent && scrollDiff > 100 && gblHeadNav.hasClass("active") === false) {
       $('header').addClass('hide').removeClass('show');
    } else {
       $('header').addClass('show').removeClass('hide');
    }
    scrollCurrent = scrollDiff;
  });

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

  // Change nav bg colour on scroll
  var aboutHeaderContainer = $('.about .gbl-head');
  var servicesHeaderContainer = $('.services .gbl-head');
  var workHeaderContainer = $('.work .gbl-head');
  var careersHeaderContainer = $('.careers .gbl-head');
  var blogHeaderContainer = $('.blog .gbl-head');

  if ($(aboutHeaderContainer).length > 0) {
    var aboutDirectors;

    var scrollPositions = debounce(function () {
      aboutDirectors = $('#about-directors').offset().top - 200;
    }, 100);

    var headerBG = debounce(function () {
      var windowTop = $(window).scrollTop();

     if (windowTop > aboutDirectors) {
        aboutHeaderContainer.css({'background-color':'#0ea2dc' });
      } else {
        aboutHeaderContainer.css({'background-color':'' });
      }
     }, 100);

    $(window).resize(scrollPositions).scroll(headerBG);
    scrollPositions();
    headerBG();
  }

  if ($(servicesHeaderContainer).length > 0) {
    var servicesStrategy;
    var servicesHacking;
    var servicesUX;
    var servicesUXdesign;
    var servicesDesign;
    var servicesAgile;
    var servicesTests;
    var servicesCollab;

    var scrollPositions = debounce(function () {
      servicesStrategy = $('#services-strategy').offset().top - 200;
      servicesHacking = $('#services-hacking').offset().top - 200;
      servicesUX = $('#services-UX').offset().top - 200;
      servicesUXdesign = $('#services-UX-design').offset().top - 200;
      servicesDesign = $('#services-design').offset().top - 200;
      servicesAgile = $('#services-agile').offset().top - 200;
      servicesTests = $('#services-tests').offset().top - 200;
      servicesCollab = $('#services-collab').offset().top - 200;
    }, 100);

    var headerBG = debounce(function () {
      var windowTop = $(window).scrollTop();

      if (windowTop > servicesCollab) {
        servicesHeaderContainer.css({'background-color':'#ed4f7e' });
      } else if (windowTop > servicesTests) {
        servicesHeaderContainer.css({'background-color':'#9b5ca4' });
      } else if (windowTop > servicesAgile) {
        servicesHeaderContainer.css({'background-color':'#faad40' });
      } else if (windowTop > servicesDesign) {
        servicesHeaderContainer.css({'background-color':'#a4ce4e' });
      } else if (windowTop > servicesUXdesign) {
        servicesHeaderContainer.css({'background-color':'#37bec0' });
      } else if (windowTop > servicesUX) {
        servicesHeaderContainer.css({'background-color':'#0ea2dc' });
      } else if (windowTop > servicesHacking) {
        servicesHeaderContainer.css({'background-color':'#ed4f7e' });
      } else if (windowTop > servicesStrategy) {
        servicesHeaderContainer.css({'background-color':'#9b5ca4' });
      } else {
        servicesHeaderContainer.css({'background-color':'' });
      }
    }, 100);

    $(window).resize(scrollPositions).scroll(headerBG);
    scrollPositions();
    headerBG();

  }

  if ($(workHeaderContainer).length > 0) {
    var workPharmaceutical;
    var workIntranets;
    var workSelfDirected;
    var workNextGen;
    var workEnterpriseMobile;
    var workRailTravel;
    var workHighFrequency;

    var scrollPositions = debounce(function () {
      workPharmaceutical = $('#work-pharmaceutical').offset().top - 200;
      workIntranets = $('#work-intranets').offset().top - 200;
      workSelfDirected = $('#work-self-directed').offset().top - 200;
      workNextGen = $('#work-next-gen').offset().top - 200;
      workEnterpriseMobile = $('#work-enterprise-mobile').offset().top - 200;
      workRailTravel = $('#work-rail-travel').offset().top - 200;
      workHighFrequency = $('#work-high-frequency').offset().top - 200;
    }, 100);

    var headerBG = debounce(function () {
      var windowTop = $(window).scrollTop();

     if (windowTop > workHighFrequency) {
        workHeaderContainer.css({'background-color':'#ed4f7e' });
      } else if (windowTop > workRailTravel) {
        workHeaderContainer.css({'background-color':'#faad40' });
      } else if (windowTop > workEnterpriseMobile) {
        workHeaderContainer.css({'background-color':'#a4ce4e' });
      } else if (windowTop > workNextGen) {
        workHeaderContainer.css({'background-color':'#0ea2dc' });
      } else if (windowTop > workSelfDirected) {
        workHeaderContainer.css({'background-color':'#37bec0' });
      } else if (windowTop > workIntranets) {
        workHeaderContainer.css({'background-color':'#ed4f7e' });
      } else if (windowTop > workPharmaceutical) {
        workHeaderContainer.css({'background-color':'#9b5ca4' });
      } else {
        workHeaderContainer.css({'background-color':'' });
      }
     }, 100);

    $(window).resize(scrollPositions).scroll(headerBG);
    scrollPositions();
    headerBG();
  }

  if ($(careersHeaderContainer).length > 0) {
    var careersBenefits;
    var careersKaizen;

    var scrollPositions = debounce(function () {
      careersBenefits = $('#careers-benefits').offset().top - 200;
      careersKaizen = $('#careers-kaizen').offset().top - 200;
    }, 100);

    var headerBG = debounce(function () {
      var windowTop = $(window).scrollTop();

     if (windowTop > careersBenefits) {
        careersHeaderContainer.css({'background-color':'#0ea2dc' });
      } else if (windowTop > careersKaizen) {
        careersHeaderContainer.css({'background-color':'#37bec0' });
      } else {
        careersHeaderContainer.css({'background-color':'' });
      }
     }, 100);

    $(window).resize(scrollPositions).scroll(headerBG);
    scrollPositions();
    headerBG();
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

  // Initialise google maps
  function initialize() {
    initmap("map", 51.485672, -0.118554);
  }
  function healthinit() {
    initmap("healthmap", 51.5148475,-0.1269898);
  }
  function insureinit() {
    initmap("insuremap", 51.5144918,-0.0803065);
  }
  function digitalinit() {
    initmap("digitalmap", 51.5074754,-0.1389263);
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
  if ($('#digitalmap').length) {
    google.maps.event.addDomListener(window, 'load', digitalinit);
  }

  // Console advert
  console.log('%cHey! Love the console? Then check out our careers page.','font-family: "brandon-grotesque","Helvetica Neue",Helvetica,Arial,"Lucida Grande",sans-serif;font-weight: 900;font-style: italic;text-transform: uppercase;letter-spacing: -1px;text-shadow: 3px 4px 0 rgba(0,0,0,0.1);font-size:42px;color:#ed4f7e;');

}()); // end 'use strict'
