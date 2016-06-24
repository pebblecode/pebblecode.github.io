(function () {

  // Health - change header colour
  var healthHeaderContainer = $('.health .gbl-head');
  if (healthHeaderContainer.length > 0) {
    var healthPatient;
    var healthResearch;
    var healthInnovation;
    var healthContact;

    var scrollPositions = function () {
      healthPatient = $('#patientcentricity');
      healthResearch = $('#smartresearch');
      healthInnovation = $('#bottomupinnovation');
      healthContact = $('#vertcontact');
    };

    var headerBG = function () {
      var windowTop = $(window).scrollTop();
      if (windowTop > healthContact.offset().top - 100 || healthContact.offset().bottom) {
        healthHeaderContainer.css({'background-color':'#ed4f7e'});
      } else if (windowTop > healthInnovation.offset().top - 100 || healthInnovation.offset().bottom) {
        healthHeaderContainer.css({'background-color':'#37bec0'});
      } else if (windowTop > healthResearch.offset().top - 100 || healthResearch.offset().bottom) {
        healthHeaderContainer.css({'background-color':'#9b5ca4'});
      } else if (windowTop > healthPatient.offset().top - 100 || healthPatient.offset().bottom) {
        healthHeaderContainer.css({'background-color':'#0ea2dc'});
      } else {
        healthHeaderContainer.css({'background-color':'#37bec0'});
      }
     };

    $(window).resize(scrollPositions).scroll(headerBG);
    scrollPositions();
    headerBG();
  }

  // Transport - change header colour
  var transportHeaderContainer = $('.transport .gbl-head');
  if (transportHeaderContainer.length > 0) {
    var transportRail;
    var transportTech;
    var transportFuture;
    var transportContact;

    var scrollPositions = function () {
      transportRail = $('#railservice');
      transportTech = $('#transporttechnology');
      transportFuture = $('#imaginingthefuture');
      transportContact = $('#vertcontact');
    };

    var headerBG = function () {
      var windowTop = $(window).scrollTop();
      if (windowTop > transportContact.offset().top - 100 || transportContact.offset().bottom) {
        transportHeaderContainer.css({'background-color':'#ed4f7e'});
      } else if (windowTop > transportFuture.offset().top - 100 || transportFuture.offset().bottom) {
        transportHeaderContainer.css({'background-color':'#9b5ca4'});
      } else if (windowTop > transportTech.offset().top - 100 || transportTech.offset().bottom) {
        transportHeaderContainer.css({'background-color':'#a4ce4e'});
      } else if (windowTop > transportRail.offset().top - 100 || transportRail.offset().bottom) {
        transportHeaderContainer.css({'background-color':'#37bec0'});
      } else {
        transportHeaderContainer.css({'background-color':'#0ea2dc'});
      }
     };

    $(window).resize(scrollPositions).scroll(headerBG);
    scrollPositions();
    headerBG();
  }

  // Insurance - change header colour
  var insuranceHeaderContainer = $('.insurance .gbl-head');
  if (insuranceHeaderContainer.length > 0) {
    var insuranceContact;

    var scrollPositions = function () {
      insuranceContact = $('#vertcontact');
    };

    var headerBG = function () {
      var windowTop = $(window).scrollTop();
      if (windowTop > insuranceContact.offset().top - 100 || insuranceContact.offset().bottom) {
        insuranceHeaderContainer.css({'background-color':'#ed4f7e'});
      } else {
        insuranceHeaderContainer.css({'background-color':'#0ea2dc'});
      }
     };

    $(window).resize(scrollPositions).scroll(headerBG);
    scrollPositions();
    headerBG();
  }

}()); // end 'use strict'
