import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NoteCard from './components/NoteCard';
import NoteEditor from './components/NoteEditor';
import NoteGrid from './components/NoteGrid';
import { getAllData, Data } from './lib/db';

const App: React.FC = () => {
  const [data, setData] = useState<Data>({});
  useEffect(() => {
    const response = getAllData();
    setData(response);
  }, []);

  return (
    <Router>
      <Switch>
        <Route path='/:id'>
          <NoteEditor />
        </Route>
        <Route path='/'>
          <NoteGrid>
            {Object.keys(data).map((key: string) => (
              <NoteCard id={key} note={data[key]} />
            ))}
          </NoteGrid>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
