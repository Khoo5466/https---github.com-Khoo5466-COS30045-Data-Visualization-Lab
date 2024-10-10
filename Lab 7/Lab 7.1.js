function init(){
    d3.csv("Unemployment_78-95.csv").then(function(data){
        console.log(data);
        Umemployment = data;

    });
}
window.onload = init;