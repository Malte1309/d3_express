let revenueData = [
    52.13,
    53.98,
    67.00,
    89.00,
    99.00,
    130.28,
    166.70,
    234.98,
    345.44,
    443.34,
    543.70,
    556.13
]

let months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "november", "December"]

let parseMonths = d3.timeParse("%B")
//console.log(d3.extent(months, d => parseMonths(d))) //give min. & max value as array

var svg = d3.select("svg")
    .attr('width', "700")
    .attr('height', "600")
    .attr('style', "background-color: lightblue")

var margin = {top: 20, right: 20, bottom: 70, left: 70}
var graphWidth = 700 - margin.left - margin.right
var graphHeight = 650 - margin.top - margin.bottom

var mainCanvas = svg.append("g") //create a group
    .attr("width", graphWidth)
    .attr("height", graphHeight) //transform move things arround
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

let scX = d3.scaleTime()
    .domain(d3.extent(months, (d, i) => parseMonths(d)))
    .range([0, graphWidth])

let scY = d3.scaleLinear()
    .domain([0, d3.max(revenueData, d => d)])
    .range([graphHeight, 0])

let areaChart = d3.area()
    .x((d, i) => scX(parseMonths(months[i])))
    .y0(graphHeight) //difference Graph
    .y1((d, i) => graphHeight - d) //filled area

//define graph line, path needed
let valueLine = d3.line()
    .x((d, i) => scX(parseMonths(months[i])))
    .y((d, i) => scY(d))

//add ValueLine Path
mainCanvas.append("path")
    .data([revenueData]) //Achtung Array [] nicht vergessen!
    .attr("class", "line")
    .attr("d", valueLine)
// .attr("fill", "none")
// .attr("stroke", "black")


mainCanvas.append("path")
    .attr("fill", "orange")
    .attr("class", "area")
    .attr("d", areaChart(revenueData))

let circle = mainCanvas.selectAll("circle")
    .data(revenueData).enter().append("circle")
    .attr("class", "circle")
    .attr("cx", (d, i) => scX(parseMonths(months[i])))
    .attr("cy", d => scY(d))
    .attr("r", 5)

let xAxis = d3.axisBottom(scX)
    .tickFormat(d3.timeFormat("%b")) //damit nicht 1900 anstelle von January
let yAxis = d3.axisLeft(scY)
    .ticks(4) //Anzahl an Tick Begrenzungen, logisch nur geeignete Werte (ignoriert)
    .tickPadding(10) //Abstand

mainCanvas.append("g")
    .attr("transform", `translate(0, ${graphHeight})`)
    .call(xAxis)

mainCanvas.append("g")
    .call(yAxis)

