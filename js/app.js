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
  $('#loader').fadeOut('fast');
  app = new App();
});

App = function() {
  var self = this;

  this._wire();
  this.effects();
  this.initMap();
  this.donutChart();

  //Detect when sections appear 
  $('#video-boulder-container').appear();
  $('#video-boulder-container').on('appear', function() {
    self.playVideo('video-boulder'); //temp
    $(this).addClass('viewed');
  });
  
  $('#video-boulder-container').on('disappear', function() {
    $(this).removeClass('viewed');
    self.stopVideo( 'video-boulder' );
  });

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

/*
 * HTML5 Video Controls
 * 
 * 
 */
App.prototype.playVideo = function( val ) {
  var self = this;
  console.log('play')
  var canvas = document.getElementById( val+'-canvas' );
  if ( !canvas ) return; 
  var ctx    = canvas.getContext('2d');
  var video  = document.getElementById( val );
  
  video.addEventListener('play', function () {
    var $this = this; //cache
    var ratio = video.videoWidth / video.videoHeight;
    var w = video.videoWidth - 50;
    var h = parseInt(w / ratio, 10);
    canvas.width = w;
    canvas.height = h;
    ctx.width = w;
    ctx.height = h;
    
    (function loop() {
        if (!$this.paused && !$this.ended) {
            ctx.drawImage($this, 10, 10);
            setTimeout(loop, 1000 / 60); // drawing at 30fps
        }
    })();
  }, 0);
    
  video.play();
  video.volume = 0.2  
}

App.prototype.stopVideo = function( val ) {
  if (!val) return;
  var video  = document.getElementById( val );
  
  if ( !video ) return;
  video.pause();
  
}