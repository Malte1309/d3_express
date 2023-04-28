let dataArray = [4, 15, 34]

var svg = d3.select("svg")
    .attr('width', "800")
    .attr('height', "400")
    .attr('style', "background-color: lightblue")

var rect = svg.selectAll("rect")

rect.data(dataArray).enter().append("rect")
    .attr("width", 24)
    .attr("height", 100)
    .attr("x", (d, i) => i * 25)
    .style("fill", "orange")