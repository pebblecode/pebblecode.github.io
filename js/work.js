(function () {

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
