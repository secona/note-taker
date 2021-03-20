import { EditorState } from 'draft-js';
import React, { useReducer } from 'react';
import NoteEditor from './components/NoteEditor';
import NoteGrid from './components/NoteGrid';
import { NoteContext } from './NoteContext';
import { INotes, NoteReducer } from './NoteReducer';

const initialState: INotes = {
  selectedNote: null,
  notes: [{ title: 'My Note', note: EditorState.createEmpty() }],
};

const App: React.FC = () => {
  const [state, dispatch] = useReducer(NoteReducer, initialState);
  return (
    <NoteContext.Provider value={{ state, dispatch }}>
      {state.selectedNote === null ? <NoteGrid /> : <NoteEditor />}
    </NoteContext.Provider>
  );
};

export default App;
