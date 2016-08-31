var React = require('react');
var AddDashboard = require('./AddDashboard.js');
var LocationDashboard = require('./LocationDashboard.js');
var DeleteDashboard = require('./DeleteDashboard.js');
var Chart = React.createClass({

  render: function() {
    return (
      <div className="row">
          <div className="col-lg-12">
              <div className="panel panel-default">
                  <div className="panel-heading ">
                      <i className="fa fa-bar-chart-o fa-fw "></i> Chart
                      <div className="pull-right">
                          <div className="btn-group">
                            <LocationDashboard loc = {this.props.loc}/>
                            <AddDashboard update = {this.props.update} handler = {this.props.handler}/>
                            <DeleteDashboard update = {this.props.update} handler = {this.props.handler}/>
                          </div>
                      </div>
                  </div>
                  <div className="panel-body">
                    <svg width="960" height="350"></svg>
                  </div>
              </div>
          </div>
      </div>
    );
  }

});

module.exports = Chart;
