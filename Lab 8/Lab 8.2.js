function init(){
    var w = 500;
    var h = 300;

    var projection = d3.geoMercator()
                        .center([145, -36.5])
                        .translate([w/2, h/2])
                        .scale(3000);

    var path = d3.geoPath()
                .projection(projection);

    var color = d3.scaleQuantize()
                    .range(["rgb(173, 216, 230)", "rgb(135, 206, 235)", "rgb(30, 144, 255)", 
                        "rgb(65, 105, 225)", "rgb(0, 0, 128)"]);


    var svg = d3.select("#map")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    d3.csv("VIC_LGA_unemployment.csv").then(function(data){
        color.domain([
            d3.min(data, function(d){return d.unemployed;}),
            d3.max(data, function(d){return d.unemployed;})
        ]);

        d3.json("LGA_VIC.json", function(json){

            for(var i = 0; i < data.length; i++){
                var dataState = data[i].LGA;
                var dataValue = parseFloat(data[i].unemployed);
    
                for(var j = 0; j < json.features; j++){
                    var jsonState = json.features[j].properties.LGA_name;
    
                    if(dataState == jsonState){
                        json.features[j].properties.value = dataValue;
                        break;
                    }
                }
            }
    
            svg.selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("d", path)
                .style("fill", function(d){
                    var value = d.properties.value;
    
                    if(value){
                        return color(value);
                    }else{
                        return '#ccc';
                    }
                });
        });
    })

    
}
window.onload = init;