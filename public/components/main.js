import React from 'react';
import ReactDOM  from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router';


//Router app in react
class MainComponent extends React.Component{

    render(){
      return(
        <h1>Hello World</h1>
      );
    }
}

ReactDOM.render((
   <Router history = {browserHistory}>
      <Route path = "/" component = {MainComponent}>
      </Route>
   </Router>
), document.getElementById('wrapper'));
