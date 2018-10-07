import React,{Component} from 'react';
import CompareLineChart from './CompareLineChart';

class PlayerInfoGrid extends Component {
  constructor(props){
    super();
    this.state = {
      comparedWith: 0
    }
    this.selectComparedPlayer = this.selectComparedPlayer.bind(this);
    this.getPlayerWinRate = this.getPlayerWinRate.bind(this);
  }
  selectComparedPlayer(e){
    this.setState({comparedWith:e.target.value});
  }
  getPlayerWinRate(playerId){
    var playerMatchResult = {
      winTime:0,
      scoreAmount:0,
      matchTime:0,
      currentRate: 0,
      winRateByTime: new Array()
    }
    this.props.matches.map((match,idx)=>{
      var currentWinRate = {
        rate: 0,
        time: match.matchTime
      }
      match.matchDetail.map((score,idx)=>{
        if(score.scorePlayer._id == playerId){
          playerMatchResult.scoreAmount++;
        }
      });
      match.matchResult.winner.map((winner,idx)=>{
        if(playerId == winner._id){
          playerMatchResult.winTime++;
        }
      });
      match.guestTeamMember.map((player,idx)=>{
        if(playerId == player._id){
          playerMatchResult.matchTime++;
          currentWinRate.rate = parseInt(playerMatchResult.winTime / playerMatchResult.matchTime * 100);
          playerMatchResult.winRateByTime.push(currentWinRate);
        }
      });
      match.hostTeamMember.map((player,idx)=>{
        if(playerId == player._id){
          playerMatchResult.matchTime++;
          currentWinRate.rate = parseInt(playerMatchResult.winTime / playerMatchResult.matchTime * 100);
          playerMatchResult.winRateByTime.push(currentWinRate);
        }
      });
    });
    playerMatchResult.currentRate = parseInt(playerMatchResult.winTime / playerMatchResult.matchTime * 100);
    return playerMatchResult;
  }
  render(){
    let comparedPlayer = this.props.others[this.state.comparedWith];
    let playerRate = this.getPlayerWinRate(this.props.player._id);
    let comparedPlayerRate = this.getPlayerWinRate(comparedPlayer._id);
    return(
      <div className="player-info-grid">
        <div className="info-grid-content">
          <div className="info-grid-content-col">
            <div id="player-info">
              <img className="player-image" src={this.props.player.playerImgUrl} />
              <p className="player-name">{this.props.player.playerName}</p>
              <p className="player-score-amount">
                <span className="detail-lable">Total Score Amout:</span>
                <strong>{playerRate.scoreAmount}</strong>
              </p>
              <p className="player-win-rate">
                <span className="detail-lable">Total Win Rate:</span>
                <strong>{playerRate.currentRate + '%'}</strong>
              </p>
            </div>
          </div>
          <div className="info-grid-content-col">
            <div id="compared-select-group">
              <img className="player-image" src={comparedPlayer.playerImgUrl} alt="compared-player" />
              <select className="compare-selector" onChange={this.selectComparedPlayer}>
                {this.props.others.map((player,idx)=>{
                  return (
                    <option key={idx} value={idx}>{player.playerName}</option>
                  )
                })}
              </select>
              <p className="player-score-amount">
                <span className="detail-lable">Total Score Amout:</span>
                <strong>{comparedPlayerRate.scoreAmount}</strong>
              </p>
              <p className="player-win-rate">
                <span className="detail-lable">Total Win Rate:</span>
                <strong>{comparedPlayerRate.currentRate + '%'}</strong>
              </p>
            </div>
          </div>
          <CompareLineChart
            player={this.props.player}
            playerRate={playerRate.winRateByTime}
            comparedWith={comparedPlayer}
            comparedPlayerRate={comparedPlayerRate.winRateByTime}
          />
        <div className="clear" />
        </div>
      </div>
    )
  }
}

module.exports = PlayerInfoGrid;
