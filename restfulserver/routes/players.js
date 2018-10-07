const express = require('express');
const Players = require('../models/players');

var playersAPIRouter = express.Router();
function checkUserExist(playerName) {
  var promise = Players.findOne({playerName:playerName}).exec();
  return promise;
}

playersAPIRouter.get('/',function(req,res,next){
  Players.find({},'playerName matchRecords playerImgUrl _id',function(err,players){
    if(err) return next(err);
    res.json(players);
  })
});

playersAPIRouter.post('/rate',function(req,res,next){


});

playersAPIRouter.post('/',function(req,res,next){
  var player = checkUserExist(req.body.playerName);
  player.then(function(user){
    if(user === null) {
      Players.create(req.body,function(err,player){
        if(err) return next(err);
        res.json(player);
      });
    } else {
      res.status(403);
      res.json({error:'Player exist, please add him from available list.'});
    }
  }).catch(function(error){
    console.log(error);
  });
});

module.exports = playersAPIRouter;
