import * as React from 'react';
import { useAllNotesState } from '@lib/db';
import { filterNotes } from '@utils/filterNotes';
import NoteCard from './NoteCard';
import NoteGrid from './NoteGrid';
import Header from './Header';
import { noteActions } from './noteActions';

const Home: React.FC = () => {
  const {
    result: [notes, setNotes],
    loading,
    error,
  } = useAllNotesState();

  React.useEffect(() => {
    document.title = 'NoteTaker';
  }, []);

  const { starred, notStarred } = React.useMemo(() => filterNotes(notes), [
    notes,
  ]);

  const actions = (id: string) => noteActions(notes, setNotes, id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <div className='min-h-screen bg-gray-100 pb-8'>
      <div className='container mx-auto'>
        <Header />
        <NoteGrid title='starred notes'>
          {starred.map(note => (
            <NoteCard note={note} actions={actions} />
          ))}
        </NoteGrid>
        <NoteGrid title='notes'>
          {notStarred.map(note => (
            <NoteCard note={note} actions={actions} />
          ))}
        </NoteGrid>
      </div>
    </div>
  );
};

export default Home;
