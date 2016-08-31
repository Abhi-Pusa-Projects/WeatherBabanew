var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var CityModel = require('./citymodule');

router.post('/',function(req,res,next){
  var flag =0;

  mongoose.connect('mongodb://127.0.0.1:27017/cityDatabase');
  var newCity = CityModel(req.body);
  CityModel.find({ip:req.body.ip,cityName:req.body.cityName},function(err,data){
    if(err){
      mongoose.connection.close();
      res.end("not able to fetch data");
    }
    else
    {
      if(data.length===0 || data === null || data === undefined)
      {
        CityModel.find({ip:req.body.ip},function(err,data){
          if(err){
            mongoose.connection.close();
            res.end("now able to fetch data");
          }else{
            if(data.length===10){
            mongoose.connection.close();
              res.end("already added 10 dashboards");
            }else{
              newCity.save(function(err){
                if(err){

                  mongoose.connection.close();
                  res.end("data not added successfully");
                }else{

                  mongoose.connection.close();
                  res.end("dashboard added successfully");
                }
              });
            }
          }
        });
      }
      else
      {
      
        mongoose.connection.close();
        res.end("data is already available");
      }
    }
  });
});


module.exports = router;
