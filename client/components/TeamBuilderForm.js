import React,{Component} from 'react';
import axios from 'axios';

class TeamBuilderForm extends Component {
  constructor(props){
    super();
    this.state = {
      participants: [],
      playerName: '',
      existingParticipants: [],
      currentDisplayPlayer:0
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.removePlayer = this.removePlayer.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
    this.createPlayer = this.createPlayer.bind(this);
    this.handleConfirmed = this.handleConfirmed.bind(this);
    this.removeOthersPlayer = this.removeOthersPlayer.bind(this);
    this.previousPlayer = this.previousPlayer.bind(this);
    this.nextPlayer = this.nextPlayer.bind(this);
  }
  nextPlayer(){
    var playerIdx = this.state.currentDisplayPlayer + 1 >= this.state.existingParticipants.length ? 0 : this.state.currentDisplayPlayer + 1;
    this.setState({currentDisplayPlayer:playerIdx});
  }
  previousPlayer(){
    var playerIdx = this.state.currentDisplayPlayer - 1 < 0 ? this.state.existingParticipants.length : this.state.currentDisplayPlayer - 1;
    this.setState({currentDisplayPlayer:playerIdx});
  }
  componentDidMount(){
    var url = '/api/players';
    axios.get(url).then(
      (players) => {
          // console.log(players);
          this.setState({existingParticipants:players.data});
      }
    ).catch((err)=>{
      console.log(err);
    })
  }
  removeOthersPlayer(othersMember){
    var allPlayer = this.state.existingParticipants;
    for(let idx = 0; idx < othersMember.length; idx++){
      let targetName = othersMember[idx].playerName;
      allPlayer.find((player,index)=>{
          if(typeof(player)==='undefined') {
            return;
          } else if(player.playerName === targetName) {
            allPlayer.splice(index, 1);
          }
      });
    }
    return allPlayer;
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.teams !== this.props.teams) {
      if(nextProps.teams[this.props.team] == null) {
        switch (this.props.team) {
          case 'Host':
            var players = this.removeOthersPlayer(nextProps.teams['Guest']);
            this.setState({existingParticipants:players});
            this.setState({participants:[]});
            break;
          case 'Guest':
            var players = this.removeOthersPlayer(nextProps.teams['Host']);
            this.setState({existingParticipants:players});
            this.setState({participants:[]});
            break;
          default:
            break;
        }
      }
    }
  }
  createPlayer(){
    axios.get("https://randomuser.me/api/").then((userPayload)=>{
      let playerInfo = userPayload.data.results[0];
      var url = '/api/players';
      var postBody = {
        playerName: this.state.playerName,
        playerImgUrl: playerInfo.picture.medium
      };
      axios.post(url,postBody).then(
        (player) => {
            var players = this.state.participants;
            players.push(player.data);
            alert('Not exist or has been added');
            this.setState({participants:players});
        }
      ).catch((err)=>{
        alert(err.response.data.error);
      })
    }).catch((err)=>{
      console.log(err);
    });
  }
  removePlayer(e){
    var idx = e.target.id;
    var participants = this.state.participants;
    var leftPlayers = this.state.existingParticipants;
    leftPlayers.push(participants[idx]);
    participants.splice(idx, 1);
    this.setState({participants:participants});
    this.setState({existingParticipants:leftPlayers});
  }
  addPlayer(e){
    var idx = e.target.id;
    var participants = this.state.participants;
    var leftPlayers = this.state.existingParticipants;
    participants.push(leftPlayers[idx]);
    leftPlayers.splice(idx, 1);
    this.setState({participants:participants});
    this.setState({existingParticipants:leftPlayers});
    this.nextPlayer();
  }
  onSubmit(e){
    e.preventDefault();
    if(this.state.playerName.length == 0) {
      alert('Player Name is required');
      return;
    }
    this.createPlayer();
  }
  handleInputChange(e){
    this.setState({[e.target.name]:e.target.value});
  }
  handleConfirmed(){
    if(this.state.participants.length == 0){
      alert("Please Choose Player!");
      return;
    }
    /* change state */
    this.props.teamConfirmed(this.props.team,this.state.participants);
    /* hide all contents */
    let targetID = '#' + this.props.team;
    $(targetID + ' .all-players-list').hide();
    $(targetID + ' .create-user-form').hide();
    $(targetID + ' .player-list-title').hide();
    $(targetID + ' button').hide();
  }
  render(){
    var unSeletectedPlayer = this.state.existingParticipants;
    var selectSlideIdx = this.state.currentDisplayPlayer;
    var currentDisplayPlayer = unSeletectedPlayer[selectSlideIdx];
    return(
      <div className="team-builder-form" id={this.props.team}>
        <div className="create-user-form">
          <form onSubmit={this.onSubmit}>
            <div className='form-group'>
              <label className="form-label">Player Name:</label>
              <input
                type="text"
                name="playerName"
                onChange={this.handleInputChange}
                value={this.state.playerName}/>
              <button className="add-button">+</button>
            </div>
          </form>
        </div>
        <p className="player-list-title">All Available Players</p>
        <div className="all-players-list">
          <div className="player-item">
            <button onClick={this.previousPlayer}><i className="fa fa-arrow-left" aria-hidden="true"></i></button>
            <div className="player-image-grid">
              <img src={currentDisplayPlayer == null ? '' : currentDisplayPlayer.playerImgUrl} id={this.state.currentDisplayPlayer} onClick={this.addPlayer}/>
              <p className="player-name">{currentDisplayPlayer == null ? '' : currentDisplayPlayer.playerName}</p>
            </div>
            <button onClick={this.nextPlayer}><i className="fa fa-arrow-right" aria-hidden="true"></i></button>
          </div>
        </div>
        <p className="player-list-title">All Team Members {this.props.team} Team</p>
        <div className="team-members-list">
          <ul className="team-members">
          {this.state.participants.map((player,idx)=>{
              return(
                <li className="member-item" key={idx}>
                  <span className="player-name">{player.playerName}</span>
                  <button className="remove-button" id={idx} onClick={this.removePlayer}>-</button>
               </li>
              )
            }
          )}
          </ul>
        </div>
        <p className="team-member-amount">Totally {this.state.participants.length} players in {this.props.team} Team.</p>
        <a className="button" onClick={this.handleConfirmed}>
          Confirm {this.props.team} Team
        </a>
      </div>
    )
  }
}

module.exports = TeamBuilderForm;
