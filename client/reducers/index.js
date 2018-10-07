import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import scores from './scores';
import teams from './teams';

const rootReducer = combineReducers({
  teams,
  scores,
  routing:routerReducer
});

exports = module.exports = rootReducer;
