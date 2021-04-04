import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '@pages/Home';
import Editor from '@pages/Editor';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path='/:id' children={<Editor />} />
        <Route path='/' children={<Home />} />
      </Switch>
    </Router>
  );
};

export default App;
