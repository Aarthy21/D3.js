var chartData, chartOptions;
window.onload = function () {
    chartData = [
        {
            "name": "LRP",
            "Model": "Model 1",
            "size": 80
        },
        {
            "name": "LRP",
            "Model": "Model 2",
            "size": 100
        },
        {
            "name": "LRP",
            "Model": "Model 3",
            "size": 150
        },
        {
            "name": "LRP",
            "Model": "Model 4",
            "size": 180
        },
        {
            "name": "LRP",
            "Model": "Model 5",
            "size": 25
        },
        {
            "name": "LRP",
            "Model": "Model 6",
            "size": 160
        },
        {
            "name": "LRP",
            "Model": "Model 7",
            "size": 20
        },
        {
            "name": "LRP",
            "Model": "Model 8",
            "size": 40
        },
        {
            "name": "LRP",
            "Model": "Model 9",
            "size": 90
        },
        {
            "name": "BOOKING",
            "Model": "Model 1",
            "size": 450
        },
        {
            "name": "BOOKING",
            "Model": "Model 2",
            "size": 30
        },
        {
            "name": "BOOKING",
            "Model": "Model 3",
            "size": 35
        },
        {
            "name": "BOOKING",
            "Model": "Model 4",
            "size": 130
        },
        {
            "name": "BOOKING",
            "Model": "Model 5",
            "size": 185
        },
        {
            "name": "CONTAINER",
            "Model": "Model 1",
            "size": 100
        },
        {
            "name": "CONTAINER",
            "Model": "Model 2",
            "size": 20
        },
        {
            "name": "CONTAINER",
            "Model": "Model 3",
            "size": 230
        },
        {
            "name": "CONTAINER",
            "Model": "Model 4",
            "size": 110
        },
        {
            "name": "REPORT",
            "Model": "Model 1",
            "size": 120
        },
        {
            "name": "REPORT",
            "Model": "Model 2",
            "size": 110
        }, {
            "name": "REPORT",
            "Model": "Model 3",
            "size": 220
        },
        {
            "name": "ORDER",
            "Model": "Model 1",
            "size": 270
        },
        {
            "name": "ORDER",
            "Model": "Model 2",
            "size": 550
        }
    ];
    chartOptions = [{
        "captions": [{ "LRP": "LRP", "BOOKING": "BOOKING", "CONTAINER": "CONTAINER", "REPORT": "REPORT", "ORDER": "ORDER" }],
        "color": [{ "LRP": "#FFA500", "BOOKING": "#0070C0", "CONTAINER": "#ff0000", "REPORT": "#70edee", "ORDER": "#f2baf6" }],
        "Name": "name",
        "Model": "Model",
        "Size": "size"
    }]

    console.log(chartOptions);
    console.log(chartData);
    BarChart("chart", chartData, chartOptions);
};
function BarChart(id, chartData, chartOptions) {    
    TransformChartData(chartData, chartOptions);
    ShowCharts(id, chartData, chartOptions);
}
function ShowCharts(id, chartData, options, level) {
    console.log(id);
    // d3.selectAll("#" + id + " .innerCont").remove();
    // $("#" + id).append(chartInnerDiv);
    chart = d3.select("#" + id + " .innerCont");
    var margin = { top: 50, right: 10, bottom: 30, left: 50 },
        width = $(chart[0]).outerWidth() - margin.left - margin.right,
        height = $(chart[0]).outerHeight() - margin.top - margin.bottom

    var xVarName;
    var yVarName = options[0].Size;
    if (level == 1) {
        xVarName = options[0].Model;
    }
    else {
        xVarName = options[0].Name;
    }
    var xAry = runningData.map(function (el) {
        return el[xVarName];
    });
    var yAry = runningData.map(function (el) {
        return el[yVarName];
    });
    var capAry = runningData.map(function (el) { return el.caption; });
    var x = d3.scale.ordinal().domain(xAry).rangeRoundBands([0, width], 0.5);
    var y = d3.scale.linear().domain([0, d3.max(runningData, function (d) { return d[yVarName]; })]).range([height, 0]);
    var rcolor = d3.scale.ordinal().range(runningColors);

    chart = chart
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);
    var bar = chart.selectAll("g")
        .data(runningData)
        .enter()
        .append("g")
        .attr("transform", function (d) {
            return "translate(" + x(d[xVarName]) + ", 0)";
        });
    var ctrtxt = 0;
    var Name = d3.svg.axis()
        .scale(x)
        .orient("bottom").ticks(xAry.length)
        .tickFormat(function (d) {
            if (level == 0) {
                var mapper = options[0].captions[0]
                return mapper[d]
            }
            else {
                var r = runningData[ctrtxt].caption;
                ctrtxt += 1;
                return r;
            }
        });
    var Size = d3.svg.axis()
        .scale(y)
        .orient("left").ticks(5);
    bar.append("rect")
        .attr("y", function (d) {
            return y(d.size) + margin.top - 15;
        })
        .attr("x", function (d) {
            return (margin.left);
        })
        .on("mouseenter", function (d) {
            d3.select(this)
                .attr("stroke", "white")
                .attr("stroke-width", 1)
                .attr("height", function (d) {
                    return height - y(d[yVarName]) + 5;
                })
                .attr("y", function (d) {
                    return y(d.size) + margin.top - 20;
                })
                .attr("width", x.rangeBand() + 10)
                .attr("x", function (d) {
                    return (margin.left - 5);
                })
                .transition()
                .duration(200);
        })
        .on("mouseleave", function (d) {
            d3.select(this)
                .attr("stroke", "none")
                .attr("height", function (d) {
                    return height - y(d[yVarName]);;
                })
                .attr("y", function (d) {
                    return y(d[yVarName]) + margin.top - 15;
                })
                .attr("width", x.rangeBand())
                .attr("x", function (d) { 
                    return (margin.left);
                })
                .transition()
                .duration(200);
        })
        .on("click", function (d) {
            if (this._listenToEvents) {
                d3.select(this).attr("transform", "translate(0,0)")
                path.each(function () {
                    this._listenToEvents = false;
                });
            }
            d3.selectAll("#" + id + " svg").remove();
            if (level == 1) {
                TransformChartData(chartData, options, 0, d[xVarName]);
                ShowCharts(id, chartData, options, 0);
            }
            else {
                var nonSortedChart = chartData.sort(function (a, b) {
                    return parseFloat(b[options[0].Size]) - parseFloat(a[options[0].Size]);
                });
                TransformChartData(nonSortedChart, options, 1, d[xVarName]);
                ShowCharts(id, nonSortedChart, options, 1);
            }
        });
    bar.selectAll("rect").attr("height", function (d) {
        return height - y(d[yVarName]);
    })
        // .transition().delay(function (d, i) { return i * 300; })
        // .duration(1000)
        .attr("width", x.rangeBand())
    // .transition().delay(function (d, i) { return i * 300; })
    // .duration(1000);
    bar.selectAll("rect").style("fill", function (d) {
        return rcolor(d[xVarName]);
    })
        .style("opacity", function (d) {
            return d["op"];
        });
    bar.append("text")
        .attr("x", x.rangeBand() / 2 + margin.left - 10)
        .attr("y", function (d) { return y(d[yVarName]) + margin.top - 25; })
        .attr("dy", ".35em")
        .text(function (d) {
            return d[yVarName];
        });
    bar.append("svg:title")
        .text(function (d) {
            //return xVarName + ":  " + d["title"] + " \x0A" + yVarName + ":  " + d[yVarName];
            return d["title"] + " (" + d[yVarName] + ")";
        });
    chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(" + margin.left + "," + (height + margin.top - 15) + ")")
        .call(Name)
        .append("text")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end");

    chart.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + margin.left + "," + (margin.top - 15) + ")")
        .call(Size)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end");

    if (level == 1) {
        chart.select(".x.axis")
            .selectAll("text")
            .attr("transform", " translate(-20,10) rotate(-35)");
    }
}
function TransformChartData(chartData, opts, level, filter) {
    var result = [];
    var resultColors = [];
    var counter = 0;
    var hasMatch;
    var xVarName;
    var yVarName = opts[0].Size;
    if (level == 1) {
        xVarName = opts[0].Model;
        for (var i in chartData) {
            hasMatch = false;
            for (var index = 0; index < result.length; index++) {
                var data = result[index];
                console.log(data);
                if ((data[xVarName] == chartData[i][xVarName]) && (chartData[i][opts[0].Name]) == filter) {
                    console.log(data[xVarName]);
                    console.log(chartData[i][xVarName]);
                    console.log(chartData[i][opts[0].Name]);
                    result[index][yVarName] = result[index][yVarName] + chartData[i][yVarName];
                    hasMatch = true;
                    break;
                }
            }
            if ((hasMatch == false) && ((chartData[i][opts[0].Name]) == filter)) {
                if (result.length < 9) {
                    ditem = {}
                    ditem[xVarName] = chartData[i][xVarName];
                    ditem[yVarName] = chartData[i][yVarName];
                    ditem["caption"] = chartData[i][xVarName].substring(0, 10);
                    ditem["title"] = chartData[i][xVarName];
                    // ditem["op"] = 1.0 - parseFloat("0." + (result.length));
                    result.push(ditem);
                    resultColors[counter] = opts[0].color[0][chartData[i][opts[0].Name]];
                    counter += 1;
                }
            }
        }
    }
    else {
        xVarName = opts[0].Name;
        for (var i in chartData) {
            hasMatch = false;
            for (var index = 0; index < result.length; ++index) {
                var data = result[index];
                if (data[xVarName] == chartData[i][xVarName]) {
                    result[index][yVarName] = result[index][yVarName] + chartData[i][yVarName];
                    hasMatch = true;
                    break;
                }
            }
            if (hasMatch == false) {
                ditem = {};
                ditem[xVarName] = chartData[i][xVarName];
                ditem[yVarName] = chartData[i][yVarName];
                ditem["caption"] = opts[0].captions != undefined ? opts[0].captions[0][chartData[i][xVarName]] : "";
                ditem["title"] = opts[0].captions != undefined ? opts[0].captions[0][chartData[i][xVarName]] : "";
                ditem["op"] = 1;
                result.push(ditem);
                resultColors[counter] = opts[0].color != undefined ? opts[0].color[0][chartData[i][xVarName]] : "";
                counter += 1;
            }
        }
    }
    runningData = result;
    runningColors = resultColors;
    return;
}
