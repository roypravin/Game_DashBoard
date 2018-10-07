import React,{Component} from 'react';

class MatchRecordForm extends Component {
  constructor(props){
    super();
    this.state = {
      teamMembers: [],
      scoreMinutes: 0,
      scoreSeconds: 0,
      scorePlayer: 0,
      matchDetail:[]
    }
    this.handleChange = this.handleChange.bind(this);
    this.playerChange = this.playerChange.bind(this);
    this.handleNewScoreSubmit = this.handleNewScoreSubmit.bind(this);
    this.handleConfirmed = this.handleConfirmed.bind(this);
  }
  componentDidMount(){
    this.setState({teamMembers:this.props.players});
  }
  handleChange(e){
    this.setState({[e.target.name]:e.target.value});
  }
  playerChange(e){
    this.setState({scorePlayer:e.target.value});
  }
  handleNewScoreSubmit(){
    if(parseInt(this.state.scoreMinutes) > 30 || (parseInt(this.state.scoreMinutes) == 30 && parseInt(this.state.scoreSeconds) > 0)) {
      alert("Game Duration should less than 30 mintues");
      return;
    }
    if(parseInt(this.state.scoreSeconds) >= 60) {
      alert("No more seconds in 1 mintue !");
      return;
    }
    var matchDetails = this.state.matchDetail;
    let scoreSeconds = parseInt(this.state.scoreMinutes) * 60 + parseInt(this.state.scoreSeconds);
    let thePlayer = parseInt(this.state.scorePlayer);
    var newScoreRecord = {
      scoreTime: scoreSeconds,
      scorePlayer: this.props.players[thePlayer]
    }
    matchDetails.push(newScoreRecord);
    this.setState({matchDetail: matchDetails});
  }
  handleConfirmed(){
    /* change state */
    this.props.scoreConfirmed(this.props.team,this.state.matchDetail);
    $("#"+this.props.team).hide();
  }
  render(){
    return(
      <div className="match-record-form">
        <h1>{this.state.matchDetail.length}</h1>
        <div id={this.props.team}>
          <p>Please add a score record</p>
          <div className="add-score-tool">
            <div className="form-group">
              <span className="form-label">Score Mintue:</span>
              <input type="number" name="scoreMinutes" onChange={this.handleChange} value={this.state.scoreMinutes} min="0" max="30"/>
            </div>
            <div className="form-group">
              <span className="form-label">Score Second:</span>
              <input type="number" name="scoreSeconds" onChange={this.handleChange} value={this.state.scoreSeconds} min="0" max="60"/>
            </div>
            <div className="form-group">
              <span className="form-label">Score Player:</span>
              <select onChange={this.playerChange}>
                {this.props.players.map((player,idx)=>{
                  return(
                    <option key={idx} value={idx}>{player.playerName}</option>
                  )
                })}
              </select>
            </div>
            <button onClick={this.handleNewScoreSubmit}>+</button>
          </div>
          <div className="all-scores-list">
            <ul className="all-scores">
            {this.state.matchDetail.map((score,idx)=>{
                let mintue = parseInt(score.scoreTime / 60);
                let second = score.scoreTime % 60;
                let time = mintue + ":" + second;
                return(
                  <li className="score-item" key={idx}>
                    <span className="score-name">{time}</span>
                    <span className="player-name">{score.scorePlayer.playerName}</span>
                  </li>
                )
              }
            )}
            </ul>
          </div>
        </div>
        <a className="button" onClick={this.handleConfirmed}>
          Confirm {this.props.team} Team Result
        </a>
      </div>
    )
  }
}

module.exports = MatchRecordForm;
