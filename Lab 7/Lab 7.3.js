function init(){

    var w = 300;
    var h = 300;
    
    var dataset = [
        { apples: 5, oranges: 10, grapes: 22 },
        { apples: 4, oranges: 12, grapes: 28 },
        { apples: 2, oranges: 19, grapes: 32 },
        { apples: 7, oranges: 23, grapes: 35 },
        { apples: 23, oranges: 17, grapes: 43 }
    ];

    var keys = ["apples", "oranges", "grapes"]; // categories

    // Step 2: Set up the stack
    var stack = d3.stack().keys(keys); // create stack generator
    var series = stack(dataset); // apply stack to dataset

    var color = d3.scaleOrdinal()
        .domain(keys)
        .range(["#ff9999", "#ffcc99", "#99ccff"]); // Set color scheme

    // Step 3: Set up the SVG and scales
    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
    
    var groups = svg.selectAll("g")
                    .data(series)
                    .enter()
                    .append("g")
                    .style("fill", function(d, i){
                        return color(i);
                    });

    var xScale = d3.scaleBand()
        .domain(d3.range(dataset.length))
        .range([0, w])
        .padding(0.1);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function (d) {
            return d.apples + d.oranges + d.grapes;
        })])
        .range([h, 0]);

    // Step 4: Draw the rectangles
    var rects = groups.selectAll("rect")
                        .data(function(d){return d;})
                        .enter()
                        .append("rect")
                        .attr("x", function (d, i) { return xScale(i); })
                        .attr("y", function (d, i) { return yScale(d[1]); })
                        .attr("height", function (d) { return yScale(d[0]) - yScale(d[1]); })
                        .attr("width", xScale.bandwidth());

}
window.onload = init;