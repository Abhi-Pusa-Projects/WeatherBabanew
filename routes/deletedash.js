var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var cityModel  = require('./citymodule');

router.post('/',function(req,res,next){

    mongoose.connect("mongodb://127.0.0.1:27017/cityDatabase");
    
    cityModel.remove(req.body,function(err){
      if(!err){
        mongoose.connection.close();
        res.end("data deleted successfully");
      }
      else{
        mongoose.connection.close();
        res.end("data not removed");
      }
    })
});

module.exports = router;
