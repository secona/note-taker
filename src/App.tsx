import { EditorState } from 'draft-js';
import React, { useReducer } from 'react';
import NoteEditor from './components/NoteEditor';
import NoteGrid from './components/NoteGrid';
import { NoteContext } from './NoteContext';
import { INotes, NoteReducer } from './NoteReducer';

const initialState: INotes = {
  selectedNote: '',
  notes: {
    RXhJkIxXHiaYzK1: { title: 'My Note', note: EditorState.createEmpty() },
    Ujs9Om7GUh2bW3k: {
      title: 'My Other Note',
      note: EditorState.createEmpty(),
    },
  },
};

const App: React.FC = () => {
  const [state, dispatch] = useReducer(NoteReducer, initialState);
  return (
    <NoteContext.Provider value={{ state, dispatch }}>
      {state.selectedNote === '' ? <NoteGrid /> : <NoteEditor />}
    </NoteContext.Provider>
  );
};

export default App;
