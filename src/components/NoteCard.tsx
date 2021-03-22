import React from 'react';
import { Link } from 'react-router-dom';
import { INote } from '../NoteReducer';

const NoteCard: React.FC<{ note: INote }> = ({ note }) => {
  return (
    <div className='border border-gray-200 w-52 p-4 m-1 rounded-md justify-center flex flex-col hover:shadow-md'>
      <p className='text-2xl font-semibold truncate'>
        <Link to={`/${note.id}`}>{note.title}</Link>
      </p>
      {
        // <p className='text-sm text-gray-400 truncate'>{props.note.preview}</p>
        // need fix
      }
    </div>
  );
};

export default NoteCard;
