import React from 'react';
import {
  Editor,
  RichUtils,
  DraftStyleMap,
  EditorState,
  DraftEditorCommand,
} from 'draft-js';
import { useParams } from 'react-router';
import { useNoteState } from '@lib/db';
import { blockRenderMap } from './blockRenderMap';
import Toolbar from './Toolbar';
import './Editor.css';
import 'draft-js/dist/Draft.css';
import TextInput from '@components/TextInput';

const styleMap: DraftStyleMap = {
  STRIKETHROUGH: { textDecoration: 'line-through' },
  HIGHLIGHT: { backgroundColor: '#FFFF00' },
};

const NoteEditor: React.FC = () => {
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
    <div className='min-h-screen bg-gray-100 pt-16 pb-5'>
      <Toolbar state={state} setState={setState} />
      <div className='bg-white container mx-auto rounded-lg px-4 py-2'>
        <TextInput
          variant='secondary'
          className='w-full text-2xl font-semibold'
          placeholder='Untitled Note'
        />
        <Editor
          placeholder="What's on your mind?"
          customStyleMap={styleMap}
          editorState={state.note}
          onChange={setNote}
          handleKeyCommand={handleKeyCommand}
          blockRenderMap={blockRenderMap}
        />
      </div>
    </div>
  );
};

export default NoteEditor;
