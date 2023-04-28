//var d3 = require('d3')
//var d3 = require('/node_modules/d3/dist/d3.js');
//var d3 = require('https://cdn.jsdelivr.net/npm/d3@7/+esm');
//import * as d3 from "/node_modules/d3/src/index";
//import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
//import d3 from "./d3";

const canvas = d3.select('.canva');

let data = [{x:10, y:10}, {x:15, y:20}, {x:20, y:40},
    {x:25, y:7}, {x:30, y:10}]

const svg = canvas.append("svg")
    .attr('width', "600")
    .attr('height', "600")
    .attr('style', "background-color: lightgrey")

const margin = {top: 20, right: 20, bottom: 70, left: 70}
const graphWidth = 600 - margin.left - margin.right
const graphHeight = 600 - margin.top - margin.bottom

const area = svg.append("g") //create a group
    .attr("width", graphWidth)
    .attr("height", graphHeight) //transform move things arround
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

//create Points
let linearGen = d3.line()
    .x((d,i) => d.x * i)
    .y((d, i) => d.y * i)
    .curve(d3.curveCardinal)

area.append("path")
    .attr("d", linearGen(data))
    .attr("stroke", "green")
    .attr("fill", "none") //sonst wäre es eine Form

