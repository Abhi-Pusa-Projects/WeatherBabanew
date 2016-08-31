var React = require('react');

var DashboardItem = React.createClass({
    dashboardClick:function(){
        this.props.handle(this.props.dashboardItemDetails.url,this.props.dashboardItemDetails.cityName,this.props.dashboardItemDetails.lat,this.props.dashboardItemDetails.lng);
    },

    render: function() {
      return (
        <li>
          <a href="#" onClick={this.dashboardClick}>{this.props.dashboardItemDetails.cityName}</a>
        </li>
      );
    }
});

module.exports = DashboardItem;
