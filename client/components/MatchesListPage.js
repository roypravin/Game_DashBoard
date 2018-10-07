import React,{Component} from 'react';
import axios from 'axios';
import  { Link } from 'react-router';
import MatchesListItem from './MatchesListItem';

class MatchesListPage extends Component {
  constructor(props){
    super();
    this.state = {
      matches: []
    }
  }
  componentDidMount() {
    let url = '/api/matches';
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
      <div className="matches-list-page">
        <ul className="matches-list">
          {this.state.matches.map((match,idx) => {
            // let singleUrl = '/matches/' + match._id;
            return (
              <li key={idx} className="matches-list-item">
                <MatchesListItem match={match}/>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

module.exports = MatchesListPage;
