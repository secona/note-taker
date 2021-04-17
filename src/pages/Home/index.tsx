import React from 'react';
import localforage from 'localforage';
import { useAllNotesState } from '@lib/db';
import NoteCard from './NoteCard';
import NoteGrid from './NoteGrid';
import Header from './Header';

const Home: React.FC = () => {
  const {
    result: [notes, setNotes],
    loading,
    error,
  } = useAllNotesState();

  React.useEffect(() => {
    document.title = 'NoteTaker';
  }, []);

  const deleteNote = (id: string) => {
    localforage
      .removeItem(id)
      .then(() => setNotes(notes.filter(v => v.id !== id)))
      .catch(err => console.log(err));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <div className='min-h-screen bg-gray-100 pb-8'>
      <div className='container mx-auto'>
        <Header />
        <NoteGrid>
          {notes.map(note => (
            <NoteCard note={note} deleteNote={deleteNote} />
          ))}
        </NoteGrid>
      </div>
    </div>
  );
};

export default Home;
