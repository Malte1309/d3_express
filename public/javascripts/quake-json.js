//Chapter 5 Adding Event Mouseover doesn't work because of n undefined
//letzte Video von L5 fehlt hier
var svg = d3.select("svg")
    .attr('width', "600")
    .attr('height', "500")
    .attr('style', "background-color: lightblue")

let div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)


d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson")
    .then(data => {
        const circle = svg.selectAll("circle")
            .data(data.features).enter().append("circle")
            .attr("cx", (d, i) => d.properties.mag * 55)
            .attr("cy", (d, i) => Math.floor(Math.random() * 2) * 100 + d.properties.mag)
            .attr("r", (d, i) => d.properties.mag * 3)
            .style("fill", d => d.properties.alert)
            //ERROR
            .on("mouseover", function (d, i, n) {
                d3.select(n[i])
                    .transition()
                    .duration(1000) //bei transition stets duration
                    .style("opacity", 0.4) //Sichtbarkeit
                console.log(d.properties.mag)

                div.transition().duration(200)
                    .style("opacity", 0.8)

                div.html("<p> " + d.properties.mag + "</p>")
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY) + "px")
            })
            .on("mouseout", function (d, i, n) {
                d3.select(n[i])
                    .transition().duration(1000) //bei transition stets duration
                    .style("opacity", 1) //Sichtbarkeit
            })
            .style("stroke", "black")

    })
                
