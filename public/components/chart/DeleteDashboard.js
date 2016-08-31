var React = require('react');

var DeleteDashboard = React.createClass({

    deleteDashboard: function() {
    $.ajax({
    url: 'http://localhost:3000/deletedash',
    type: 'POST',
    data: {cityName:this.props.handler.city,ip:this.props.handler.ip}, // or $('#myform').serializeArray()
    success: function() { this.props.update();  }.bind(this)
  });
  },

  render: function() {
    return (
      <i type="button" onClick={this.deleteDashboard} id="tooltip3" data-toggle="tooltip" title="Delete" data-container="body" className="fa fa-minus fa-fw "></i>
    );
  }

});

module.exports = DeleteDashboard;
