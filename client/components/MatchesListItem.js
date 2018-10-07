import React,{Component} from 'react';
import {convertDateString} from '../utils/DateHelper';
import ScoreLineChart from './ScoreLineChart';

class MatchesListItem extends Component {
  constructor(props){
    super();
  }
  render(){
    var match = this.props.match;
    let unsavedMatch = match._id == null;
    return(
      <div className="matches-list-item">
        <div className="matches-list-item-title">
          {match.matchTime != null? convertDateString(match.matchTime) : 'New Match'}
        </div>
        <div className="matches-list-item-content">
          <div className="matches-list-col">
            <img alt="Host" className="team-header-img" src={"/assets/host.jpeg"} />
            <h3> Host Team </h3>
            <div className="team-members">
              {match.hostTeamMember.map((player,idx)=>{
                return (
                  <p key={idx} className="player-name">{player.playerName}</p>
                )
              })}
            </div>
          </div>
          <div className="matches-list-col">
            <div className="score-bar">
              <h1 className="score-head"> {match.matchResult.hostScore} </h1>
              <h1 className="score-head"> - </h1>
              <h1 className="score-head"> {match.matchResult.guestScore} </h1>
            </div>
          </div>
          <div className="matches-list-col">
            <img alt="Guest" className="team-header-img" src={"/assets/guest.png"} />
            <h3> Guest Team </h3>
            <div className="team-members">
              {match.guestTeamMember.map((player,idx)=>{
                return (
                  <p key={idx} className="player-name">{player.playerName}</p>
                )
              })}
            </div>
          </div>
        </div>
        <div className="matches-list-item-score-timeline">
          {unsavedMatch ? (
            <div className="score-line-chart" />
          ) : (
            <ScoreLineChart id={match._id} startTime={match.matchTime} scoreRecord={match.matchDetail}/>
          )}
        </div>
      </div>
    )
  }
}

module.exports = MatchesListItem;
