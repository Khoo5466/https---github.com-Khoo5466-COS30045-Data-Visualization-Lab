function init(){
    var w = 500;
    var h = 150;
    var barPadding = 1; // Padding for the bars
    var dataset = [24, 10, 29, 19, 8, 15, 20, 12, 9, 6, 21, 28];
    var sortOrder = true;

    // Create scale for x-axis (ordinal)
    var xScale = d3.scaleBand()
                    .domain(d3.range(dataset.length))
                    .rangeRound([0, w])
                    .paddingInner(0.05);  // Add inner padding

    // Create scale for y-axis (linear)
    var yScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset)])
                    .range([h, 0]);

    var sortBars = function(){
        // Toggle the sort order
        sortOrder = !sortOrder;

        // Sort dataset based on the sort order
        dataset.sort(function(a, b) {
            if (sortOrder) {
                return d3.ascending(a, b);  // Sort ascending
            } else {
                return d3.descending(a, b);  // Sort descending
            }
        });

        xScale.domain(d3.range(dataset.length));

        // Update bars based on sorted dataset
        svg.selectAll("rect")
            .sort(function(a, b) {
                return sortOrder ? d3.ascending(a, b) : d3.descending(a, b);
            })
            .transition()  // Add transition to see the sorting process
            .attr("x", function(d, i) {
                return xScale(i);  // Update x position
            })
            .attr("y", function(d) {
                return yScale(d);  // Update y position
            })
            .attr("height", function(d) {
                return h - yScale(d);  // Update bar height
            })
            .attr("fill", "rgb(106, 90, 205)");

        // Update labels based on sorted dataset
        svg.selectAll(".label")
            .sort(function(a, b) {
                return sortOrder ? d3.ascending(a, b) : d3.descending(a, b);
            })
            .transition()
            .attr("x", function(d, i) {
                return xScale(i) + xScale.bandwidth() / 2;  // Move labels to the correct positions
            })
            .attr("y", function(d) {
                return yScale(d) - 5;  // Update y position
            });
    };
                
    // Create SVG element
    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    // Function to update bars and labels
    function updateChart() {
        // Update xScale to handle new dataset size
        xScale.domain(d3.range(dataset.length));

        // Select and update bars
        var bars = svg.selectAll("rect")
            .data(dataset);

        // Enter new bars
        bars.enter()
            .append("rect")
            .attr("x", w) // Start from outside the right of the SVG
            .attr("y", function(d) { return yScale(d); })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) { return h - yScale(d); })
            .attr("fill", "rgb(106, 90, 205)")
            .merge(bars)  // Merge new and existing bars
            .on("mouseover", function(event, d){
                var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
                var yPosition = parseFloat(d3.select(this).attr("y")) - 10;

                svg.append("text")
                    .attr("id", "tooltip")
                    .attr("x", xPosition)
                    .attr("y", yPosition)
                    .attr("text-anchor", "middle")
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "11px")
                    .attr("font-weight", "bold")
                    .attr("fill", "black")
                    .text(d);

                d3.select(this)
                    .transition()
                    .attr("fill", "orange");
            })
            .on("mouseout", function(d){
                d3.select("#tooltip").remove();
                d3.select(this)
                    .transition()
                    .attr("fill", "rgb(106, 90, 205)");
            })
            .transition()  // Animate the update
            .duration(1000)
            .attr("x", function(d, i) { return xScale(i); })
            .attr("width", xScale.bandwidth());

        // Remove bars that no longer exist in the dataset
        bars.exit()
            .transition()
            .duration(1000)
            .attr("x", w)  // Move them out of the SVG
            .remove();

        // Select and update labels
        var labels = svg.selectAll(".label")
            .data(dataset);

        // Enter new labels
        labels.enter()
            .append("text")
            .attr("class", "label")
            .attr("x", w)  // Start from outside the right of the SVG
            .attr("y", function(d) { return yScale(d) - 5; })
            .attr("text-anchor", "middle")
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("fill", "black")
            .merge(labels)  // Merge new and existing labels
            .transition()
            .duration(1000)
            .attr("x", function(d, i) { return xScale(i) + xScale.bandwidth() / 2; })
            .attr("y", function(d) { return yScale(d) - 5; });

        // Remove labels that no longer exist in the dataset
        labels.exit()
            .transition()
            .duration(1000)
            .attr("x", w)  // Move them out of the SVG
            .remove();
    }

    // Call the function initially to render the chart
    updateChart();

    // Add button event listener
    d3.select("#add").on("click", function() {
        var newNumber = Math.floor(Math.random() * 25);  // Generate a random number
        dataset.push(newNumber);  // Add new data
        updateChart();  // Update the chart
    });

    // Remove button event listener
    d3.select("#remove").on("click", function() {
        dataset.shift();  // Remove the first data point
        updateChart();  // Update the chart
    });

    d3.select("#sort").on("click", function(){
        sortBars();
        updateChart();
    });
}
window.onload = init;