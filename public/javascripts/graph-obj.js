var svg = d3.select("svg")
    .attr('width', "800")
    .attr('height', "400")
    .attr('style', "background-color: lightblue")

var rect = svg.selectAll("rect")

rect.data(dataArray).enter().append("rect")
    .attr("width", d => d.width)
    .attr("height", d => d.height)
    .attr("x", (d, i) => i * 25)
    .attr("y", d => 100 - d.height)
    .style("fill", d => d.fill)