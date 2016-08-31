
var React = require('react');
var ReactDOM = require('react-dom');

var Navbar = React.createClass({
      render : function(){
        return(
              <div>
                   <nav className="navbar navbar-default navbar-static-top" role="navigation" >
                     <div className="navbar-header">
                       <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                           <span className="sr-only">Toggle navigation</span>
                           <span className="icon-bar"></span>
                           <span className="icon-bar"></span>
                           <span className="icon-bar"></span>
                       </button>
                       <a className="navbar-brand" href="#">Weather Baba</a>
                     </div>
                   </nav>
                </div>
        );
      }

});

module.exports = Navbar;
