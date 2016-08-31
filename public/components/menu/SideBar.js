var React = require('react');
var SearchBar = require('./Search.js');

var SideBar = React.createClass({

  render: function() {
    return (
      <div className="navbar-default sidebar" role="navigation">
          <div className="sidebar-nav navbar-collapse">
              <ul className="nav" id="side-menu">
                  <li className="sidebar-search">
                    <SearchBar handle = {this.props.handle}/>
                  </li>
                  <li>
                      <a href="#"><i className="fa fa-dashboard fa-fw"></i>Dashboard</a>
                  </li>
                  {this.props.dashboardItems}
              </ul>
          </div>
      </div>
    );
  }

});

module.exports = SideBar;
