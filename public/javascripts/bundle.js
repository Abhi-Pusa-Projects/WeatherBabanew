(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var React = require('react');
var NavBar = require('./components/menu/NavBar.js');
var ChartCanvas = require('./components/chart/ChartCanvas.js');
var rawtoactualdataconverter = require('./components/action/data_converter.js');
var populatedashboard = require('./components/action/populateDashboard.js');

var App = React.createClass({
  displayName: 'App',

  getInitialState: function getInitialState() {
    return {
      ip: "",
      url: "",
      lat: "",
      lng: "",
      city: "",
      data: ""
    };
  },
  searchData: function searchData(url) {
    var _this2 = this;

    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (responseJson) {
      _this2.setState({
        data: responseJson
      }, function () {
        rawtoactualdataconverter(responseJson);
      });
    });
  },
  handleChange: function handleChange(gURL, gCity, gLat, gLng) {
    this.setState({
      url: gURL,
      city: gCity,
      lat: gLat,
      lng: gLng
    }, function () {
      this.searchData(this.state.url);
    });
  },
  myLocation: function myLocation() {
    var _this = this;
    fetch('http://freegeoip.net/json/').then(function (response) {
      return response.json();
    }).then(function (responseJson) {
      console.log(responseJson);
      var curURL = 'http://api.openweathermap.org/data/2.5/forecast/city?' + "lat=" + responseJson.latitude + "&" + "lon=" + responseJson.longitude + '&APPID=bfbfccb0b8cb44018d9282c12bb57409';
      console.log('my check 2222');
      _this.setState({
        ip: responseJson.query
      }, function () {
        console.log('My check inside');
        _this.handleChange(curURL, responseJson.city, responseJson.latitude, responseJson.longitude);
      });
    });
  },
  updateDashboard: function updateDashboard() {
    var url1 = 'http://localhost:3000/getdash';
    $.post(url1, { ip: this.state.ip }, function (data) {
      populatedashboard(data);
    });
  },
  componentWillMount: function componentWillMount() {
    var _this = this;
    _this.myLocation();
    _this.updateDashboard();
  },
  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(NavBar, { handle: this.handleChange }),
      React.createElement(ChartCanvas, { update: this.updateDashboard, handler: this.state, loc: this.myLocation, chartDetails: this.state.city })
    );
  }
});

module.exports = App;

},{"./components/action/data_converter.js":2,"./components/action/populateDashboard.js":4,"./components/chart/ChartCanvas.js":7,"./components/menu/NavBar.js":11,"react":"react"}],2:[function(require,module,exports){
'use strict';

var plot_graph = require('./plot_graph');
//function to convert the raw data from weather app to actual data used by d3 graphs
function rawtoactualdataconverter(tempjson) {
  var date_array = [];
  var data_array = [];
  var count_array = [];
  var dateTime_array = [];
  var max_temp_array = [];
  var min_temp_array = [];
  var temp_json = tempjson;
  //console.log("+++++++++>>>>>>>>" , temp_json);
  for (var i = 0; i < temp_json.list.length; i++) {
    //console.log(temp_json.list[i].dt_txt,temp_json.list[i].main.temp);
    var d = new Date(temp_json.list[i].dt_txt.split(' ')[0]);
    var new_date = d.toLocaleDateString("en-US");
    var index = date_array.indexOf(new_date);
    var counter = 0;
    //console.log(index);
    if (index === -1) {
      date_array.push(new_date);
      data_array.push(parseInt(temp_json.list[i].main.temp));
      min_temp_array.push(parseInt(temp_json.list[i].main.temp_min));
      max_temp_array.push(parseInt(temp_json.list[i].main.temp_max));
      dateTime_array.push(temp_json.list[i].dt_txt);
      counter = counter + 1;
      count_array.push(1);
    } else {
      data_array[index] = data_array[index] + parseInt(temp_json.list[i].main.temp);
      min_temp_array[index] = min_temp_array[index] + parseInt(temp_json.list[i].main.temp_min);
      max_temp_array[index] = max_temp_array[index] + parseInt(temp_json.list[i].main.temp_max);
      dateTime_array[counter] = temp_json.list[i].dt_txt;
      counter = counter + 1;
      count_array[index] = count_array[index] + 1;
    }
  }

  var final_data = [];
  for (var k = 0; k < date_array.length; k++) {
    var obj = {};
    obj["date"] = date_array[k];
    obj["temp"] = parseInt(data_array[k] / count_array[k]) - 273.15;
    obj["temp_min"] = parseInt(min_temp_array[k] / count_array[k]) - 273.15;
    obj["temp_max"] = parseInt(max_temp_array[k] / count_array[k]) - 273.15;
    obj["full_date"] = dateTime_array[k];
    final_data.push(obj);
  }
  dateConvertor(final_data);
}

function dateConvertor(final_data) {
  var dCount = final_data.length;
  var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var date;
  var day;
  var monthIndex;
  var year;
  for (var i = 0; i <= dCount - 1; i++) {

    date = new Date(final_data[i].date);
    day = date.getDate();
    monthIndex = date.getMonth();
    year = date.getFullYear();
    year = year.toString().slice(2, 4);
    final_data[i].date = day + "-" + monthNames[monthIndex] + "-" + year;
  }
  //console.log(final_data);
  plot_graph(final_data);
}

module.exports = rawtoactualdataconverter;

},{"./plot_graph":3}],3:[function(require,module,exports){
"use strict";

//this function is used for plotting the graph
function plot_graph(data) {
    d3.select("svg").html("");

    var margin = { top: 20, right: 40, bottom: 60, left: 50 },
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
        maxdate = new Date(data[data.length - 1].date);
    // set the ranges
    var x = d3.scaleTime().domain([mindate, maxdate]).range([0, width]);
    var y0 = d3.scaleLinear().range([height, 0]);

    // define the 1st line
    var valueline = d3.line().curve(d3.curveBasis).x(function (d) {
        return x(d.date);
    }).y(function (d) {
        return y0(d.temp);
    });

    // define the 2nd line
    var valueline2 = d3.line().curve(d3.curveBasis).x(function (d) {
        return x(d.date);
    }).y(function (d) {
        return y0(d.temp_min);
    });

    var valueline3 = d3.line().curve(d3.curveBasis).x(function (d) {
        return x(d.date);
    }).y(function (d) {
        return y0(d.temp_max);
    });

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // format the data
    data.forEach(function (d) {
        d.date = parseTime(d.date);
        d.temp = +d.temp;
        d.temp_min = +d.temp_min;
        d.temp_max = +d.temp_max;
    });

    var cityTemp = data.map(function (id) {
        return {
            id: id,
            values: data.map(function (d) {
                return { date: d.date, minTemp: d.min_temp, maxTemp: d.max_temp };
            })
        };
    });
    // scale the range of the data
    x.domain(d3.extent(data, function (d) {
        return d.date;
    }));
    y0.domain([d3.min(data, function (d) {
        return d.temp_min;
    }), d3.max(data, function (d) {
        return d.temp_max;
    })]);
    // y0.domain([290, d3.max(data, function(d) {return d.temp; })]);
    // y0.domain([290, d3.max(data, function(d) {return d.temp_min; })]);
    // y0.domain([290, d3.max(data, function(d) {return d.temp_max; })]);

    // add the valueline path.
    svg.append("path").data([data]).attr("class", "line").attr("id", "blueLine").attr("d", valueline);

    // add the valueline2 path.
    svg.append("path").data([data]).attr("class", "line").attr("id", "redLine").style("stroke", "red").attr("d", valueline2);

    // add the valueline2 path.
    svg.append("path").data([data]).attr("class", "line").attr("id", "greenLine").style("stroke", "green").attr("d", valueline3);

    // add the X Axis
    svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));

    // add the Y0 Axis
    svg.append("g").attr("class", "axisSteelBlue").call(d3.axisLeft(y0));

    // add the blue line legend
    svg.append("text").attr("x", 0).attr("y", height + margin.top + 15).attr("class", "legend").style("fill", "steelblue").on("click", function () {
        // determine if current line is visible
        var active = blueLine.active ? false : true,
            newOpacity = active ? 0 : 1;
        // hide or show the elements
        d3.select("#blueLine").style("opacity", newOpacity);
        // update whether or not the elements are active
        blueLine.active = active;
    }).text("Temp");

    // add the red line legend
    svg.append("text").attr("x", 60).attr("y", height + margin.top + 15).attr("class", "legend").style("fill", "red").on("click", function () {
        // determine if current line is visible
        var active = redLine.active ? false : true,
            newOpacity = active ? 0 : 1;
        // hide or show the elements
        d3.select("#redLine").style("opacity", newOpacity);
        // update whether or not the elements are active
        redLine.active = active;
    }).text("Min Temp");

    // add the red line legend
    svg.append("text").attr("x", 160).attr("y", height + margin.top + 15).attr("class", "legend").style("fill", "green").on("click", function () {
        // determine if current line is visible
        var active = greenLine.active ? false : true,
            newOpacity = active ? 0 : 1;
        // hide or show the elements
        d3.select("#greenLine").style("opacity", newOpacity);
        // update whether or not the elements are active
        greenLine.active = active;
    }).text("Max Temp");
}

module.exports = plot_graph;

},{}],4:[function(require,module,exports){
'use strict';

function populatedashboard(jsondata) {
    var json_data = JSON.parse(jsondata); //parsing the json data from json string
    console.log("populatedashboardsize", json_data);

    //for all the json data create a button element and add in the list of navigation bar
    for (var i = 0; i < json_data.length; i++) {

        var newdivision = document.createElement('div');
        var btndivision = document.createElement('div');
        var spandivision = document.createElement('div');

        btndivision.setAttribute("class", "col-sm-11");
        spandivision.setAttribute("class", "col-sm-1");

        spandivision.style.padding = 0;
        spandivision.style.textAlign = "center";
        spandivision.style.background = "#909090";

        var btn = document.createElement('button');
        var liDashboard = document.createElement('LI');
        var aDashboard = document.createElement("A");
        liDashboard.style.paddingLeft = "20px";
        var t = document.createTextNode(json_data[i].cityName);
        liDashboard.setAttribute("type", "button");
        aDashboard.appendChild(t);
        liDashboard.appendChild(aDashboard);

        //adding attributes to the button
        liDashboard.addEventListener("click", update_graph);
        liDashboard.setAttribute("data-lat", json_data[i].lat);
        liDashboard.setAttribute("data-lng", json_data[i].lng);
        liDashboard.setAttribute("city-name", json_data[i].cityName);

        //creating new span for deleting the dashboard
        var newspan = document.createElement('span');
        newspan.setAttribute("class", "glyphicon glyphicon-remove-circle");
        newspan.addEventListener("click", deletedash);
        newspan.setAttribute("cityName", json_data[i].cityName);
        newspan.setAttribute("ip", json_data[i].ip);
        newspan.style.paddingTop = "5px";
        spandivision.appendChild(newspan);

        // newdivision.appendChild(liDashboard );
        // newdivision.appendChild(spandivision);

        var element = document.getElementById('side-menu');
        element.appendChild(liDashboard);
    }
}

module.exports = populatedashboard;

},{}],5:[function(require,module,exports){
'use strict';

var React = require('react');

var AddDashboard = React.createClass({
  displayName: 'AddDashboard',


  addDashboard: function addDashboard() {
    console.log(this.props.handler);
    $.ajax({
      url: 'http://localhost:3000/addnewdash',
      type: 'POST',
      data: { cityName: this.props.handler.city, lat: this.props.handler.lat, lng: this.props.handler.lng, ip: this.props.handler.ip }, // or $('#myform').serializeArray()
      success: function success() {
        console.log("in ADD DASHBOARD SUCCESS", this.props);
        this.props.update();location.reload();
      }
    });
  },

  render: function render() {
    return React.createElement('i', { type: 'button', onClick: this.addDashboard.bind(this), id: 'tooltip2', 'data-toggle': 'tooltip', title: 'Add', 'data-container': 'body', className: 'fa fa-plus fa-fw ' });
  }

});

module.exports = AddDashboard;

},{"react":"react"}],6:[function(require,module,exports){
'use strict';

var React = require('react');
var AddDashboard = require('./AddDashboard.js');
var LocationDashboard = require('./LocationDashboard.js');
var DeleteDashboard = require('./DeleteDashboard.js');
var Chart = React.createClass({
  displayName: 'Chart',


  render: function render() {
    return React.createElement(
      'div',
      { className: 'row' },
      React.createElement(
        'div',
        { className: 'col-lg-12' },
        React.createElement(
          'div',
          { className: 'panel panel-default' },
          React.createElement(
            'div',
            { className: 'panel-heading ' },
            React.createElement('i', { className: 'fa fa-bar-chart-o fa-fw ' }),
            ' Chart',
            React.createElement(
              'div',
              { className: 'pull-right' },
              React.createElement(
                'div',
                { className: 'btn-group' },
                React.createElement(LocationDashboard, { loc: this.props.loc }),
                React.createElement(AddDashboard, { update: this.props.update, handler: this.props.handler }),
                React.createElement(DeleteDashboard, { update: this.props.update, handler: this.props.handler })
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'panel-body' },
            React.createElement('svg', { width: '960', height: '350' })
          )
        )
      )
    );
  }

});

module.exports = Chart;

},{"./AddDashboard.js":5,"./DeleteDashboard.js":9,"./LocationDashboard.js":10,"react":"react"}],7:[function(require,module,exports){
'use strict';

var React = require('react');
var DashboardTitle = require('./DashboardTitle.js');
var Chart = require('./Chart.js');

var ChartCanvas = React.createClass({
  displayName: 'ChartCanvas',


  render: function render() {
    return React.createElement(
      'div',
      { id: 'page-wrapper' },
      React.createElement(DashboardTitle, { chartDetails: this.props.chartDetails }),
      React.createElement(Chart, { update: this.props.update, handler: this.props.handler, loc: this.props.loc })
    );
  }

});

module.exports = ChartCanvas;

},{"./Chart.js":6,"./DashboardTitle.js":8,"react":"react"}],8:[function(require,module,exports){
"use strict";

var React = require('react');

var DashboardTitle = React.createClass({
  displayName: "DashboardTitle",


  render: function render() {
    return React.createElement(
      "div",
      { className: "row" },
      React.createElement(
        "div",
        { className: "col-lg-12" },
        React.createElement(
          "h1",
          { id: "CityName", className: "page-header" },
          this.props.chartDetails
        )
      )
    );
  }

});

module.exports = DashboardTitle;

},{"react":"react"}],9:[function(require,module,exports){
'use strict';

var React = require('react');

var DeleteDashboard = React.createClass({
  displayName: 'DeleteDashboard',


  deleteDashboard: function deleteDashboard() {
    console.log(this.props.handler);
    $.ajax({
      url: 'http://localhost:3000/deletedash',
      type: 'POST',
      data: { cityName: this.props.handler.city, ip: this.props.handler.ip }, // or $('#myform').serializeArray()
      success: function success() {
        this.props.update();location.reload();
      }
    });
  },

  render: function render() {
    return React.createElement('i', { type: 'button', onClick: this.deleteDashboard, id: 'tooltip3', 'data-toggle': 'tooltip', title: 'Delete', 'data-container': 'body', className: 'fa fa-minus fa-fw ' });
  }

});

module.exports = DeleteDashboard;

},{"react":"react"}],10:[function(require,module,exports){
"use strict";

var React = require('react');

var LocationDashboard = React.createClass({
  displayName: "LocationDashboard",


  render: function render() {
    return React.createElement("i", { type: "button", onClick: this.props.loc, id: "tooltip1", "data-toggle": "tooltip", title: "My location", "data-container": "body", className: "fa fa-dot-circle-o fa-fw " });
  }

});

module.exports = LocationDashboard;

},{"react":"react"}],11:[function(require,module,exports){
'use strict';

var React = require('react');
var SideBar = require('./SideBar.js');

var NavBar = React.createClass({
  displayName: 'NavBar',


  render: function render() {
    return React.createElement(
      'nav',
      { className: 'navbar navbar-default navbar-static-top', role: 'navigation' },
      React.createElement(
        'div',
        { className: 'navbar-header' },
        React.createElement(
          'button',
          { type: 'button', className: 'navbar-toggle', 'data-toggle': 'collapse', 'data-target': '.navbar-collapse' },
          React.createElement(
            'span',
            { className: 'sr-only' },
            'Toggle navigation'
          ),
          React.createElement('span', { className: 'icon-bar' }),
          React.createElement('span', { className: 'icon-bar' }),
          React.createElement('span', { className: 'icon-bar' })
        ),
        React.createElement(
          'a',
          { className: 'navbar-brand', href: 'index.html' },
          'Weather Baba'
        )
      ),
      React.createElement(SideBar, { handle: this.props.handle })
    );
  }

});

module.exports = NavBar;

},{"./SideBar.js":13,"react":"react"}],12:[function(require,module,exports){
'use strict';

var React = require('react');

var SearchBar = React.createClass({
  displayName: 'SearchBar',

  componentWillMount: function componentWillMount() {
    console.log("in search");
    google.maps.event.addDomListener(window, 'load', intilize);
    var _this = this;
    function intilize() {
      var autocomplete = new google.maps.places.Autocomplete(document.getElementById('txtautocomplete'));
      google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
        var location = place.formatted_address;
        var lat = place.geometry.location.lat();
        var lng = place.geometry.location.lng();
        var city = place.address_components[0].long_name;
        var url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&" + "lon=" + lng + "&appid=14486129fdee1bec5bae028e7c3e3d2b";
        _this.props.handle(url, city, lat, lng);
      });
    }
  },

  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement('input', { type: 'text', id: 'txtautocomplete', className: 'form-control', placeholder: 'Search...' }),
      React.createElement('span', { className: 'input-group-btn' })
    );
  }

});

module.exports = SearchBar;

},{"react":"react"}],13:[function(require,module,exports){
'use strict';

var React = require('react');
var SearchBar = require('./Search.js');

var SideBar = React.createClass({
  displayName: 'SideBar',


  render: function render() {
    return React.createElement(
      'div',
      { className: 'navbar-default sidebar', role: 'navigation' },
      React.createElement(
        'div',
        { className: 'sidebar-nav navbar-collapse' },
        React.createElement(
          'ul',
          { className: 'nav', id: 'side-menu' },
          React.createElement(
            'li',
            { className: 'sidebar-search' },
            React.createElement(SearchBar, { handle: this.props.handle })
          ),
          React.createElement(
            'li',
            null,
            React.createElement(
              'a',
              { href: '#' },
              React.createElement('i', { className: 'fa fa-dashboard fa-fw' }),
              'Dashboard'
            )
          )
        )
      )
    );
  }

});

module.exports = SideBar;

},{"./Search.js":12,"react":"react"}],14:[function(require,module,exports){
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var browserHistory = require('react-router').browserHistory;
var App = require('./app.js');

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));

},{"./app.js":1,"react":"react","react-dom":"react-dom","react-router":"react-router"}]},{},[14])


//# sourceMappingURL=bundle.js.map
