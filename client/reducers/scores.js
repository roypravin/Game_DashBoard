function scores(state=[],action) {
  switch(action.type) {
    case 'HOST_SCORE_COMFIRMED':
      return {
        ...state,
        Host: action.scoreDetails
      }
    case 'GUEST_SCORE_COMFIRMED':
      return {
        ...state,
        Guest: action.scoreDetails
      }
    default:
      return state;
  }
}

exports = module.exports = scores;
