import React, { useContext } from 'react';
import Note from './Note';
import { NoteContext } from '../NoteContext';

const NoteGrid: React.FC = () => {
  const { state } = useContext(NoteContext)!;

  return (
    <div className='flex flex-wrap justify-center'>
      {state.notes.map((_, idx) => (
        <Note idx={idx} />
      ))}
    </div>
  );
};

export default NoteGrid;
