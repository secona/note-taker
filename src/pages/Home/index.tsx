import React from 'react';
import localforage from 'localforage';
import { useAllNotesState } from '@lib/db';
import NoteCard from './NoteCard';
import NoteCardAdd from './NoteCardAdd';
import NoteGrid from './NoteGrid';

const Home: React.FC = () => {
  const {
    result: [notes, setNotes],
    loading,
    error,
  } = useAllNotesState();

  const deleteNote = (id: string) => {
    localforage
      .removeItem(id)
      .then(() => setNotes(notes.filter(v => v.id !== id)))
      .catch(err => console.log(err));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <div className='container mx-auto'>
      <p className='text-xl font-black py-3 text-center'>NOTETAKER</p>
      <NoteGrid>
        {notes.map(note => (
          <NoteCard note={note} deleteNote={deleteNote} />
        ))}
        <NoteCardAdd />
      </NoteGrid>
    </div>
  );
};

export default Home;
