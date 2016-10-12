import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
import App from './App';
import Editions from './containers/Editions';
import Edition from './containers/Edition';
import './index.css';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/editions" component={Editions}>
        <Route path="/editions/:publishDate" component={Edition} />
      </Route>
    </Route>
  </Router>,
  document.getElementById('root')
);
