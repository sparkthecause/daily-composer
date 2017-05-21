import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import App from './App';
import Editions from './containers/Editions';
import Edition from './containers/Edition';
import './index.css';

const apiUrl = process.env.NODE_ENV === "development"
  ? 'http://localhost:3002/graphql'
  : 'https://daily-api.sparkthecause.com/graphql';

const logout = () => {
  browserHistory.push('/');
  // client.resetStore();
};

const networkInterface = createNetworkInterface({ uri: apiUrl });

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }
    const creds = localStorage.getItem('creds');
    req.options.headers.authorization = creds ? `Basic ${creds}` : null;
    next();
  }
}]);

networkInterface.useAfter([{
  applyAfterware({ response }, next) {
    if (response.status === 401) {
      logout();
    }
    next();
  }
}]);

const client = new ApolloClient({
  dataIdFromObject: (result) => {
    if (result.id && result.__typename) {
      return result.__typename + result.id;
    }
    return null;
  },
  networkInterface
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/editions" component={Editions}>
          <Route path="/editions/:publishDate" component={Edition} />
        </Route>
      </Route>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
