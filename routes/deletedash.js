var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var cityModel  = require('./citymodule');

router.post('/',function(req,res,next){

  mongoose.connect('mongodb://spburli25:102burli@ds019906.mlab.com:19906/citydatabase');
    
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
