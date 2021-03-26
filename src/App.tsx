import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import NoteEditor from './components/NoteEditor';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path='/:id' children={<NoteEditor />} />
        <Route path='/' children={<Home />} />
      </Switch>
    </Router>
  );
};

export default App;
