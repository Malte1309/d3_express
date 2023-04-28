//import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
//Ab "Adding a Tooltip" wiederholen"

const canvas = d3.select(".canva")


const svg = canvas.append("svg")
    .attr('width', "700")
    .attr('height', "600")
    .attr('style', "background-color: lightgrey")

const margin = {top: 20, right: 20, bottom: 70, left: 70}
const graphWidth = 600 - margin.left - margin.right
const graphHeight = 600 - margin.top - margin.bottom

const mainCanvas = svg.append("g") //create a group
    .attr("width", graphWidth)
    .attr("height", graphHeight) //transform move things arround
    .attr("transform", `translate(${margin.left + 200}, ${margin.top + 200})`)
//create pie
const pie = d3.pie()
    .sort(null) //null -> unsorted
    .value(data => data.total) //totasl Value als Basis für den Winkel

//Radius
const arcPath = d3.arc()
    .outerRadius(190)
    .innerRadius(100)

//D3-Tooltip: https://github.com/Caged/d3-tip
//Lektion "Adding a Tooltip abgebrochen"
// let formatComma = d3.format(",")

// let tip = d3.tip()
//             .attr("class", "d3-tip")
//             .offset([0,0])
//             .html(function(d) {
//                 return ""
//             })

//define ordinale scale, color range
const colorScale = d3.scaleOrdinal(d3["schemeSet3"])


//"Creating Pie Angles" 3:00 bei return auch weitere Verschachtelung/Manipulation möglich
function getCSVData() {
    d3.csv("./data/daca.csv", function(d) {
        //console.log("Data", d)
        return d
    }).then(drawPieChart)
}

getCSVData()

function drawPieChart(data){

    //update color scale domain
    colorScale.domain(data.map(d => d.total))

    const angles = pie(data)
    //console.log("Angles:", angles)
    //console.log(arcPath(angles[3]))

    const paths = mainCanvas.selectAll("path")
        .data(angles)
        .enter()
        .append("path")
        .attr("class", "arc")
        .attr("stroke", "#cde")
        .attr("fill", d => colorScale(d.data.total)) //ACHTUNG data bereits formated, daher nicht d.data!!
        .attr("d", arcPath)

    console.log("Paths", paths)
}