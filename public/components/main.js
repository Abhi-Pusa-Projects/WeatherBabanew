import React from 'react';
import ReactDOM  from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router';
import Navbar from './Navbar.js';


//Router app in react
class MainComponent extends React.Component{

    render(){
      return(
        <div>
          <Navbar/>
        </div>
      );
    }
}

ReactDOM.render((
   <Router history = {browserHistory}>
      <Route path = "/" component = {MainComponent}>
      </Route>
   </Router>
), document.getElementById('wrapper'));
