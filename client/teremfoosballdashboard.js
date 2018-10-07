import React from 'react';
import {render} from 'react-dom';

import App from './App';
import DashBoard from './components/DashBoard';
import MatchesListPage from './components/MatchesListPage';
import PlayersListPage from './components/PlayersListPage';
import PlayersSinglePage from './components/PlayersSinglePage';
import MatchCreatePage from './components/MatchCreatePage';

// import dependencies
import { Router,Route,IndexRoute,browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, {history} from './store';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={MatchCreatePage}></IndexRoute>
        <Route path='/matches' component={MatchesListPage}></Route>
        <Route path='/players' component={PlayersListPage}></Route>
        <Route path='/players/:id' component={PlayersSinglePage}></Route>
      </Route>
    </Router>
  </Provider>
)

const componentsMountDom = document.getElementById('root');
render(router,componentsMountDom);
