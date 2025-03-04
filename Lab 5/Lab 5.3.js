function init(){
    var w = 500;
    var h = 150;
    var barPadding = 1; // Padding for the bars

    //var dataset = [14, 5, 26, 23, 9, 10, 28, 3, 2, 13];
    var dataset = [24, 10, 29, 19, 8, 15, 20, 12, 9, 6, 21, 28];

    // Create scale for x-axis (ordinal)
    var xScale = d3.scaleBand()
                    .domain(d3.range(dataset.length))
                    .rangeRound([0, w])
                    .paddingInner(0.05);  // Add inner padding

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

    

    d3.select("#add").on("click", function() {
        var newNumber = Math.floor(Math.random() * 25);  // Generate a random number
        dataset.push(newNumber);  // Add new data

        // Update xScale
        xScale.domain(d3.range(dataset.length));

        // Select and update the bars
        var bars = svg.selectAll("rect")
                        .data(dataset);

        // Enter new elements and merge them with existing ones
        bars.enter()
            .append("rect")
            .attr("x", w)  // Start from the right outside the SVG
            .attr("y", function(d) {
                return yScale(d);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) {
                return h - yScale(d);
            })
            .attr("fill", "rgb(106, 90, 205)")
            .merge(bars)
            .transition()  // Add transition
            .duration(1000)
            .attr("x", function(d, i) {
                return xScale(i);
            });

        // Select and update the labels
        var labels = svg.selectAll("text")
                        .data(dataset);

        // Enter new labels and merge them with existing ones
        labels.enter()
                .append("text")
                .text(function(d) {
                    return d;
                })
                .attr("x", w)
                .attr("y", function(d) {
                    return yScale(d) - 5;
                })
                .attr("text-anchor", "middle")
                .attr("font-family", "sans-serif")
                .attr("font-size", "11px")
                .attr("fill", "black")
                .merge(labels)
                .transition()
                .duration(1000)
                .attr("x", function(d, i) {
                    return xScale(i) + xScale.bandwidth() / 2;
                });
    });

    d3.select("#remove").on("click", function() {
        dataset.shift();  // Remove the first data point

        // Update xScale
        xScale.domain(d3.range(dataset.length));

        // Select and update the bars
        var bars = svg.selectAll("rect")
                    .data(dataset);

        // Exit removed elements
        bars.exit()
            .transition()
            .duration(1000)
            .attr("x", w)  // Move them out of the SVG
            .remove();  // Remove from DOM

        // Update remaining elements
        bars.transition()
            .duration(1000)
            .attr("x", function(d, i) {
                return xScale(i);
            });

        // Select and update the labels
        var labels = svg.selectAll("text")
                        .data(dataset);

        // Exit removed labels
        labels.exit()
            .transition()
            .duration(1000)
            .attr("x", w)
            .remove();

        // Update remaining labels
        labels.transition()
            .duration(1000)
            .attr("x", function(d, i) {
                return xScale(i) + xScale.bandwidth() / 2;
            });
    });
}
window.onload = init;