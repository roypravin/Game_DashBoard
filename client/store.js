import { createStore, compose, applyMiddleware} from 'redux';
import { syncHistoryWithStore,routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import logger from 'redux-logger';
import rootReducer from './reducers/index';

const middleWare = applyMiddleware(promise(),thunk,logger,routerMiddleware(browserHistory)); //logger,userMiddleware,routerMiddleware
//const store = createStore(rootReducer,defaultStates,middleWare);
const composeEnhancers = compose;

const defaultState = sessionStorage.getItem('reduxState') ? JSON.parse(sessionStorage.getItem('reduxState')) : {};

const store = createStore(rootReducer, defaultState, composeEnhancers(middleWare));

/* fatching deault data */

export const history = syncHistoryWithStore(browserHistory,store);

export default store;
