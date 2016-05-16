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
  var gblHead = $('.gbl-head');
  $(window).scroll(function() {
    var scrollDiff = $(this).scrollTop();
    if(scrollDiff > scrollCurrent && scrollDiff > 100 && gblHeadNav.hasClass('active') === false) {
      gblHead.addClass('hide').removeClass('show');
    } else {
      gblHead.addClass('show').removeClass('hide');
    }
    if (scrollDiff > 100) {
      gblHead.removeClass('top');
    } else {
      gblHead.addClass('top');
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

  // Detect touch/click devices
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $( 'body' ).addClass( 'touch-device' );
  } else {
    $( 'body' ).addClass( 'click-device' );
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

  // Change services page + services header bg colour on scroll
  var servicesContainer = $('.services-container');
  var servicesHeaderContainer = $('.services .gbl-head');

  if ($(servicesContainer).length > 0) {
    var servicesStrategy;
    var servicesHacking;
    var servicesUX;
    var servicesUXdesign;
    var servicesDesign;
    var servicesAgile;
    var servicesTests;

    var scrollPositions = function () {
      servicesContent = $('#services-content').offset().top - 150;
      servicesStrategy = $('#services-strategy').offset().top - 150;
      servicesHacking = $('#services-hacking').offset().top - 150;
      servicesUX = $('#services-ux').offset().top - 150;
      servicesUXdesign = $('#services-ux-design').offset().top - 150;
      servicesDesign = $('#services-design').offset().top - 150;
      servicesAgile = $('#services-agile').offset().top - 150;
      servicesTests = $('#services-tests').offset().top - 150;
    };

    var servicesBG = function () {
      var windowTop = $(window).scrollTop();

      if (windowTop > servicesTests) {
        servicesContainer.css({'background-color':'#9b5ca4' });
        servicesHeaderContainer.css({'background-color':'#9b5ca4' });
      } else if (windowTop > servicesAgile) {
        servicesContainer.css({'background-color':'#faad40' });
        servicesHeaderContainer.css({'background-color':'#faad40' });
      } else if (windowTop > servicesDesign) {
        servicesContainer.css({'background-color':'#a4ce4e' });
        servicesHeaderContainer.css({'background-color':'#a4ce4e' });
      } else if (windowTop > servicesUXdesign) {
        servicesContainer.css({'background-color':'#37bec0' });
        servicesHeaderContainer.css({'background-color':'#37bec0' });
      } else if (windowTop > servicesUX) {
        servicesContainer.css({'background-color':'#0ea2dc' });
        servicesHeaderContainer.css({'background-color':'#0ea2dc' });
      } else if (windowTop > servicesHacking) {
        servicesContainer.css({'background-color':'#ed4f7e' });
        servicesHeaderContainer.css({'background-color':'#ed4f7e' });
      } else if (windowTop > servicesStrategy) {
        servicesContainer.css({'background-color':'#9b5ca4' });
        servicesHeaderContainer.css({'background-color':'#9b5ca4' });
      } else if (windowTop > servicesContent) {
        servicesHeaderContainer.css({'background-color':'#37bec0' });
      }
    };

    $(window).resize(scrollPositions).scroll(servicesBG);
    scrollPositions();
    servicesBG();
  }

  // Change nav bg colour on scroll
  var homeHeaderContainer = $('.home .gbl-head');
  var aboutHeaderContainer = $('.about .gbl-head');
  var workHeaderContainer = $('.work .gbl-head');
  var careersHeaderContainer = $('.careers .gbl-head');
  var blogHeaderContainer = $('.blog .gbl-head');

  if ($(homeHeaderContainer).length > 0) {
    var homeIndustry;
    var homeFeatProject;

    var scrollPositions = function () {
      homeIndustry = $('#home-industry').offset().top - 200;
      homeProject = $('#home-project').offset().top - 200;
    };

    var headerBG = function () {
      var windowTop = $(window).scrollTop();

      if (windowTop > homeProject) {
        homeHeaderContainer.css({'background-color':'#37bec0' });
      } else if (windowTop > homeIndustry) {
        homeHeaderContainer.css({'background-color':'#0ea2dc' });
      } else {
        homeHeaderContainer.css({'background-color':'#ed4f7e' });
      }
    };

    $(window).resize(scrollPositions).scroll(headerBG);
    scrollPositions();
    headerBG();
  }

  if ($(aboutHeaderContainer).length > 0) {
    var aboutDirectors;

    var scrollPositions = function () {
      aboutDirectors = $('#about-directors').offset().top - 200;
    };

    var headerBG = function () {
      var windowTop = $(window).scrollTop();

     if (windowTop > aboutDirectors) {
        aboutHeaderContainer.css({'background-color':'#0ea2dc' });
      } else {
        aboutHeaderContainer.css({'background-color':'' });
      }
     };

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

    var scrollPositions = function () {
      workPharmaceutical = $('#work-pharmaceutical').offset().top - 200;
      workIntranets = $('#work-intranets').offset().top - 200;
      workSelfDirected = $('#work-self-directed').offset().top - 200;
      workNextGen = $('#work-next-gen').offset().top - 200;
      workEnterpriseMobile = $('#work-enterprise-mobile').offset().top - 200;
      workRailTravel = $('#work-rail-travel').offset().top - 200;
      workHighFrequency = $('#work-high-frequency').offset().top - 200;
    };

    var headerBG = function () {
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
     };

    $(window).resize(scrollPositions).scroll(headerBG);
    scrollPositions();
    headerBG();
  }

  if ($(careersHeaderContainer).length > 0) {
    var careersBenefits;
    var careersKaizen;

    var scrollPositions = function () {
      careersBenefits = $('#careers-benefits').offset().top - 200;
      careersKaizen = $('#careers-kaizen').offset().top - 200;
    };

    var headerBG = function () {
      var windowTop = $(window).scrollTop();

     if (windowTop > careersBenefits) {
        careersHeaderContainer.css({'background-color':'#0ea2dc' });
      } else if (windowTop > careersKaizen) {
        careersHeaderContainer.css({'background-color':'#37bec0' });
      } else {
        careersHeaderContainer.css({'background-color':'' });
      }
     };

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

  $('#london-btn').click( function() {
    var latLng = new google.maps.LatLng(51.485672, -0.118554);
    marker.setPosition(latLng);
    map.panTo(latLng);
  });

  $('#sofia-btn').click(function(){
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
