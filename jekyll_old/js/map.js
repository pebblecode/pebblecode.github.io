(function () {

  // Initialise maps if visible
  if ($('[class*=map-container').length) {

    // Google Maps: Pan between different Locations
    var marker;
    var map;

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

    // Prevent Google Maps loading Roboto
    var head = document.getElementsByTagName('head')[0];
    var insertBefore = head.insertBefore;
    head.insertBefore = function (newElement, referenceElement) {
      if (newElement.href && newElement.href.indexOf('http://fonts.googleapis.com/css?family=Roboto') === 0) {
        return;
      }
      insertBefore.call(head, newElement, referenceElement);
    };
  }

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

}()); // end 'use strict'
