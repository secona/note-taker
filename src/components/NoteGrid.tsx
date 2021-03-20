import React, { useContext } from 'react';
import Note from './Note';
import { NoteContext } from '../NoteContext';

const NoteGrid: React.FC = () => {
  const { state } = useContext(NoteContext)!;

  return (
    <div className='flex flex-wrap justify-center'>
      {Object.keys(state.notes).map((key: string) => (
        <Note id={key} />
      ))}
    </div>
  );
};

export default NoteGrid;
