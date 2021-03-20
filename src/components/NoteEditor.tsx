import React, { useRef, useContext } from 'react';
import { Editor, RichUtils, DraftStyleMap, EditorState } from 'draft-js';
import Toolbar from './Toolbar';
import '../NoteEditor.css';
import { NoteContext } from '../NoteContext';

const styleMap: DraftStyleMap = {
  STRIKETHROUGH: { textDecoration: 'line-through' },
  HIGHLIGHT: { backgroundColor: '#FFFF00' },
};

const NoteEditor: React.FC = () => {
  const editor = useRef<Editor>(null);
  const { state, dispatch } = useContext(NoteContext)!;

  const setNote = (newNote: EditorState) => {
    dispatch({ type: 'updateCurrentNote', payload: newNote });
  };

  const handleKeyCommand = (command: string) => {
    const newNote = RichUtils.handleKeyCommand(
      state.notes[state.selectedNote].note,
      command
    );
    if (newNote) {
      setNote(newNote);
      return 'handled';
    }
    return 'not-handled';
  };

  return (
    <>
      <Toolbar />
      <div className='h-screen' onClick={() => editor.current?.focus()}>
        <Editor
          customStyleMap={styleMap}
          ref={editor}
          editorState={state.notes[state.selectedNote].note}
          onChange={setNote}
          handleKeyCommand={handleKeyCommand}
        />
      </div>
    </>
  );
};

export default NoteEditor;
