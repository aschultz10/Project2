// define drop down menu:

var url = 'http://127.0.0.1:5000/data'
// using this portion to test code
// d3.json(url).then(function(data) {
  // console.log(data.Country[0])
  // var country = 'Aruba'
  // var sample = data.Country
  // console.log(sample.name)
  // var filtersample = sample.filter(sampleobject => sampleobject.name == country);
  // console.log(filtersample)
// });
//   var test = data.Country;
//   test.forEach((country)=>{
//     console.log(country.id)
//     // AID.append("name")
//     // .text()
//   })
// });

var url = 'http://127.0.0.1:5000/data'


function dropdown(){
  var ID = d3.select("#selDataset");
  d3.json(url).then(function(data){

      console.log(data);
      var countries = data.Country;
      countries.forEach((country)=>{
          ID.append("option")
          .text(country.name)
          // .property("value",country.name)
      })
  })
}
dropdown()

function optionChanged(newCountry){
  buildMetadata(newCountry)
  //buildCharts(newCountry)
  plotCharts(newCountry);
  // gguage_plot(newCountry)
}


function buildMetadata(country){
  d3.json(url).then(function(data){
    var countryInfo = data.Country
    var filterdata = countryInfo.filter(sampleobject => sampleobject.name == country);
    var result = filterdata[0];
    var sampleData = d3.select("#sample-metadata");
    sampleData.html("");
    Object.entries(result).forEach(function([key, value]){
      // fix this if condition
      if(result) {
        var row = sampleData.append("p");
        row.text(`${key}: ${value}`)
      }
    })
  })

}

// ToDo Wite code for charts here:
function plotCharts(country){
  var usedata = [];
  d3.json(url).then(function(data) {
    var countryInfo = data.Country
    var filterdata = countryInfo.filter(sampleobject => sampleobject.name == country);
    
    x_variable_keys = ["RT_EducationScore","RT_FoodScore","RT_HealthScore", "RT_HousingScore","RT_WorkScore"];

    // Loop through the countries and push keys to the chart
    for(i=0; i < x_variable_keys.length; i++){
      usedata.push({label: x_variable_keys[i], value: filterdata[0][x_variable_keys[i]] })
    }

    usedata["columns"] = x_variable_keys

    console.log("Usedata", usedata, x_variable_keys.length);
    plotBar(usedata);

});

}

function plotBar(data){

d3.select("#bar-chart-svg").html("");

// Dimensions and Margins
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

//Append SVG
var svg = d3.select("#bar-chart-svg")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// make X axis then Append

var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(function(d) { return d.label; }))
  .padding(0.2);

svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// same thing with Y axis

var y = d3.scaleLinear()
  .range([ height, 0])
  .domain([0, 100])
svg.append("g")
  .call(d3.axisLeft(y));


// Append bars to the chart
svg.selectAll("myBar")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", function(d) { return x(d.label); })
    .attr("y", function(d) { return y(d.value); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d.value); })
    .attr("fill", "blue")

}