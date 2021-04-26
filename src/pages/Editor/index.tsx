import * as React from 'react';
import {
  Editor,
  RichUtils,
  DraftStyleMap,
  EditorState,
  DraftEditorCommand,
} from 'draft-js';
import { Prompt, useParams } from 'react-router';
import { useNoteState } from '@lib/db';
import TextInput from '@components/TextInput';
import Toolbar from './Toolbar';
import * as Sc from '@components/Screens';
import './Editor.css';
import 'draft-js/dist/Draft.css';

const styleMap: DraftStyleMap = {
  STRIKETHROUGH: { textDecoration: 'line-through' },
  HIGHLIGHT: { backgroundColor: '#FFFF00' },
};

const NoteEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [hasChanged, setHasChanged] = React.useState(false);
  const {
    result: [state, setState],
    loading,
    error,
  } = useNoteState(id);

  React.useEffect(() => {
    const noteTitle = state?.title || 'Untitled Note';
    const star = hasChanged ? '*' : '';
    document.title = `${star}${noteTitle} - NoteTaker`;
  }, [state?.title, hasChanged]);

  if (error) return <Sc.Error />;
  if (loading) return <Sc.Loading />;
  if (!state) return <Sc.NotFound />;

  const setNote = (note: EditorState) => {
    const currentContentState = state.note.getCurrentContent();
    const newContentState = note.getCurrentContent();

    if (newContentState !== currentContentState) {
      setHasChanged(true);
    }

    setState({ ...state, note });
  };

  const handleKeyCommand = (command: DraftEditorCommand) => {
    if (state?.note) {
      const newNote = RichUtils.handleKeyCommand(state.note, command);
      if (newNote) {
        setNote(newNote);
        return 'handled';
      }
    }
    return 'not-handled';
  };

  return (
    <>
      <Prompt
        when={hasChanged}
        message='You have unsaved changes. Are you sure you want to exit?'
      />
      <Toolbar {...{ state, setState, setHasChanged }} />
      <div className='bg-white container mx-auto rounded-lg px-4 py-2 mt-14 mb-8'>
        <TextInput
          blurOnEnter
          variant='secondary'
          className='w-full text-2xl font-semibold'
          placeholder='Untitled Note'
          defaultValue={state.title}
          onBlur={e => {
            setHasChanged(true);
            setState({ ...state, title: e.target.value });
          }}
        />
        <Editor
          placeholder="What's on your mind?"
          customStyleMap={styleMap}
          editorState={state.note}
          onChange={setNote}
          handleKeyCommand={handleKeyCommand}
        />
      </div>
    </>
  );
};

export default NoteEditor;
