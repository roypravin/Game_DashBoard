function teams(state=[],action) {
  switch(action.type) {
    case 'HOST_TEAM_CONFIRMED':
      return {
        ...state,
        Host: action.teamMembers
      }
    case 'GUEST_TEAM_CONFIRMED':
      return {
        ...state,
        Guest: action.teamMembers
      }
    default:
      return state;
  }
}

exports = module.exports = teams;
