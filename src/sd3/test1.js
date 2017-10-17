

      var polygon = this.svg.append("g")
      .attr("class", "polygon")
      .datum([[500, 300], [600, 300], [600, 400], [500, 400]]);
  
  polygon.append("path")
      .call(positionPath);
  
  polygon.selectAll("circle")
      .data(function(d) { return d; })
    .enter().append("circle")
      .call(positionCircle)
      .attr("r", 4.5)
      .call(d3.drag()
        // .origin(function(d) { return {x: d[0], y: d[1]}; })
        .on("drag", function(d) {
          d[0] = d3.event.x, d[1] = d3.event.y;
          d3.select(this).call(positionCircle);
          polygon.select("path").call(positionPath);
          // circle.classed("intersects", intersects(circle.datum(), polygon.datum()));
        }));
  
  function positionCircle(circle) {
    circle
        .attr("cx", function(d) { return d[0]; })
        .attr("cy", function(d) { return d[1]; });
  }

  function positionPath(path) {
    path
        .attr("d", function(d) { return "M" + d.join("L") + "Z"; });
  }
  
  function intersects(circle, polygon) {
    return pointInPolygon(circle, polygon)
        || polygonEdges(polygon).some(function(line) { return pointLineSegmentDistance(circle, line) < circle[2]; });
  }
  
  function polygonEdges(polygon) {
    return polygon.map(function(p, i) {
      return i ? [polygon[i - 1], p] : [polygon[polygon.length - 1], p];
    });
  }
