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

  scrollorama.animate('#video-fullscreen-container',{ delay: (height / 1.5), duration: 250, property:'opacity', start:0,end:1});

  scrollorama.animate('#video-fullscreen-post-deluge-container',{ delay: (height - 280), duration: 250, property:'opacity', start:0,end:1});

  //section four
  scrollorama.animate('#lyons-img',{ 
    delay: 600, 
    duration: 400, 
    property:'height', 
    start: 0,
    end: 405
  });

  scrollorama.animate('#estes-76-two',{ 
    delay: height + 100, duration: 100, property:'opacity', start:1,end:0
  });

  scrollorama.onBlockChange(function() {
    console.log('You just scrolled to block#'+scrollorama.blockIndex);
  });


}