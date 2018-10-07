import React,{Component} from 'react';
import TeamBuilderFormContainer from './TeamBuilderFormContainer';
import MatchRecordFormContainer from './MatchRecordFormContainer';
import MatchSummaryForm from './MatchSummaryForm';

class MatchCreatePage extends Component {
  constructor(props){
    super();
    this.state = {
      currentStep: 1,
      totalStep: 3
    }
    this.changeStep = this.changeStep.bind(this);
    this.finishedStep = this.finishedStep.bind(this);
  }
  changeStep(e){
    e.preventDefault();
    if(this.state.currentStep == 1){
      let teams = this.props.teams;
      console.log(teams);
      if(teams.length != 0) {
        if(teams.Host == null) {
          alert("Host Team hasn't been built");
          return;
        }
        if(teams.Guest == null) {
          alert("Guest Team hasn't been built");
          return;
        }
        if(teams.Guest != null && teams.Host !== null) {
          if(teams.Guest.length != teams.Host.length) {
            alert("The amount of bost teams are not equal!");
            return;
          }
        }
      } else {
        alert("No Team has been built");
        return;
      }
    }
    this.setState({currentStep:this.state.currentStep + 1});
  }
  finishedStep(e){
    this.setState({currentStep: 1});
  }
  render(){
    switch (this.state.currentStep) {
      case 1:
        return(
          <div className="matches-create-page">
            <TeamBuilderFormContainer {...this.props}/>
            <div className="step-change-btn">
              <a className="button" onClick={this.changeStep}>NextStep</a>
            </div>
          </div>
        )
        break;
      case 2:
        return(
          <div className="matches-create-page">
            <MatchRecordFormContainer {...this.props} hostMember = {this.props.teams.Host} guestMember = {this.props.teams.Guest}/>
            <div className="step-change-btn">
              <a className="button" onClick={this.changeStep}>NextStep</a>
            </div>
          </div>
        )
        break;
      case 3:
        return(
          <div className="matches-create-page">
            <MatchSummaryForm {...this.props} hostMember = {this.props.teams.Host} guestMember = {this.props.teams.Guest}/>
            <div className="step-change-btn">
              <a className="button"  id="next-step" onClick={this.finishedStep}>Finished</a>
            </div>
          </div>
        )
        break;
    }
  }
}

export default MatchCreatePage;
