import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated } from './util/wrappers.js'

// Layouts
import App from './App'
import Home from './layouts/home/Home'
import Dashboard from './layouts/dashboard/Dashboard'
import Profile from './user/layouts/profile/Profile'
import DashboardLeftNav from './layouts/dashboard/DashboardLeftNav'
import Proposals from './layouts/dashboard/Proposals'
import Donate from './layouts/dashboard/Donate'
import DashboardContainer from './layouts/dashboard/DashboardLeftNav2'
import ProposalDetail from './layouts/dashboard/ProposalDetail'

// Redux Store
import store from './store'

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="dashboard" component={Dashboard} />
          <Route path="profile" component={UserIsAuthenticated(Profile)} />
          <Route path="proposals" component={UserIsAuthenticated(Proposals)} />
          <Route path="proposal/:index" component={ProposalDetail} />
          <Route path="donate" component={Donate} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
)
