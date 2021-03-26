import React from 'react';
import { Redirect } from 'react-router';
import { MdAdd } from 'react-icons/md';
import { CreateNewNote, useAllNotes } from '../lib/db';
import Fab from './Fab';
import NoteCard from './NoteCard';
import NoteGrid from './NoteGrid';

const Home: React.FC = () => {
  const [redirect, setRedirect] = React.useState<string>('');
  const { result, loading, error } = useAllNotes();

  if (redirect) return <Redirect to={redirect} />;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <div className='container mx-auto'>
      <p className='text-xl font-black py-3 border-b text-center'>NOTETAKER</p>
      <NoteGrid>
        {result.map(note => (
          <NoteCard note={note} />
        ))}
      </NoteGrid>
      <Fab
        onClick={() => {
          CreateNewNote()
            .then(id => setRedirect(`/${id}`))
            .catch(err => console.log(err));
        }}
        children={<MdAdd color='#FFFFFF' size={30} />}
      />
    </div>
  );
};

export default Home;
