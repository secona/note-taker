import React from 'react';
import { Redirect } from 'react-router';
import { CreateNewNote, useAllNotes } from '../lib/db';
import NoteCard from './NoteCard';
import NoteGrid from './NoteGrid';

const Home: React.FC = () => {
  const [redirect, setRedirect] = React.useState<string>('');
  const { result, loading, error } = useAllNotes();

  if (redirect) return <Redirect to={redirect} />;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <>
      <button
        onClick={() => {
          CreateNewNote()
            .then(id => setRedirect(`/${id}`))
            .catch(err => console.log(err));
        }}
      >
        New Note
      </button>
      <NoteGrid>
        {result.map(note => (
          <NoteCard note={note} />
        ))}
      </NoteGrid>
    </>
  );
};

export default Home;
