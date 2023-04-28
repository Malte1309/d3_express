//Kapitel zur  Bonus - Adding Animation in L6 funktioniert nicht
var svg = d3.select("svg")
    .attr('width', "600")
    .attr('height', "600")
    .attr('style', "background-color: lightblue")

var margin = {top: 20, right: 20, bottom: 70, left: 70}
var graphWidth = 600 - margin.left - margin.right
var graphHeight = 600 - margin.top - margin.bottom

var graph = svg.append("g") //create a group
    .attr("width", graphWidth)
    .attr("height", graphHeight) //transform move things arround
    .attr("transform", `translate(${margin.left}, ${margin.top})`)


var rect = graph.selectAll("rect")

var xAxisGroup = graph.append("g")
    .attr("transform", `translate(0, ${graphHeight})`)
var yAxisGroup = graph.append("g")

d3.json("text.json")
    .then(data => {
        console.log(data)
        const scY = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.height)])
            .range([graphHeight, 0]) //invertierte Werte/vertauscht

        const scX = d3.scaleBand()
            .domain(data.map(item => item.fill))
            .range([0, 500])
            .paddingInner(0.1)
            .paddingOuter(0.1) //Abstand zum Rand links und rechts (Achse)

        // console.log(data.map(item => item.fill))
        // console.log(scX("orange"))
        // console.log(scX.bandwidth())


        rect.data(data).enter().append("rect")
            .attr("width", scX.bandwidth)
            .attr("height", (d, i) => graphHeight - scY(d.height))
            .attr("fill", d => d.fill)
            .attr("x", (d, i) => scX(d.fill))
            .attr("y", d => scY(d.height)) //ohne dieses Attribut nicht invertiert gezeichnet
        // d=data, i=Index, n= Array containing the objects
        //funktioniert nicht wegen n
        // .on("mouseover", function(d, i, n){
        //     d3.select(n[i])
        //     .transition().duration(100)
        //     .style("opacity", 0.7)
        // })
        // .on("mouseout", function(d, i, n){
        //     d3.select(n[i])
        //     .transition().duration(100)
        //     .style("opacity", 1)
        // })

        //Achtung wegen Positionierung im Skript, wen zu niedrig werden Achsen bei Animation nicht geladen!

        const xAxis = d3.axisBottom(scX)
        const yAxis = d3.axisLeft(scY)

        xAxisGroup.call(xAxis)
        yAxisGroup.call(yAxis)
    })
