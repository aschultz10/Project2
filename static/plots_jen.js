//----------------------------------------
//CODE BELOW IS FROM RICHARD'S APP.JS FILE
//-----------------------------------------
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

function dropdown(){
  var url = 'http://127.0.0.1:5000/data'
  var ID = d3.select("#selDataset");
  d3.json(url).then(function(data){
      var countries = data.Country;
      countries.forEach((country)=>{
          ID.append("option")
          .text(country.name)
          // .property("value",country.name)
      })
      var country1 = countries[0];
      buildMetadata(country1);
      // buildCharts(country1);
  })
}
dropdown()

function optionChanged(newCountry){
  buildMetadata(newCountry)
  // buildCharts(newCountry)
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

// function buildCharts(sample) {
//   // Use d3.json to get data
//   d3.json(url).then(function(data) {
//       var metadata = data.Country;
//       var filterdata = metadata.filter(sampleobject => sampleobject.Year==sample);
//       var result = filterdata[0];
//       var OTU_ids = result.otu_ids;
//       var OTU_labels = result.otu_labels;
//       var samplevalue = result.sample_values;
//       console.log(metadata)
//   })
// }


//----------------------------------------------
//  CODE BELOW IS TAKEN FROM PLOTLY-CHALLENGE
//----------------------------------------------

// Create the function that gets the data and creates the plots for the id 
function getPlot(id) {
    
    // Retrieve data from the json file
    d3.json("../data/samples.json").then((data)=> {
        //console.log(data)
    //});
        //var wfreq = data.metadata.map(d => d.wfreq)
        //console.log(`Washing Freq: ${wfreq}`)

        // Filter sample values by id 
        var samples = data.samples.filter(s => s.id.toString() === id)[0];

        console.log(samples);

        //Retrieve top 10 sample values to plot and reverse for Plotly
        var sampleValues = samples.sample_values.slice(0, 10).reverse();

        // Retrieve top 10 otu ids for the plot
        var idValues = (samples.otu_ids.slice(0, 10)).reverse();
        
        // Retrieve the otu ids to the desired form for the plot
        var idOtu = idValues.map(d => "OTU " + d)

        console.log(`OTU IDS: ${idOtu}`)

        // Retrieve the top 10 labels for the plot
        var labels = samples.otu_labels.slice(0, 10);

        console.log(`Sample Values: ${sampleValues}`)
        console.log(`Id Values: ${idValues}`)

        
        // Create trace variable for the plot
        var trace = {
            x: sampleValues,
            y: idOtu,
            text: labels,
            type:"bar",
            orientation: "h",
        };

        // Create data variable
        var data = [trace];

        // Create layout variable to set plots layout
        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 30,
                b: 20
            }
        };

        // Create the bar plot
        Plotly.newPlot("bar", data, layout);

        //console.log(`ID: ${samples.otu_ids}`)
        
        // Create the trace for the bubble chart
        var trace1 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels

        };

        // Layout for the bubble plot
        var layout = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1300
        };

        // Create the data variable 
        var data1 = [trace1];

        // Create bubble plot
        Plotly.newPlot("bubble", data1, layout); 

        // Create pie chart
        var tracePie = {
            labels: idOtu,
            values:sampleValues,
            type:"pie"
        }

        var data = [tracePie]
        
        var layout = {
                title: "Top 10 OTU",
        };
            
        Plotly.newPlot("pie", data, layout)

    });    
}
    
// Create function to get the necessary data
function getInfo(id) {
    //Read json file to get data
    d3.json("../data/samples.json").then((data)=> {
        
        // Retrieve metadata info for the demographic panel
        var metadata = data.metadata;

        console.log(metadata)

        // Filter metadata info by id
        var result = metadata.filter(meta => meta.id.toString() === id)[0];

        // Select demographic panel to put data
        var demographicInfo = d3.select("#sample-metadata");
        
        // Empty the demographic info panel each time before getting new id info
        demographicInfo.html("");

        // Get necessary demographic data for the id and append the info to the panel
        Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}

// Create the function for the change event
function optionChanged(id) {
    getPlot(id);
    getInfo(id);
}

// Create the function for the initial data rendering
function init() {
    // Select dropdown menu 
    var dropdown = d3.select("#selDataset");

    // Read data 
    d3.json("../data/samples.json").then((data)=> {
        console.log(data)

        // Id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // Call the functions to display the data and the plots to the page
        getPlot(data.names[0]);
        getInfo(data.names[0]);
    });
}

init();
