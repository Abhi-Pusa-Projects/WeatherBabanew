var React = require('react');

var DashboardTitle = React.createClass({

  render: function() {
    return (
      <div className="row">
        <div className="col-lg-12">
            <h1 id="CityName" className="page-header">{this.props.chartDetails}</h1>
        </div>
      </div>
    );
  }

});

module.exports = DashboardTitle;
