let data = [{x: 10, y: 10}, {x: 15, y: 20}, {x: 20, y: 40},
    {x: 25, y: 7}, {x: 30, y: 10}]

var svg = d3.select("svg")
    .attr('width', "600")
    .attr('height', "600")
    .attr('style', "background-color: lightblue")

var margin = {top: 20, right: 20, bottom: 70, left: 70}
var graphWidth = 600 - margin.left - margin.right
var graphHeight = 600 - margin.top - margin.bottom

var area = svg.append("g") //create a group
    .attr("width", graphWidth)
    .attr("height", graphHeight) //transform move things arround
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

//create Points
let linearGen = d3.line()
    .x((d, i) => d.x * i)
    .y((d, i) => d.y * i)
    .curve(d3.curveCardinal)

area.append("path")
    .attr("d", linearGen(data))
    .attr("stroke", "green")
    .attr("fill", "none") //sonst wäre es eine Form

