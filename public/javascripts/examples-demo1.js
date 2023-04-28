d3.csv("../data/examples-simple.csv")
    .then(function (data) {
        d3.select("svg")
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", 5).attr("fill", "red")
            .attr("cx", d => d["x"])
            .attr("cy", d => d.y)
    })

