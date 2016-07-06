(function () {

  // Navigation appear on scroll up
  var gblHead = $('.gbl-head');
  $(window).scroll(function() {
    if ($(this).scrollTop() > 0) {
      gblHead.removeClass('top');
    } else {
      gblHead.addClass('top');
    }
  });

  // Mobile nav
  var gblHeadBtn = $('.gbl-head-btn');
  var gblHeadNav = $('.gbl-head-nav');
  gblHeadBtn.click( function() {
    gblHead.toggleClass('active');
  });

  // Detect touch/click devices
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $( 'body' ).addClass('touch-device');
  } else {
    $( 'body' ).addClass('click-device');
  }

  // Detect IE9, 10 or 11
  if (/MSIE 9/i.test(navigator.userAgent) || (/MSIE 10/i.test(navigator.userAgent)) || /rv:11.0/i.test(navigator.userAgent)) {
    $( 'body' ).addClass('ie');
  }

  // Detect Edge
  if (/Edge\/\d./i.test(navigator.userAgent)){
    $( 'body' ).addClass('edge');
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

  // Console advert
  console.log('%cHey! Love the console? Then check out our careers page.','font-family: "brandon-text","Helvetica Neue",Helvetica,Arial,"Lucida Grande",sans-serif;font-weight: 900;text-transform: uppercase;letter-spacing: -1px;text-shadow: 3px 4px 0 rgba(0,0,0,0.1);font-size:42px;color:#ed4f7e;');

}()); // end 'use strict'
