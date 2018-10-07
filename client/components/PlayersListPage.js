import React,{Component} from 'react';
import  { Link } from 'react-router';
import axios from 'axios';
import PlayerInfoGrid from './PlayerInfoGrid';

class PlayersListPage extends Component {
  constructor(props){
    super();
    this.state = {
      players:[],
      matches:[]
    }
  }
  componentDidMount() {
    let url = '/api/players';
    axios.get(url).then(
      (playersPayload)=>{
        this.setState({players:playersPayload.data});
      }
    ).catch((err)=>{
      console.log(err);
    });
    url = '/api/matches/score';
    axios.get(url).then(
      (matchesPayload)=>{
        this.setState({matches:matchesPayload.data});
      }
    ).catch((err)=>{
      console.log(err);
    });
  }
  render(){
    return(
      <div className="players-list-page">
        {this.state.players.map((player,idx) => {
          var others = new Array();
          this.state.players.map((player)=>{
            others.push(player);
          });
          others.splice(idx,1);
          return (
            <PlayerInfoGrid key={idx} matches={this.state.matches} player={player} others={others}/>
          )
        })}
        <div className="clear"></div>
      </div>
    )
  }
}

module.exports = PlayersListPage;
