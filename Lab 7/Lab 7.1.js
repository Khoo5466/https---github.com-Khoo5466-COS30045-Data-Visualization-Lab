function init(){
    var w = 600;
    var h = 300;
    var padding = 50;

    var dataset = []; 

    // Create scales without domain since dataset is empty initially
    var xScale = d3.scaleTime()
                    .range([padding, w - padding]);

    var yScale = d3.scaleLinear()
                    .range([h - padding, padding]);

    // Define the line function
    var line = d3.line()
                .x(function(d) { return xScale(d.date); })
                .y(function(d) { return yScale(d.number); });

    // Define the area function
    var area = d3.area()
                .x(function(d) { return xScale(d.date); })
                .y0(h - padding) // Bottom of area chart (0 line)
                .y1(function(d) { return yScale(d.number); });
    
    // Load data           
    d3.csv("Unemployment_78-95.csv", function(d){
        return{
            date: new Date(+d.year, +d.month-1),
            number: +d.number
        };
    }).then(function(data){
        dataset = data;

        // Update scales based on dataset
        xScale.domain(d3.extent(dataset, function(d) { return d.date; }));
        yScale.domain([0, d3.max(dataset, function(d) { return d.number; })]);

        // Call the lineChart function to draw the chart
        lineChart(dataset);

        console.table(dataset, ["date", 'number']);
    });

    function lineChart(dataset){
        var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

            //Add Chart Title
            svg.append("text")
                .attr("x", (w / 2))  // Position in the center horizontally
                .attr("y", padding / 2)  // Position at the top with some padding
                .attr("text-anchor", "middle")
                .attr("font-size", "20px")
                .attr("font-weight", "bold")
                .text("Number of Unemployed in Australia");

            svg.append("path")
                .datum(dataset)
                .attr("class", "area")
                .attr("d", area)
                .attr("fill", "lightsteelblue");

            svg.append("path")
                .datum(dataset)
                .attr("class", "line")
                .attr("d", line)
                .attr("stroke", "steelblue")
                .attr("stroke-width", 2)
                .attr("fill", "none");

            svg.append("line")
                .attr("class", "line halfMilMark")
                .attr("x1", padding)
                .attr("y1", yScale(500000))
                .attr("x2", w - padding)
                .attr("y2", yScale(500000))
                .attr("stroke", "red")
                .attr("stroke-width", 2)
                .attr("stroke-dasharray", "5,5");
            
            svg.append("text")
                .attr("class", "halfMilLabel")
                .attr("x", padding + 10)
                .attr("y", yScale(500000) - 7)
                .text("Half a million unemployed")
                .attr("font-size", "12px")
                .attr("fill", "red");

        //Add X-Axis
        var xAxis = d3.axisBottom(xScale);
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (h - padding) + ")")  // Move to bottom
            .call(xAxis);

        //Add Y-Axis
        var yAxis = d3.axisLeft(yScale);
        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + padding + ",0)")  // Move to left
            .call(yAxis);
    }    
}
window.onload = init;