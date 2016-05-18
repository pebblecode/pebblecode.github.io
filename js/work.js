(function () {

  // Work - change header colour
  var workHeaderContainer = $('.work .gbl-head');
  if ($(workHeaderContainer).length > 0) {
    var workPharmaceutical;
    var workIntranets;
    var workSelfDirected;
    var workNextGen;
    var workEnterpriseMobile;
    var workRailTravel;
    var workHighFrequency;

    var scrollPositions = function () {
      workPharmaceutical = $('#work-pharmaceutical');
      workIntranets = $('#work-intranets');
      workSelfDirected = $('#work-self-directed');
      workNextGen = $('#work-next-gen');
      workEnterpriseMobile = $('#work-enterprise-mobile');
      workRailTravel = $('#work-rail-travel');
      workHighFrequency = $('#work-high-frequency');
    };

    var headerBG = function () {
      var windowTop = $(window).scrollTop();
      if (windowTop > workHighFrequency.offset().top - 100 || workHighFrequency.offset().bottom) {
          workHeaderContainer.css({'background-color':'#ed4f7e'});
        } else if (windowTop > workRailTravel.offset().top - 100 || workRailTravel.offset().bottom) {
          workHeaderContainer.css({'background-color':'#faad40'});
        } else if (windowTop > workEnterpriseMobile.offset().top - 100 || workEnterpriseMobile.offset().bottom) {
          workHeaderContainer.css({'background-color':'#a4ce4e'});
        } else if (windowTop > workNextGen.offset().top - 100 || workNextGen.offset().bottom) {
          workHeaderContainer.css({'background-color':'#0ea2dc'});
        } else if (windowTop > workSelfDirected.offset().top - 100 || workSelfDirected.offset().bottom) {
          workHeaderContainer.css({'background-color':'#37bec0'});
        } else if (windowTop > workIntranets.offset().top - 100 || workIntranets.offset().bottom) {
          workHeaderContainer.css({'background-color':'#ed4f7e'});
        } else if (windowTop > workPharmaceutical.offset().top - 100 || workPharmaceutical.offset().bottom) {
          workHeaderContainer.css({'background-color':'#9b5ca4'});
        } else {
          workHeaderContainer.css({'background-color':''});
      }
     };

    $(window).resize(scrollPositions).scroll(headerBG);
    scrollPositions();
    headerBG();
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
    video1.play();
    video1.muted = true;
    video1.loop = true;

    var video2 = document.createElement('video');
    document.getElementById("video2").appendChild(video2);
    addSourceToVideo(video2, '/img/projects/learning.mp4', 'video/mp4');
    addSourceToVideo(video2, '/img/projects/learning.webm', 'video/webm');
    video2.play();
    video2.muted = true;
    video2.loop = true;

    var video3 = document.createElement('video');
    document.getElementById("video3").appendChild(video3);
    addSourceToVideo(video3, '/img/projects/mobile-dir.mp4', 'video/mp4');
    addSourceToVideo(video3, '/img/projects/mobile-dir.webm', 'video/webm');
    video3.play();
    video3.muted = true;
    video3.loop = true;
  }

  $('#gif1').attr('src', 'second.jpg');

}()); // end 'use strict'
