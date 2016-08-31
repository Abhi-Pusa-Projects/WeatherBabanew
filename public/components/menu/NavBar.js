var React = require('react');
var SideBar = require('./SideBar.js');

var NavBar = React.createClass({

  render: function() {
    return (
      <nav className="navbar navbar-default navbar-static-top" role="navigation">
        <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="index.html">Weather Baba</a>
        </div>
        <SideBar handle = {this.props.handle} dashboardItems={this.props.dashboardItems}/>
      </nav>
    );
  }

});

module.exports = NavBar;
