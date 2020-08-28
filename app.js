function buildPlot() {
    d3.json("data/samples.json").then(function(dataOtu){
        // Make a list of all the data in names
        var names_list = dataOtu.names;
        
        // Input sample ID selected from HTML or USER
        var user_input = '940';
        
        // fetch the index value based on the name input by user
        var sample_id = names_list.findIndex(i => i == user_input);
        
        // Adding data for the graphs and placing data to relevent variables
        var otu_IDs = dataOtu.samples[sample_id].otu_ids; 
        var samp_Values = dataOtu.samples[sample_id].sample_values;
        var otu_Labels = dataOtu.samples[sample_id].otu_labels; 

        // Getting top ten values from data and reversing the data order
        otuIDs = otu_IDs.slice(0,10);
        otuIDs = otuIDs.map(s => `OTU ${s}`).reverse();
        sampValues = samp_Values.slice(0,10).reverse();
        otuLabels = otu_Labels.slice(0,10).reverse();

        // Making the Bar Chart
        var trace = {
            x: sampValues,
            y: otuIDs,
            text: otuLabels,
            type: "bar",
            orientation: "h"
        };
        var layout = {
        };
        var data = [trace];
        Plotly.newPlot("bar", data, layout);

        // Making the Bubble Chart
        var trace1 = {
            x: otu_IDs,
            y: samp_Values,
            text: otu_Labels,
            mode: 'markers',
            marker: {
              size: samp_Values,
              color: otu_IDs,
              colorscale: [[0, '#4b4ba9'], [.2, '#54d2b0'],[.2, '#7fe36b'],[.5, '#c0ea6e'],[.5, '#99752b'],[1, '#d7c7b9']]
            }
        };
        var data = [trace1];  
        var layout = {
            showlegend: false,
        };
        Plotly.newPlot('bubble', data, layout);

        

    }); 
};

buildPlot();