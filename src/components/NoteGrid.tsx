import React from 'react';
import Note from './Note';
import { INote } from '../interfaces';

interface Props {
  notes: INote[]
}

const NoteGrid: React.FC<Props> = props => {
  return (
    <div className='flex flex-wrap justify-center'>
      {props.notes.map((note, idx) => (
        <Note 
          note={note}
          key={idx}
        />
      ))}
    </div>
  )
};

export default NoteGrid;