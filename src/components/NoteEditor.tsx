import React, { useReducer, useRef } from 'react';
import { EditorState, Editor, RichUtils } from 'draft-js';
import { NoteAction } from '../interfaces';
import Toolbar from './Toolbar';

// this is temporary
interface INote {
  title: string;
  note: EditorState;
}

const reducer = (state: INote, action: NoteAction) => {
  switch (action.type) {
    case 'updateTitle':
      return {
        ...state,
        title: action.payload,
      };

    case 'updateNote':
      return {
        ...state,
        note: action.payload,
      };

    default:
      return state;
  }
};

const NoteEditor: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, {
    title: 'My Note',
    note: EditorState.createEmpty(),
  });

  const setNote = (newNote: EditorState) => {
    dispatch({ type: 'updateNote', payload: newNote });
  };

  const handleKeyCommand = (command: string) => {
    const newNote = RichUtils.handleKeyCommand(state.note, command);
    if (newNote) {
      setNote(newNote);
      return 'handled';
    }
    return 'not-handled';
  };

  const editor = useRef<Editor>(null);

  return (
    <>
      <Toolbar state={state} dispatch={dispatch} />
      <div className='h-screen' onClick={() => editor.current?.focus()}>
        <Editor // needs styling
          ref={editor}
          editorState={state.note}
          onChange={setNote}
          handleKeyCommand={handleKeyCommand}
        />
      </div>
    </>
  );
};

export default NoteEditor;
