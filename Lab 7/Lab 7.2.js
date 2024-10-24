function PieChart1() {
    var w = 300;
    var h = 300;

    var dataset = [10, 20, 25, 35, 40, 45];

    var outerRadius = w/2;
    var innerRadius = 0;

    var arc =  d3.arc()
                .outerRadius(outerRadius)
                .innerRadius(innerRadius);

    var pie = d3.pie();

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    // Create SVG canvas and group arcs
    var svg = d3.select("#pie1")
                .append("svg")
                .attr("width", w)
                .attr("height", h);
                
    var arcs = svg.selectAll("g.arc")
                    .data(pie(dataset))
                    .enter()
                    .append("g")
                    .attr("class", "arc")
                    .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");


    arcs.append("path")
        .attr("fill", function(d, i){
            return color(i);
        })
        .attr("d", function(d, i){
            return arc(d, i);
        });
    
    arcs.append("text")
        .text(function(d){
            return d.value;
        })
        .attr("transform", function(d){
            return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle")
        .style("fill", "white");
}

function PieChart2() {
    var w = 300;
    var h = 300;

    var dataset = [10, 20, 25, 35, 40, 45];

    var outerRadius = w/2;
    var innerRadius = 70;

    var arc =  d3.arc()
                .outerRadius(outerRadius)
                .innerRadius(innerRadius);

    var pie = d3.pie();

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    // Create SVG canvas and group arcs
    var svg = d3.select("#pie2")
                .append("svg")
                .attr("width", w)
                .attr("height", h);
                
    var arcs = svg.selectAll("g.arc")
                    .data(pie(dataset))
                    .enter()
                    .append("g")
                    .attr("class", "arc")
                    .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");


    arcs.append("path")
        .attr("fill", function(d, i){
            return color(i);
        })
        .attr("d", function(d, i){
            return arc(d, i);
        });
    
    arcs.append("text")
        .text(function(d){
            return d.value;
        })
        .attr("transform", function(d){
            return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle")
        .style("fill", "white");
}

function init(){
    PieChart1();
    PieChart2();
}
window.onload = init;