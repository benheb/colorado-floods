/*
 * Colorado Floods - 2013
 *
 * Brendan Heberton
 * www.weather5280.com
 * @brendansweather || @weather5280
 *
 */
var height = $(window).height();
$('#section-one').css('height', height+'px');

$(document).ready(function(){

  /*
  var map = L.mapbox.map('map', 'tmcw.map-7s15q36b')
    .setView([40.2, -104.2], 9);

  var geo;
  $.getJSON('js/map.geojson', function(data) {
    geo = data;
    var markerLayer = L.mapbox.markerLayer(geo)
      .addTo(map);

  });
  */
  app = new App();
});

App = function() {
  this._wire();
  this.effects();
  this.initMap();
  this.donutChart();
  $(window).load(function(){$('html, body').animate({scrollTop:0}, 'fast');});
}

App.prototype._wire = function() {
  var self = this;
  console.log('wire')
  
  //height of current window
  var height = $(window).height();

  //window resize bindings 
  $(window).on('resize', function() {
    height = $(window).height();
    width = $(window).width();
    
    $('#section-one').css('height', height+'px');
    
    $('#map').css('width', width+'px');

  });

  //wire up show animations
  $(window).scroll(function(e) {
    self.updateOuterRadial();
  });
}