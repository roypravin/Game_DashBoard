const express = require('express');
var matchesAPIRouter = express.Router();
const Matches = require('../models/matches');
const Players = require('../models/players');

matchesAPIRouter.post('/',function(req,res,next){
  Matches.create(req.body,function(err,match){
    if(err) return next(err);
    res.json(match);
  });
});

matchesAPIRouter.get('/',function(req,res,next){
  Matches.find().sort('-matchTime').exec(function(err,matches){
    if(err) return next(err);
    res.json(matches);
  });
});

matchesAPIRouter.get('/score',function(req,res,next){
  Matches.find().exec(function(err,matches){
    if(err) return next(err);
    res.json(matches);
  });
});

matchesAPIRouter.get('/:id',function(req,res,next){
  let findMatch = Matches.findById(req.params.id).exec();
  findMatch.then((match,err)=>{
      if(err) return next(err);
      /* update user record when a match created */
      let playerInMatch = new Array();
      match.guestTeamMember.map((player,idx)=>{
        playerInMatch.push(player);
      });
      match.hostTeamMember.map((player,idx)=>{
        playerInMatch.push(player);
      });
      var promises = playerInMatch.map(function(player,idx){
        return Players.findById(player._id,'playerName _id').then(function(thePlayer){
           return thePlayer
        })
      });
      Promise.all(promises).then(function(results) {
          res.json(playerInMatch);
          console.log(results);
      });
      console.log(123);
  });
});

module.exports = matchesAPIRouter;
