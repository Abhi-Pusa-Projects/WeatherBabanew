var React = require('react');

var AddDashboard = React.createClass({

    addDashboard: function() {
    $.ajax({
    url: 'http://localhost:3000/addnewdash',
    type: 'POST',
    data: {cityName:this.props.handler.city,lat:this.props.handler.lat,lng:this.props.handler.lng,ip:this.props.handler.ip}, // or $('#myform').serializeArray()
    success: function() {
      this.props.update();}.bind(this)
    });
  },

  render: function() {
    return (
      <i type="button" onClick={this.addDashboard} id="tooltip2" data-toggle="tooltip" title="Add" data-container="body" className="fa fa-plus fa-fw "></i>
    );
  }

});

module.exports = AddDashboard;
