/*
 * Loads of CSS magic for app
 *
 */

App.prototype.effects = function() {
  var scrollorama = $.scrollorama({
    blocks:'.scrollblock',
    enablePin:false
  });

  var height = $(window).height();
  var width = $(window).width();
  /*
   * Section one
   */
  scrollorama.animate('#intro h1',{ delay: 100, duration: 500, property:'margin-top', start:(height/2) + 100,end:(height/2) + 200 });
  
  scrollorama.animate('#section-one #map',{ delay: 400, duration: 100, property:'opacity', start:0,end:1});
  scrollorama.animate('#section-one #about-the-floods',{ delay: 400, duration: 300, property:'margin-top', start:300,end:0});


}