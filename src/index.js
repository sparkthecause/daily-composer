import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
import App from './App';
import Editions from './containers/Editions';
import Edition from './containers/Edition';
import './index.css';

const client = new ApolloClient({
  dataIdFromObject: (result) => {
    if (result.id && result.__typename) {
      return result.__typename + result.id;
    }
    return null;
  },
  networkInterface: createNetworkInterface({ uri: 'http://localhost:3002/graphql' }),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <Route path="/editions" component={Editions}>
          <Route path="/editions/:editionId" component={Edition} />
        </Route>
      </Route>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
