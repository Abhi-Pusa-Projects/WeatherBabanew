var React = require('react');
var NavBar = require('./components/menu/NavBar.js');
var ChartCanvas = require('./components/chart/ChartCanvas.js');
var rawtoactualdataconverter = require('./components/action/data_converter.js');
var DashboardItem=require('./components/menu/DashboardItem.js');
var App = React.createClass({
    getInitialState: function() {
      return {
        ip:"",
        url:"",
        lat:"",
        lng:"",
        city:"",
        data:"",
        dashboardItems:[]
      };
    },
    searchData: function(url){
      return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson,
        }, function(){
          rawtoactualdataconverter(responseJson);
        })
      })
    },
    handleChange: function(gURL, gCity, gLat, gLng) {

      this.setState({
        url:gURL,
        city:gCity,
        lat:gLat,
        lng:gLng
      },function () {
        this.searchData(this.state.url);
      });
    },
    myLocation: function(){
      var _this = this;
       fetch('http://freegeoip.net/json/')
        .then((response) => response.json())
        .then((responseJson) => {
          var curURL = 'http://api.openweathermap.org/data/2.5/forecast/city?'+"lat=" + responseJson.latitude + "&" + "lon=" + responseJson.longitude +'&APPID=bfbfccb0b8cb44018d9282c12bb57409';
          _this.setState({
            ip: responseJson.ip
          },function(){
          localStorage.setItem('myLocation',JSON.stringify({
              url:curURL,
              city:responseJson.city,
              lat:responseJson.latitude,
              lng:responseJson.longitude
            }));
              _this.updateDashboard();
          })
        });
      },
      defaultLocation:function(){
        var myLocation=JSON.parse(localStorage.getItem('myLocation'));
        this.handleChange(myLocation.url,myLocation.city, myLocation.lat, myLocation.lng );
      },
      updateDashboard: function(){
        var url1 = 'http://localhost:3000/getdash';
        this.defaultLocation();
        $.post(url1,{ip:this.state.ip},function(data){

          this.populatedashboard(data);
        }.bind(this));
      },
      populatedashboard:function(data){
        var json_data = JSON.parse(data);
          var dashboardItems=[];
        for(var i=0;i<json_data.length;i++){

          var dashboardItemDetails={
            cityName:json_data[i].cityName,
            lat:json_data[i].lat,
            lng:json_data[i].lng,
            url: "http://api.openweathermap.org/data/2.5/forecast?lat=" + json_data[i].lat + "&" + "lon=" + json_data[i].lng + "&appid=14486129fdee1bec5bae028e7c3e3d2b"
        }
          dashboardItems.push(<DashboardItem dashboardItemDetails={dashboardItemDetails} handle={this.handleChange}/>);
        }
        this.setState({
          dashboardItems: dashboardItems
        });
      },
    componentWillMount: function() {
      var _this = this;
      _this.myLocation();

    },
    render: function(){
        return (
            <div>
              <NavBar handle = {this.handleChange} dashboardItems={this.state.dashboardItems}/>
              <ChartCanvas update = {this.updateDashboard} handler = {this.state} loc = {this.defaultLocation} chartDetails = {this.state.city}/>
            </div>
        );
    }
});

module.exports = App;
