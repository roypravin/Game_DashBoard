import React,{Component} from 'react';
import MatchRecordForm from './MatchRecordForm';
import { connect } from 'react-redux';
import { scoreConfirmed } from '../actions/scores';

class MatchRecordFormContainer extends Component {
  constructor(props){
    super();
  }
  render(){
    return(
      <div className="team-builder-form-container">
        <div className="team-info-block">
          <img alt="Host" className="team-header-img" src={"/assets/host.jpeg"} />
          <h3> Host Team </h3>
          <MatchRecordForm scoreConfirmed={this.props.scoreConfirmed} players={this.props.hostMember} team="Host" />
        </div>
        <div className="team-info-block">
          <img alt="Guest" className="team-header-img" src={"/assets/guest.png"} />
          <h3> Guest Team </h3>
          <MatchRecordForm scoreConfirmed={this.props.scoreConfirmed} players={this.props.guestMember} team="Guest"/>
        </div>
      </div>
    )
  }
}

MatchRecordFormContainer.propTypes = {
  scoreConfirmed: React.PropTypes.func.isRequired
}

export default connect(null,{scoreConfirmed})(MatchRecordFormContainer);
