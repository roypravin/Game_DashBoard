import axios from 'axios';
import { browserHistory } from 'react-router';

export function scoreConfirmed(team,scoreDetails){
  if(team == 'Host'){
    return {
      type: "HOST_SCORE_COMFIRMED",
      scoreDetails
    }
  } else {
    return {
      type: "GUEST_SCORE_COMFIRMED",
      scoreDetails
    }
  }
}
