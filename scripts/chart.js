var linederiv = []
oldy = 1
oldx = 1

for (var i = window.lineData.length - 1; i >= 0; i--) {
  var d = new Date(window.lineData[i].x)
  //console.log(window.lineData[i].y + " " + oldy + " " + window.lineData[i].x + " " + oldx)
  //console.log(oldy-window.lineData[i].y + " " + ((oldx-window.lineData[i].x) / 100000))
  linederiv[i] = {x: d, y: (10/(((oldx-window.lineData[i].x) / 100000)))}
  oldx = window.lineData[i].x
  oldy = window.lineData[i].y
  window.lineData[i].x = d
}

function drawLineChart(){
  var vis = d3.select('#visualisation'),
  WIDTH = 1000,
  HEIGHT = 500,
  MARGINS = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50
  },
  xRange = d3.time.scale().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(window.lineData, function(d) {
      return d.x;
    }), d3.max(window.lineData, function(d) {
      return d.x;
    })]),
  yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(window.lineData, function(d) {
    return d.y;
  }), d3.max(window.lineData, function(d) {
    return d.y;
  })]),
  xAxis = d3.svg.axis()
    .scale(xRange)
    .tickSize(5)
    .tickSubdivide(true),
  yAxis = d3.svg.axis()
    .scale(yRange)
    .tickSize(5)
    .orient('left')
    .tickSubdivide(true);
  vis.append('svg:g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
    .call(xAxis);
  vis.append('svg:g')
    .attr('class', 'y axis')
    .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
    .call(yAxis);
  var lineFunc = d3.svg.line()
    .x(function(d) {
      return xRange(d.x);
    })
    .y(function(d) {
      return yRange(d.y);
    })
    .interpolate('linear');
  vis.append('svg:path')
    .attr('d', lineFunc(window.lineData))
    .attr('stroke', 'blue')
    .attr('stroke-width', 2)
    .attr('fill', 'none');

}