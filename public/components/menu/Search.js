var React = require('react');

var SearchBar = React.createClass({
  componentWillMount: function() {
    google.maps.event.addDomListener(window, 'load', intilize);
    var _this = this;
    function intilize()
    {
      var autocomplete = new google.maps.places.Autocomplete(document.getElementById('txtautocomplete'));
      google.maps.event.addListener(autocomplete, 'place_changed', function(){
        var place = autocomplete.getPlace();
        var location = place.formatted_address;
        var lat = place.geometry.location.lat();
        var lng = place.geometry.location.lng();
        var city = place.address_components[0].long_name;
        var url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&" + "lon=" + lng + "&appid=14486129fdee1bec5bae028e7c3e3d2b";
        _this.props.handle(url, city, lat, lng);
      });
    }
  },

  render: function() {
    return (
      <div>
          <input type="text" id="txtautocomplete" className="form-control" placeholder="Search..."/>
          <span className="input-group-btn" />
      </div>
    );
  }

});

module.exports = SearchBar;
