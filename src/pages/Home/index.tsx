import * as React from 'react';
import localforage from 'localforage';
import { updateNote, useAllNotesState } from '@lib/db';
import { Prompt, Redirect } from 'react-router';
import { MdDelete, MdEdit, MdStar, MdStarBorder } from 'react-icons/md';
import { filterNotes } from '@utils/filterNotes';
import NoteCard, { NoteCardDropdownActions } from './NoteCard';
import { Loading, Error } from '@components/Screens';
import NoteGrid from './NoteGrid';
import Header from './Header';
import { INoteWithId } from 'src/interfaces';

const { useEffect, useMemo, useState } = React;

const Home: React.FC = () => {
  const {
    result: [notes, setNotes],
    loading,
    error,
  } = useAllNotesState();

  const [redirect, setRedirect] = useState<string | undefined>();
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const { starred, notStarred } = useMemo(() => filterNotes(notes), [notes]);

  useEffect(() => {
    document.title = 'NoteTaker';
  }, []);

  const dropdownActions: NoteCardDropdownActions = (
    id: string,
    isStarred: boolean | undefined
  ) => [
    {
      // open note
      closeOnClick: true,
      onClick: () => setRedirect(`/${id}`),
      children: 'Edit',
      Icon: MdEdit,
    },
    {
      // star note
      closeOnClick: true,
      onClick: () => {
        setIsSaving(true);
        const idx = notes.findIndex(n => n.id === id);
        const newNote = { ...notes[idx], starred: !isStarred };
        updateNote(id, newNote)
          .then(() => {
            setNotes(
              Object.values<INoteWithId<any>>({ ...notes, [idx]: newNote })
            );
          })
          .catch(() => {
            alert('An error occured. Please try again');
          });
        setIsSaving(false);
      },
      children: isStarred ? 'Unstar' : 'Star',
      Icon: isStarred ? MdStar : MdStarBorder,
    },
    {
      // delete button
      closeOnClick: true,
      onClick: () => {
        setIsSaving(true);
        localforage
          .removeItem(id)
          .then(() => setNotes(notes.filter(v => v.id !== id)))
          .catch(() => alert('An error occured. Please try again'));
        setIsSaving(false);
      },
      children: 'Delete',
      Icon: MdDelete,
    },
  ];

  if (redirect) return <Redirect to={redirect} />;
  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <Prompt
        when={isSaving}
        message='Are you sure you want to exit? All unsaved changes will be lost!'
      />
      <div className='container mx-auto mb-8 px-3.5'>
        <Header />
        <NoteGrid title='starred notes'>
          {starred.map(note => (
            <NoteCard key={note.id} note={note} actions={dropdownActions} />
          ))}
        </NoteGrid>
        <NoteGrid title='notes'>
          {notStarred.map(note => (
            <NoteCard key={note.id} note={note} actions={dropdownActions} />
          ))}
        </NoteGrid>
      </div>
    </>
  );
};

export default Home;
