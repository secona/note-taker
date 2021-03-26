import React from 'react';
import { ContentState } from 'draft-js';
import { Link } from 'react-router-dom';
import { INoteWithId } from '../lib/note';

interface Props {
  note: INoteWithId<ContentState>;
}

const NoteCard: React.FC<Props> = ({ note }) => {
  return (
    <div className='border border-gray-200 w-52 p-4 m-1 rounded-md justify-center flex flex-col hover:shadow-md'>
      <p className='text-2xl font-semibold truncate'>
        <Link to={`/${note.id}`}>{note.title || 'Untitled Note'}</Link>
      </p>
      {/* Note preview */}
    </div>
  );
};

export default NoteCard;
