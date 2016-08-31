var React = require('react');
var DashboardTitle = require('./DashboardTitle.js');
var Chart = require('./Chart.js');

var ChartCanvas = React.createClass({

  render: function() {
    return (
      <div id="page-wrapper">
        <DashboardTitle chartDetails = {this.props.chartDetails}/>
        <Chart update = {this.props.update} handler = {this.props.handler} loc = {this.props.loc}/>
      </div>
    );
  }

});

module.exports = ChartCanvas;
