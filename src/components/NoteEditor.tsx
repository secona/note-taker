import React, { useEffect, useReducer, useRef } from 'react';
import { EditorState, Editor, RichUtils, DraftStyleMap } from 'draft-js';
import { useParams } from 'react-router';
import { getDataById } from '../lib/db';
import { NoteReducer, EmptyInitialValue } from '../NoteReducer';
import Toolbar from './Toolbar';
import '../NoteEditor.css';

const styleMap: DraftStyleMap = {
  STRIKETHROUGH: { textDecoration: 'line-through' },
  HIGHLIGHT: { backgroundColor: '#FFFF00' },
};

const NoteEditor: React.FC = () => {
  const editor = useRef<Editor>(null);
  const [state, dispatch] = useReducer(NoteReducer, EmptyInitialValue);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const result = getDataById(id);
    if (result) dispatch({ type: 'updateAll', payload: result });
  }, []);

  if (state.id === '') {
    // TODO: 404 component
    return <p>404 note not found</p>;
  }

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

  return (
    <>
      <Toolbar state={state} dispatch={dispatch} />
      <div className='h-screen' onClick={() => editor.current?.focus()}>
        <Editor
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
