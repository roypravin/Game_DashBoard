var mongoose = require('mongoose');

var MatchesSchema = new mongoose.Schema({
  matchDutation: {type: Number, default: 1800},
  hostTeamMember: [{
    _id: String,
    playerName: String
  }],
  guestTeamMember: [{
    _id: String,
    playerName: String
  }],
  matchDetail:[
    {
      scoreTime: Number,
      scorePlayer: {
        _id: String,
        playerName: String
      }
    }
  ],
  matchResult: {
    hostScore: Number,
    guestScore: Number,
    winner: [{
      _id: String,
      playerName: String
    }]
  },
  matchTime : {type: Date, default: Date.now}
});

module.exports = mongoose.model('Matches',MatchesSchema);
