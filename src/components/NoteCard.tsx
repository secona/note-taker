import React from 'react';
import { Link } from 'react-router-dom';
import { INote } from '../lib/note';

interface Props {
  note: INote;
  id: string;
}

const NoteCard: React.FC<Props> = ({ id, note }) => {
  return (
    <div className='border border-gray-200 w-52 p-4 m-1 rounded-md justify-center flex flex-col hover:shadow-md'>
      <p className='text-2xl font-semibold truncate'>
        <Link to={`/${id}`}>{note.title}</Link>
      </p>
      {/* Note preview */}
    </div>
  );
};

export default NoteCard;
