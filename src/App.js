import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Layout from './hoc/Layout';
import Home from './components/Home';

const App = props => {
    return (
      <Layout>
        <Switch>
          <Route exact component={Home} path="/" />
        </Switch>
      </Layout>
    );
}

export default App;
