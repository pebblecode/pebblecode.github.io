require('jquery-lazyload');
$(function ($) {
  $('img.lazyload').lazyload({
    effect: 'fadeIn',
    threshold: 200
  });
});
