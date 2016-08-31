var mongoose = require('mongoose');

var Schema = mongoose.Schema({
    cityName : String,
    lng : String,
    lat : String,
    ip:String
});

var City = mongoose.model('city_details',Schema,'city_details');

module.exports = City;
