import React,{Component} from 'react';
import TeamBuilderForm from './TeamBuilderForm';
import { connect } from 'react-redux';
// import { clearTeams } from '../actions/teams';
// import { clearScores } from '../actions/teams';
import MatchesListItem from './MatchesListItem';
import axios from 'axios';

class MatchSummaryForm extends Component {
  constructor(props){
    super();
    this.state = {
      hostTeamMember: [],
      guestTeamMember: [],
      matchDetail:[],
      matchResult: {
        hostScore: 0,
        guestScore: 0,
        winner: []
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    $("#next-step").hide();
    let hostScore = this.props.scores.Host.length;
    let guestScore = this.props.scores.Guest.length;
    let winner = this.props.hostMember;
    winner = hostScore > guestScore ? this.props.hostMember : this.props.guestMember;
    let scoreDetail = this.props.scores.Host;
    this.props.scores.Guest.map((guestDetail,idx)=>{
      scoreDetail.push(guestDetail);
    })
    this.setState({
      hostTeamMember: this.props.hostMember,
      guestTeamMember: this.props.guestMember,
      matchDetail:scoreDetail,
      matchResult: {
        hostScore: hostScore,
        guestScore: guestScore,
        winner: winner
      }
    });
  }
  handleSubmit(e){
    e.preventDefault();
    let url = '/api/matches';
    axios.post(url,this.state).then(
      (match) => {
        this.setState({_id:match.data._id,matchTime:match.data.matchTime});
        $("#confirm-button").hide();
        $("#next-step").show();
      }
    ).catch((err)=>{
      alert(err.response.data.error);
    })
  }
  shouldComponentUpdate(nextProps,nextState){
    if(nextState._id !== this.state._id) {
      alert("New Game Result Has Been Created!");
    }
    return true;
  }
  render(){
    if(this.state != null) {
      return(
        <div className="match-summary-form">
          <MatchesListItem match={this.state} />
          <a className="button" id="confirm-button" onClick={this.handleSubmit}>Confirm Result</a>
        </div>
      )
    }
    return(
      <div className="match-summary-form">
      </div>
    )
  }
}

export default MatchSummaryForm;
