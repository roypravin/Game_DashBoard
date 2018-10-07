var mongoose = require('mongoose');

var PlayersSchema = new mongoose.Schema({
  playerName: String,
  matchRecords: [{
    matchTime: Date,
    isWinner: Boolean,
    scoreAmount: Number
  }],
  playerImgUrl: String,
  created: {type:Date,default:Date.now}
});

module.exports = mongoose.model('Players',PlayersSchema);
