$( ".vert-sec-bubble-title" ).hover(
  function() {
    var bubble = ($(this).data("bubble"));
   $( ".vert-bubble-container" ).addClass(bubble);
  }, function() {
    var bubble = ($(this).data("bubble"));
   $( ".vert-bubble-container" ).removeClass( bubble );
  }
);

