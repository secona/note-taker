import React, { useReducer, useRef } from 'react';
import { EditorState, Editor, RichUtils, DraftStyleMap } from 'draft-js';
import { NoteReducer } from '../NoteReducer';
import Toolbar from './Toolbar';
import '../NoteEditor.css';

const styleMap: DraftStyleMap = {
  STRIKETHROUGH: { textDecoration: 'line-through' },
  HIGHLIGHT: { backgroundColor: '#FFFF00' },
};

const NoteEditor: React.FC = () => {
  const [state, dispatch] = useReducer(NoteReducer, {
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
          customStyleMap={styleMap}
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
