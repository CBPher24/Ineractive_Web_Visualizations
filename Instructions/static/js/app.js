var sample_dataset;

async function get_data() {
        var url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
        var sample_data = d3.json(url, function(error){
        if (error) throw error;
    }) ;
    return sample_data;
  }
  
get_data().then(data=>{
    sample_dataset = data;
    var samples = data.names  
    let sel = document.getElementById("selDataset");
    for(var key in samples){
        var contentStr = '<option value="'+key+'">'+samples[key]+'</option>';
        sel.innerHTML += contentStr; 
    }
}); 


function optionChanged(key){
    var data = sample_dataset.metadata[key];
    let meta = document.getElementById("sample-metadata");
    var contentStr = '';
    for(var i in data){
        contentStr += i + ': '+data[i]+'</br>';        
    }
    meta.innerHTML = contentStr; 
    getTop10(key);
    bubbles(key);
}

function getTop10(key){    
    var data = sample_dataset.samples[key];

    let values_ten = data.sample_values.slice(0,10).reverse()
    let labels_ten = data.otu_ids.map(otuId => `OTU ${otuId}`).slice(0,10).reverse()
    let hover_ten = data.otu_labels.slice(0,10).reverse()

    var bar_data = [{
        type: 'bar',
        x: values_ten,
        y: labels_ten,
        mode: 'markers',
        marker: {size:16},
        text: hover_ten,
        orientation: 'h'    
    }];    
    
  Plotly.newPlot('bar', bar_data);
}


function bubbles(key){
    var data = sample_dataset.samples[key];

    let values = data.sample_values
    let labels = data.otu_ids
    let hover = data.otu_labels

    var trace1 = {
        x: labels,      
        y: values,      
        text: hover,      
        mode: 'markers',      
        marker: {      
          color: labels,      
          size: values      
        }      
      };

    var data = [trace1];

    var layout = {      
        title: 'OTU ID',      
        showlegend: false,
      };
      
    Plotly.newPlot('bubble', data, layout);
}