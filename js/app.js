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
  var width = $(window).width();
  //$('#fullscreen').css('height', height+'px');
  //$('#fullscreen-post-deluge').css('height', height+'px');
  $('#wv-loop').css('height', height+'px');
  $('#donut-1-container').css('height', ((width / 3)) + 'px')
  
  app = new App();

  $(window).load(function(){
    $('body').removeClass('no-scroll');
    $('.spinner').hide();
    $('#loading').html('scroll down');

    //$('html, body').animate({scrollTop:0}, 'fast');
    //$('#loader').fadeOut('fast');
    app.initMap();
    app.donutChart();
  });
  
  
});

App = function() {
  var self = this;

  this._wire();
  this.effects();

  $('#main-title').fadeIn();

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
  
  //height of current window
  var height = $(window).height();

  //window resize bindings 
  $(window).on('resize', function() {
    height = $(window).height();
    width = $(window).width();
      
    $('#section-one').css('height', height+'px');
    
    $('#map').css('width', width+'px');
    $('#map').css('height', height+'px');

  });


  //image lazy loader
  $("img.lazy").lazyload();

  //wire up show animations
  $(window).scroll(function(e) {
    if ( $('body').hasClass('no-scroll') ) return;
    $('#loading').fadeOut();
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

  var video  = document.getElementById( val );
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
  if ( top < 8107 ) {
    $('#wv-loop').hide();
  } else {
    $('#wv-loop').show();
  }
}

