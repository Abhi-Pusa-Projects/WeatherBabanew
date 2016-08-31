
//this function is used for plotting the graph
function plot_graph(data){
    d3.select("svg").html("");

    var margin = {top: 20, right: 40, bottom: 60, left: 50},
    width = 960 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    // var svg = d3.select("svg"),
    //   margin = {top: 20, right: 80, bottom: 30, left: 50},
    //   width = svg.attr("width") - margin.left - margin.right,
    //   height = svg.attr("height") - margin.top - margin.bottom,
    //   g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // parse the date / time
  var parseTime = d3.timeParse("%d-%b-%y");


  var mindate = new Date(data[0].date),
      maxdate = new Date(data[data.length-1].date);
  // set the ranges
  var x = d3.scaleTime().domain([mindate, maxdate]).range([0, width]);
  var y0 = d3.scaleLinear().range([height, 0]);


  // define the 1st line
  var valueline = d3.line()
      .curve(d3.curveBasis)
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y0(d.temp); });

  // define the 2nd line
  var valueline2 = d3.line()
      .curve(d3.curveBasis)
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y0(d.temp_min); });

  var valueline3 = d3.line()
      .curve(d3.curveBasis)
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y0(d.temp_max); });

  // append the svg obgect to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // format the data
    data.forEach(function(d) {
        d.date = parseTime(d.date);
        d.temp = +d.temp;
        d.temp_min = +d.temp_min;
        d.temp_max = +d.temp_max;
    });

    var cityTemp = data.map(function(id){
      return{
        id : id,
        values: data.map(function(d){
          return {date: d.date, minTemp: d.min_temp, maxTemp: d.max_temp};
        })
      };
    });
    // scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y0.domain([
      d3.min(data, function(d) {return d.temp_min; }),
      d3.max(data, function(d) {return d.temp_max; }),
    ]);
    // y0.domain([290, d3.max(data, function(d) {return d.temp; })]);
    // y0.domain([290, d3.max(data, function(d) {return d.temp_min; })]);
    // y0.domain([290, d3.max(data, function(d) {return d.temp_max; })]);

    // add the valueline path.
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("id", "blueLine")
        .attr("d", valueline);

    // add the valueline2 path.
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("id", "redLine")
        .style("stroke", "red")
        .attr("d", valueline2);

    // add the valueline2 path.
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("id", "greenLine")
        .style("stroke", "green")
        .attr("d", valueline3);

    // add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the Y0 Axis
    svg.append("g")
        .attr("class", "axisSteelBlue")
        .call(d3.axisLeft(y0));



    // add the blue line legend
    svg.append("text")
       .attr("x", 0)
       .attr("y", height + margin.top + 15)
       .attr("class", "legend")
       .style("fill", "steelblue")
       .on("click", function(){
         // determine if current line is visible
         var active   = blueLine.active ? false : true,
         newOpacity = active ? 0 : 1;
         // hide or show the elements
         d3.select("#blueLine").style("opacity", newOpacity);
         // update whether or not the elements are active
         blueLine.active = active;
       })
       .text("Temp");

    // add the red line legend
    svg.append("text")
       .attr("x", 60)
       .attr("y", height + margin.top + 15)
       .attr("class", "legend")
       .style("fill", "red")
       .on("click", function(){
         // determine if current line is visible
         var active   = redLine.active ? false : true,
         newOpacity = active ? 0 : 1;
         // hide or show the elements
         d3.select("#redLine").style("opacity", newOpacity);
         // update whether or not the elements are active
         redLine.active = active;
       })
       .text("Min Temp");

       // add the red line legend
       svg.append("text")
          .attr("x", 160)
          .attr("y", height + margin.top + 15)
          .attr("class", "legend")
          .style("fill", "green")
          .on("click", function(){
            // determine if current line is visible
            var active   = greenLine.active ? false : true,
            newOpacity = active ? 0 : 1;
            // hide or show the elements
            d3.select("#greenLine").style("opacity", newOpacity);
            // update whether or not the elements are active
            greenLine.active = active;
          })
          .text("Max Temp");
}

module.exports = plot_graph;
