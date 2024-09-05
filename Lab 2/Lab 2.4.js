function init(){
    d3.csv("Task 2.4_data_CSV.csv").then(function(data){
        console.log(data);
        wombatSightings = data;

        barChart(wombatSightings)
        barChart1(wombatSightings)
    });

    var w = 600;
    var h = 150;
    var barPadding = 3;

    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    function barChart(wombatSightings){
        svg.selectAll("rect")
        .data(wombatSightings)
        .enter()
        .append("rect")
        .attr("x", function(d, i){
            return i * (w/wombatSightings.length);
        })
        .attr("y", function(d){
            return h - (d.wombats*4)
        })
        .attr("width", function(d){
            return (w/wombatSightings.length - barPadding);
        })
        .attr("height", function(d){
            return d.wombats*4;
        })
        .attr("fill", function(d){
            return "rgb(135,206, " + (d.wombats * 8) + ")";
        });
            
        svg.selectAll("text")
            .data(wombatSightings)
            .enter()
            .append("text")
            .text(function(d){
                return d.wombats;
            })
            .attr("fill", "black")
            .attr("x", function(d, i){
                return i * (w/wombatSightings.length) + 15;
            })
            .attr("y", function(d){
                return h - (d.wombats*4)
            })
    }

    var svg1 = d3.select("#chart1")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    function barChart1(wombatSightings){
        svg1.selectAll("rect")
        .data(wombatSightings)
        .enter()
        .append("rect")
        .attr("x", function(d, i){
            return i * (w/wombatSightings.length);
        })
        .attr("y", function(d){
            return h - (d.wombats*4)
        })
        .attr("width", function(d){
            return (w/wombatSightings.length - barPadding);
        })
        .attr("height", function(d){
            return d.wombats*4;
        })
        .attr("fill", function(d){
            return "rgb(144,236, " + (d.wombats * 7) + ")";
        });

        svg1.selectAll("text")
        .data(wombatSightings)
        .enter()
        .append("text")
        .text(function(d){
            return d.wombats;
        })
        .attr("fill", "black")
        .attr("x", function(d, i){
            return i * (w/wombatSightings.length) + 15;
        })  
        .attr("y", function(d){
            return h - (d.wombats*4) + 20
        })
    }

    
}

window.onload = init;

