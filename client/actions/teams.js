import axios from 'axios';
import { browserHistory } from 'react-router';
import store from '../store';

export function teamConfirmed(team,teamMembers){
  if(team == 'Host') {
    return {
      type: "HOST_TEAM_CONFIRMED",
      teamMembers
    }
  } else {
    return {
      type: "GUEST_TEAM_CONFIRMED",
      teamMembers
    }
  }
}
