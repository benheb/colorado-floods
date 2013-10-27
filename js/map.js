App.prototype.initMap = function() {

  var down = false, savedScale = null, savedTranslation = null;
  
  $('#map-drag').on('click', function() {
    if ( down ) {
      $(this).removeClass('selected');
      $('#intro-inset-map, #map-view-outer').css('pointer-events','auto');
      down = false;
    } else {
      $(this).addClass('selected');
      $('#intro-inset-map, #map-view-outer').css('pointer-events','none');
      down = true;
    }
  });

  var width = Math.max(960, window.innerWidth),
      height = $(window).height(),
      prefix = prefixMatch(["webkit", "ms", "Moz", "O"]);

  var tile = d3.geo.tile()
      .size([width, height]);

  var projection = d3.geo.mercator()
      .scale((1 << 18) / 2 / Math.PI)
      .translate([-width / 2, -height / 2]); // just temporary

  var tileProjection = d3.geo.mercator();

  var tilePath = d3.geo.path()
      .projection(tileProjection);

  var zoom = d3.behavior.zoom()
      .scale(projection.scale() * 2 * Math.PI)
      .scaleExtent([1 << 18, 1 << 23])
      .translate(projection([-105.1, 40.1000]).map(function(x) { return -x; }))
      .on("zoom", zoomed);

  var map = d3.select("#map")
      .style("width", width + "px")
      .style("height", height + "px")
      .call(zoom)
      .on("mousemove", mousemoved);

  var layer = map.append("div")
      .attr("class", "layer");

  var info = map.append("div")
      .attr("class", "info");

  zoomed( true );

  function zoomed( initial ) {
    if ( !down && !initial ) {
      // save the current scales
     if (savedScale === null){
         savedScale = zoom.scale();
     }
      if (savedTranslation === null){
         savedTranslation = zoom.translate();
     }
      
    } else {
      if (savedScale !== null){
           zoom.scale(savedScale)
           savedScale = null
       }
       if (savedTranslation !== null){
           zoom.translate(savedTranslation)
           savedTranslation = null
       }
    
      var tiles = tile
          .scale(zoom.scale())
          .translate(zoom.translate())
          ();

      projection
          .scale(zoom.scale() / 2 / Math.PI)
          .translate(zoom.translate());

      var image = layer
          .style(prefix + "transform", matrix3d(tiles.scale, tiles.translate))
        .selectAll(".tile")
          .data(tiles, function(d) { return d; });

      image.exit()
          .each(function(d) { this._xhr.abort(); })
          .remove();

      image.enter().append("svg")
          .attr("class", "tile")
          .style("left", function(d) { return d[0] * 256 + "px"; })
          .style("top", function(d) { return d[1] * 256 + "px"; })
          .each(function(d) {
            var svg = d3.select(this);
            this._xhr = d3.json("http://" + ["a", "b", "c"][(d[0] * 31 + d[1]) % 3] + ".tile.openstreetmap.us/vectiles-highroad/" + d[2] + "/" + d[0] + "/" + d[1] + ".json", function(error, json) {
              var k = Math.pow(2, d[2]) * 256; // size of the world in pixels

              tilePath.projection()
                  .translate([k / 2 - d[0] * 256, k / 2 - d[1] * 256]) // [0°,0°] in pixels
                  .scale(k / 2 / Math.PI);

              svg.selectAll("path")
                  .data(json.features.sort(function(a, b) { return a.properties.sort_key - b.properties.sort_key; }))
                .enter().append("path")
                  .attr("class", function(d) { return d.properties.kind; })
                  .attr("d", tilePath);
            });
          });

        
      d3.selectAll("circle")
        .attr("cx", function(d) {
          return projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[0];
        })
        .attr("cy", function(d) {
          return projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[1];
        });

      d3.selectAll('.places-label')
        .attr("dx", function(d) {
          return projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[0];
        })
        .attr("dy", function(d) {
          return projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[1] - 12;
        });
    }
  }

 var svg = d3.select("#map").append("svg")
    .attr('id', 'places')
    .attr("width", width)
    .attr("height", height);

  var path = d3.geo.path()
    .projection(projection);

  var g = svg.append("g");
    
  d3.json("data/places.json", function(error, places) {
    
    g.selectAll('circle')
      .data( places.features )
    .enter().append('circle')
      .attr('class', 'places')
      .attr("cx", function(d) {
        return projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[0];
      })
      .attr("cy", function(d) {
        return projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[1];
      })
      .attr("r", 10)
      .on('click', function(d) {
        var id = d.properties.Place.toLowerCase().replace(/ /g, '-');
        var height = $(window).height();
        var top = $(window).scrollTop();
        var sections = { "boulder": 2, "estes-park": 3, "lyons": 4, "eastern-plains": 5 }
        $('body,html').animate({scrollTop: ( height ) * sections[ id ] }, 2400);
      });

    g.selectAll('text')
      .data( places.features )
    .enter().append('text')
      .attr('class', 'places-label')
      .attr("dx", function(d) {
        return projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[0];
      })
      .attr("dy", function(d) {
        return projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[1] - 12;
      })
      .text(function(d) {
        return d.properties.Place;
      });
      

  });

  function mousemoved() {
    info.text(formatLocation(projection.invert(d3.mouse(this)), zoom.scale()));
  }

  function matrix3d(scale, translate) {
    var k = scale / 256, r = scale % 1 ? Number : Math.round;
    return "matrix3d(" + [k, 0, 0, 0, 0, k, 0, 0, 0, 0, k, 0, r(translate[0] * scale), r(translate[1] * scale), 0, 1 ] + ")";
  }

  function prefixMatch(p) {
    var i = -1, n = p.length, s = document.body.style;
    while (++i < n) if (p[i] + "Transform" in s) return "-" + p[i].toLowerCase() + "-";
    return "";
  }

  function formatLocation(p, k) {
    var format = d3.format("." + Math.floor(Math.log(k) / 2 - 2) + "f");
    return (p[1] < 0 ? format(-p[1]) + "°S" : format(p[1]) + "°N") + " "
         + (p[0] < 0 ? format(-p[0]) + "°W" : format(p[0]) + "°E");
  }
}