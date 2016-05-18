(function () {

  // Health - change header colour
  var healthHeaderContainer = $('.health .gbl-head');
  if ($(healthHeaderContainer).length > 0) {
    var healthPatient;

    var scrollPositions = function () {
      healthPatient = $('#patientcentricity');
      healthResearch = $('#smartresearch');
    };

    var headerBG = function () {
      var windowTop = $(window).scrollTop();
      if (windowTop > healthPatient.offset().top - 100 || healthPatient.offset().bottom) {
        healthHeaderContainer.css({'background-color':'#0ea2dc'});
      } if (windowTop > healthResearch.offset().top - 100 || healthResearch.offset().bottom) {
        healthHeaderContainer.css({'background-color':'#9b5ca4'});
      } if (windowTop > healthPatient.offset().top - 100 || healthPatient.offset().bottom) {
        healthHeaderContainer.css({'background-color':'#0ea2dc'});
      } else {
        healthHeaderContainer.css({'background-color':'#37bec0'});
      }
     };

    $(window).resize(scrollPositions).scroll(headerBG);
    scrollPositions();
    headerBG();
  }


  $( ".vert-sec-bubble-title" ).hover(
    function() {
      var bubble = ($(this).data("bubble"));
     $( ".vert-bubble-container" ).addClass(bubble);
    }, function() {
      var bubble = ($(this).data("bubble"));
     $( ".vert-bubble-container" ).removeClass( bubble );
    }
  );

}()); // end 'use strict'
