import React, { useRef, useState, useEffect } from 'react';
import {
  Editor,
  RichUtils,
  DraftStyleMap,
  EditorState,
  DraftEditorCommand,
} from 'draft-js';
import { useParams } from 'react-router';
import { useNoteState } from '../lib/db';
import { INote } from '../lib/note';
import Toolbar from './Toolbar';
import '../NoteEditor.css';

const styleMap: DraftStyleMap = {
  STRIKETHROUGH: { textDecoration: 'line-through' },
  HIGHLIGHT: { backgroundColor: '#FFFF00' },
};

const NoteEditor: React.FC = () => {
  const editor = useRef<Editor>(null);
  const { id } = useParams<{ id: string }>();
  const {
    result: [state, setState],
    loading,
    error,
  } = useNoteState(id);

  if (error) return <p>Error!</p>;
  if (loading) return <p>Loading...</p>;
  if (!state) return <p>404 Note not found!</p>;

  const setNote = (newNote: EditorState) => {
    setState(prev => ({ ...prev!, note: newNote }));
  };

  const handleKeyCommand = (command: DraftEditorCommand) => {
    const newNote = RichUtils.handleKeyCommand(state.note, command);
    if (newNote) {
      setNote(newNote);
      return 'handled';
    }
    return 'not-handled';
  };

  return (
    <>
      <Toolbar state={state} setState={setState} />
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
