import React,{Component} from 'react';
import TeamBuilderForm from './TeamBuilderForm';
import { connect } from 'react-redux';
import { teamConfirmed } from '../actions/teams';

class TeamBuilderFormContainer extends Component {
  constructor(props){
    super();
  }
  render(){
    return(
      <div className="team-builder-form-container">
        <div className="team-info-block">
          <img alt="Host" className="team-header-img" src={"/assets/host.jpeg"} />
          <h3> Host Team </h3>
          <TeamBuilderForm {...this.props} team="Host" />
        </div>
        <div className="team-info-block">
          <img alt="Guest" className="team-header-img" src={"/assets/guest.png"} />
          <h3> Guest Team </h3>
          <TeamBuilderForm {...this.props} team="Guest"/>
        </div>
      </div>
    )
  }
}

TeamBuilderFormContainer.propTypes = {
  teamConfirmed: React.PropTypes.func.isRequired
}

export default connect(null,{teamConfirmed})(TeamBuilderFormContainer);
