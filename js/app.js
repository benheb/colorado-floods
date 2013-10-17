/*
 * Colorado Floods - 2013
 *
 * Brendan Heberton
 * www.weather5280.com
 * @brendansweather || @weather5280
 *
 */


$(document).ready(function(){

  var map = L.mapbox.map('map', 'tmcw.map-7s15q36b')
    .setView([40.2, -104.2], 9);

  var geo;
  $.getJSON('js/map.geojson', function(data) {
    geo = data;
    var markerLayer = L.mapbox.markerLayer(geo)
      .addTo(map);

  });

  app = new App();
});

App = function() {
  console.log('this', this)
  this.initialUI();
  this.effects();
}

App.prototype.initialUI = function() {
  var height = $(window).height();

  $('.scrollblock').css('height', height+'px');
}
