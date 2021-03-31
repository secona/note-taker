import React from 'react';
import { useAllNotes } from '../lib/db';
import NoteCard from './NoteCard';
import NoteCardAdd from './NoteCardAdd';
import NoteGrid from './NoteGrid';

const Home: React.FC = () => {
  const { result, loading, error } = useAllNotes();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <div className='container mx-auto'>
      <p className='text-xl font-black py-3 text-center'>NOTETAKER</p>
      <NoteGrid>
        {result.map(note => (
          <NoteCard note={note} />
        ))}
        <NoteCardAdd />
      </NoteGrid>
    </div>
  );
};

export default Home;
