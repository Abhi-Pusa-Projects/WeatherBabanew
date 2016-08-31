var React = require('react');

var Router = require('react-router');
var IndexRoute = Router.IndexRoute;
var Route = Router.Route;
var Redirect = Router.Redirect;

var routes = (
  <Route path="/" component={require('./app')}>
  </Route>
);

module.exports = routes;
