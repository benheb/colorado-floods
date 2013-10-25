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
  scrollorama.animate('#section-one h1',{ delay: 100, duration: 500, property:'margin-top', start:(height/2) - 100,end:(height/2) + 100 });
  scrollorama.animate('#section-one h2',{ delay: 100, duration: 500, property:'margin-top', start:(height/2),end:(height/2) + 200 });

  //scrollorama.animate('#section-three #map',{ delay: 100, duration: 500, property: 'opacity', start:0, end:1 });
  
  //scrollorama.animate('#section-two #map',{ delay: 400, duration: 100, property:'opacity', start:0,end:1});
  //scrollorama.animate('#section-two #about-the-floods',{ delay: 400, duration: 300, property:'margin-top', start:300,end:0});


}