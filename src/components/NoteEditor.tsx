import React, { useRef } from 'react';
import { Map } from 'immutable';
import {
  Editor,
  RichUtils,
  DraftStyleMap,
  EditorState,
  DraftEditorCommand,
  DraftBlockRenderMap,
  DefaultDraftBlockRenderMap,
} from 'draft-js';
import { useParams } from 'react-router';
import { useNoteState } from '../lib/db';
import Toolbar from './Toolbar';
import '../NoteEditor.css';
import 'draft-js/dist/Draft.css';

const styleMap: DraftStyleMap = {
  STRIKETHROUGH: { textDecoration: 'line-through' },
  HIGHLIGHT: { backgroundColor: '#FFFF00' },
};

const blockRenderMap: DraftBlockRenderMap = Map({
  'header-one': { element: 'h1', wrapper: <p className='text-5xl' /> },
  'header-two': { element: 'h2', wrapper: <p className='text-4xl' /> },
  'header-three': { element: 'h3', wrapper: <p className='text-3xl' /> },
  'header-four': { element: 'h4', wrapper: <p className='text-2xl' /> },
  'header-five': { element: 'h5', wrapper: <p className='text-xl' /> },
  'header-six': { element: 'h6', wrapper: <p className='text-lg' /> },
});

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

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
          blockRenderMap={extendedBlockRenderMap}
        />
      </div>
    </>
  );
};

export default NoteEditor;
