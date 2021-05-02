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
  const { value, loading, error } = useNoteState(id);
  const {
    info: [noteInfo, setNoteInfo],
    note: [note, setNote],
  } = value;

  React.useEffect(() => {
    const noteTitle = noteInfo?.title || 'Untitled Note';
    const star = hasChanged ? '*' : '';
    document.title = `${star}${noteTitle} - NoteTaker`;
  }, [noteInfo?.title, hasChanged]);

  const handleKeyCommand = React.useCallback(
    (command: DraftEditorCommand) => {
      if (note) {
        const newNote = RichUtils.handleKeyCommand(note, command);
        if (newNote) {
          setNote(newNote);
          return 'handled';
        }
      }
      return 'not-handled';
    },
    [note, setNote]
  );

  if (error) return <Sc.Error />;
  if (loading) return <Sc.Loading />;
  if (!note && !noteInfo) return <Sc.NotFound />;

  const compareAndSetNote = (newNote: EditorState) => {
    const currentContentState = note?.getCurrentContent();
    const newContentState = newNote.getCurrentContent();

    if (newContentState !== currentContentState) {
      setHasChanged(true);
    }

    setNote(newNote);
  };

  return (
    <>
      <Prompt
        when={hasChanged}
        message='You have unsaved changes. Are you sure you want to exit?'
      />
      <Toolbar
        // @ts-ignore
        value={value}
        setHasChanged={setHasChanged}
      />
      <div className='mt-14 mb-8 container mx-auto px-3.5'>
        <div className='bg-white rounded-lg px-4 py-2'>
          <TextInput
            blurOnEnter
            variant='secondary'
            className='w-full text-2xl font-semibold'
            placeholder='Untitled Note'
            defaultValue={noteInfo?.title}
            onBlur={e => {
              if (e.target.value !== noteInfo?.title) {
                setHasChanged(true);
                setNoteInfo({ ...noteInfo, title: e.target.value });
              }
            }}
          />
          <Editor
            placeholder="What's on your mind?"
            customStyleMap={styleMap}
            editorState={note!} // already checked it in line 50
            onChange={compareAndSetNote}
            handleKeyCommand={handleKeyCommand}
          />
        </div>
      </div>
    </>
  );
};

export default NoteEditor;
