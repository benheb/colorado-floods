App.prototype.donutChart = function() {
  var self = this; 

  $('#donut-1 svg').remove();
  
  this.chartWidth = 400;
  this.chartHeight = 400;
  this.chartRadius = Math.min(this.chartWidth, this.chartHeight) / 2;

  var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

  var arc = d3.svg.arc()
      .outerRadius(this.chartRadius - 15)
      .innerRadius(this.chartRadius - 115);

  var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.total; });

  var svg = d3.select("#donut-1").append("svg")
      .attr("width", this.chartWidth)
      .attr("height", this.chartHeight)
    .append("g")
      .attr("transform", "translate(" + this.chartWidth / 2 + "," + this.chartHeight / 2 + ")");

  d3.csv("data/boulder-precip.csv", function(error, data) {

    data.forEach(function(d) {
      d.total = +d.total;
    });

    self.chartGraphic = svg.selectAll(".arc")
        .data(pie(data))
      .enter().append("g")
        .attr("class", "arc");

    self.chartGraphic.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data.month); })
        /*
        .style("fill", function(d) { 
          if ( d.data.month === "Sep" ) {
            return "#3498db";
          } else {
            return "#2980b9";
          }
        })
        */
        .on('mouseover', function(d, e, f) {
          clearTimeout(self.hideTooltip);

          $('#donut-tooltip').fadeIn().css({'left' : d3.event.offsetX + 100 + 'px', 'top' : d3.event.offsetY + 'px'});
          $('#donut-tooltip').html( 'Boulder averages ' + d.data.total + ' inches of precipitation in ' + d.data.month );
          
          self.hideTooltip = setTimeout(function() {
            $('#donut-tooltip').fadeOut();
          },1700);
        });

    self.chartGraphic.append("text")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text(function(d) { return d.data.month; });

    self.chartGraphic.append("text")
        .attr("transform", function(d) { return "translate(0,0)"; })
        .attr("dy", ".35em")
        .style("fill", "#000")
        .style("text-anchor", "middle")
        .text(function(d) { return '20.23" Annually' });

    self.outerRadial();

  });

}

App.prototype.outerRadial = function( radian ) {
  var self = this;

  var pi = Math.PI;
  var τ = 2 * pi;

  this.arc2 = d3.svg.arc()
    .outerRadius(this.chartRadius - 2)
    .innerRadius(this.chartRadius - 12)
    .startAngle(0 * (pi/180));
  
  this.arcPath = this.chartGraphic.append("path")
    .datum({endAngle: 0 })
    .style('fill', '#1abc9c')
    .attr("d", self.arc2);
}

App.prototype.updateOuterRadial = function() {
  var self = this;
  var pi = Math.PI;


  var x = $(window).scrollTop() + 200;
  var start = $('#donut-1').offset().top;
  var end = 2 * pi * 0.85;
  var radian = end - ( ( x - start ) * ( end / ( 200 - start ) ));
  if ( radian > end ) return;

  if ( this.arcPath ) {
    this.arcPath.transition()
      .duration(50)
      .call(arcTween, radian);

    function arcTween(transition, newAngle) {
      transition.attrTween("d", function(d) {
        var interpolate = d3.interpolate(d.endAngle, newAngle);
        return function(t) {
          d.endAngle = interpolate(t);
          return self.arc2(d);
        };
      });
    }
  }
}