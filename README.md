# D3.js
Data-Driven Documents
Data visualization using [D3.js]

## Features
* Compaptible with the [D3.js data format](#d3js-data-format).
* A bar chart is a simple way to visualize such data. 
* There are a number of variations of bar charts including stacked, grouped, horizontal and vertical.
* A simple vertical bar chart that uses a value on the y axis and date values on the x axis..
* Custom barchart colors by type.
* Highlight bars on init.
* Zoom, pan, auto fit.
* Compatible with D3.js v4.

### Documentation

#### D3.js data format
 chartData = [
        {
            "name": "B-C-1",
            "Model": "Model 1",
            "size": 80
        },
        {
            "name": "B-C-1",
            "Model": "Model 2",
            "size": 100
        },
        {
            "name": "B-C-1",
            "Model": "Model 3",
            "size": 150
        },
        {
            "name": "B-C-1",
            "Model": "Model 4",
            "size": 180
        },
        {
            "name": "B-C-1",
            "Model": "Model 5",
            "size": 25
        },
        {
            "name": "B-C-1",
            "Model": "Model 6",
            "size": 160
        },
        {
            "name": "B-C-2",
            "Model": "Model 1",
            "size": 450
        },
        {
            "name": "B-C-2",
            "Model": "Model 2",
            "size": 30
        },
        {
            "name": "B-C-2",
            "Model": "Model 3",
            "size": 35
        },
        {
            "name": "B-C-2",
            "Model": "Model 4",
            "size": 130
        },
        {
            "name": "B-C-2",
            "Model": "Model 5",
            "size": 185
        },
        {
            "name": "B-C-3",
            "Model": "Model 1",
            "size": 100
        },
        {
            "name": "B-C-3",
            "Model": "Model 2",
            "size": 20
        },
        {
            "name": "B-C-3",
            "Model": "Model 3",
            "size": 230
        },
        {
            "name": "B-C-3",
            "Model": "Model 4",
            "size": 110
        },
        {
            "name": "B-C-4",
            "Model": "Model 1",
            "size": 120
        },
        {
            "name": "B-C-4",
            "Model": "Model 2",
            "size": 110
        }, {
            "name": "B-C-5",
            "Model": "Model 3",
            "size": 220
        },
        {
            "name": "B-C-5",
            "Model": "Model 1",
            "size": 270
        },
        {
            "name": "B-C-5",
            "Model": "Model 2",
            "size": 550
        }
    ];
    chartOptions = [{
        "captions": [{ "B-C-1": "B-C-1", "B-C-2": "B-C-2", "B-C-3": "B-C-3", "B-C-4": "B-C-4", "B-C-5": "B-C-5" }],
        "color": [{ "B-C-1": "#FFA500", "B-C-2": "#0070C0", "B-C-3": "#ff0000", "B-C-4": "#70edee", "B-C-5": "#f2baf6" }],
        "Name": "name",
        "Model": "Model",
        "Size": "size"
    }]
    
    
  barchart.js:
Step 1 — Create the data files

Step 2 — Setting Up the SVG in JavaScript 
First things first, we need to decide on the size of the new SVG:

//Width and height

var w = 500;
var h = 100;

Then, D3 to create an empty SVG element and add it to the DOM:

//Create SVG element
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
            
Step 3 — Adding Rectangles           
Next, instead of creating divs, we generate rects and add them to svg.
svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", 0)
   .attr("y", 0)
   .attr("width", 20)
   .attr("height", 100);  
   
Step 4 — Styling with D3
html, body {
  margin: 0;
  height: 100%
}

.bar {
  fill: blue
}

Step 5 — Adding Labels
Adding text is similar to adding the rectangle shapes that we did above. We’ll need to select the text, then append it to the SVG.
svg.selectAll("text")
    .data(dataArray)
    .enter().append("text")
    .text(function(d) {return d})
          .attr("x", function(d, i) {return (i * 60) + 25})
          .attr("y", function(d, i) {return 400 - (d * 10)});

Conclusion:
This tutorial went through creating a bar chart in the JavaScript D3 library. You can learn more about d3.js by visiting the D3 API on GitHub.

