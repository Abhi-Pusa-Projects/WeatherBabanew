var React = require('react');

var LocationDashboard = React.createClass({

  render: function() {
    return (
      <i type="button" onClick={this.props.loc} id="tooltip1" data-toggle="tooltip" title="My location" data-container="body" className="fa fa-dot-circle-o fa-fw "></i>
    );
  }

});

module.exports = LocationDashboard;
