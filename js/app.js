/*
 * Colorado Floods - 2013
 *
 * Brendan Heberton
 * www.weather5280.com
 * @brendansweather || @weather5280
 *
 */
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

  var height = $(window).height();
  $('#section-one').css('height', height+'px');
  $('#fullscreen').css('height', height+'px');
  $('#fullscreen-post-deluge').css('height', height+'px');
  $('#wv-loop').css('height', height+'px');

  $('#loader').fadeOut('fast');

  console.log('APP READY');
  $(window).load(function(){$('html, body').animate({scrollTop:0}, 'fast');});
  
  app = new App();
});

App = function() {
  var self = this;

  this._wire();
  this.initMap();
  this.donutChart();
  this.effects();
  //Detect when sections appear 
  $('#video-boulder-container, #video-precip-animation-container, #video-fullscreen-container, #video-fullscreen-post-deluge-container').appear();

  //gif animation
  $('#video-precip-animation-container').on('appear', function() {
    if ( !$(this).hasClass('is-active') ) {
      self.playVideo('video-precip-animation');
      $(this).addClass('is-active');
    }
  });
  $('#video-precip-animation-container').on('disappear', function() {
    self.stopVideo('video-precip-animation'); 
    $(this).removeClass('is-active');
  });

  //mid video
  $('#video-fullscreen-container').on('appear', function() {
    if ( !$(this).hasClass('is-active') ) {
      self.playVideo('video-fullscreen'); 
      $(this).addClass('is-active');
    }
  });
  $('#video-fullscreen-container').on('disappear', function() {
    self.stopVideo('video-fullscreen'); 
    $(this).removeClass('is-active');
  });

  //-post-deluge
  $('#video-fullscreen-post-deluge-container').on('appear', function() {
    if ( !$(this).hasClass('is-active') ) {
      self.playVideo('video-fullscreen-post-deluge'); 
      $(this).addClass('is-active');
    }
  });
  $('#video-fullscreen-post-deluge-container').on('disappear', function() {
    self.stopVideo('video-fullscreen-post-deluge'); 
    $(this).removeClass('is-active');
  });
  

  $('#play-boulder').on('click', function() {
    if ( $(this).hasClass('playing') ) {
      $(this).removeClass('playing').html('PLAY');
      self.stopVideo( 'video-boulder' );
    } else {
      self.playVideo('video-boulder'); //temp
      $(this).addClass('playing').html('PAUSE');
    }
  });

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
    self.watchFixedElements();
  });
}

/*
 * HTML5 Video Controls
 * 
 * 
 */
App.prototype.playVideo = function( val ) {
  var self = this;
  var canvas = document.getElementById( val+'-canvas' );
  if ( !canvas ) return; 
  var ctx    = canvas.getContext('2d');
  var video  = document.getElementById( val );
  
  video.addEventListener('play', function () {
    var $this = this; //cache
    var ratio = video.videoWidth / video.videoHeight;
    var w = video.videoWidth;
    var h = parseInt(w / ratio, 10);
    canvas.width = w;
    canvas.height = h;
    ctx.width = w;
    ctx.height = h;
    
    (function loop() {
        if (!$this.paused && !$this.ended) {
            ctx.drawImage($this, 0, 0);
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

App.prototype.watchFixedElements = function() {
  var top = $(window).scrollTop();
  if ( top > 2700 ) {
    $('#map').hide();
  } else {
    $('#map').show();
  }
}

