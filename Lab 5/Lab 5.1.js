function init(){
    var w = 500;
    var h = 150;
    var barPadding = 1; // Padding for the bars

    //var dataset = [14, 5, 26, 23, 9, 10, 28, 3, 2, 13];
    var dataset = [24, 10, 29, 19, 8, 15, 20, 12, 9, 6, 21, 28];

    var xScale = d3.scaleBand()
                    .domain(d3.range(dataset.length))
                    .rangeRound([0, w])
                    .paddingInner(0.05);

    // Create scale for y-axis (linear)
    var yScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset)]) // Max value from dataset
                    .range([h, 0]); // Reversed range for y-axis

    // Create SVG element
    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    // Create bars
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return xScale(i); // Use xScale for x position
        })
        .attr("y", function(d) {
            return yScale(d); // Use yScale for y position
        })
        .attr("width", xScale.bandwidth()) // Use bandwidth for width
        .attr("height", function(d) {
            return h - yScale(d); // Height is based on the data value
        })
        .attr("fill", "rgb(106, 90, 205)");

    // Add labels (numbers) on top of bars
    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d) {
            return d;
        })
        .attr("x", function(d, i) {
            return xScale(i) + xScale.bandwidth() / 2; // Center text
        })
        .attr("y", function(d) {
            return yScale(d) - 5; // Place above the bar
        })
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "black");

    // Button click event listener
    d3.select("#update").on("click", function() {
        // Generate new random data
        var newDataset = [];
        var numDataPoints = dataset.length;
        var maxValue = 25;
        for (var i = 0; i < numDataPoints; i++) {
            var newData = Math.floor(Math.random() * maxValue);
            newDataset.push(newData);
        }
    
        // Update the bars
        svg.selectAll("rect")
            .data(newDataset)
            .attr("y", function(d) {
                return yScale(d);
            })
            .attr("height", function(d) {
                return h - yScale(d);
            });

        // Update labels
        svg.selectAll("text")
            .data(newDataset)
            .text(function(d) {
                return d;
            })
            .attr("x", function(d, i) {
                return xScale(i) + xScale.bandwidth() / 2;
            })
            .attr("y", function(d) {
                return yScale(d) - 5;
            });
    });

}
window.onload = init;