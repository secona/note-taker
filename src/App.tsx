import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Note from './components/Note';
import NoteEditor from './components/NoteEditor';
import NoteGrid from './components/NoteGrid';
import { getAllData } from './lib/db';
import { INote } from './NoteReducer';

const App: React.FC = () => {
  const [data, setData] = useState<INote[]>();
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
            {data?.map((note: INote) => (
              <Note note={note} />
            ))}
          </NoteGrid>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
