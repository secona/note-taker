import React from 'react';
import { ContentState } from 'draft-js';
import { Link } from 'react-router-dom';
import { INoteWithId } from '../lib/note';
import { MdMoreVert } from 'react-icons/md';

interface Props {
  note: INoteWithId<ContentState>;
}

const NoteCard: React.FC<Props> = ({ note }) => {
  return (
    <div className='border h-12 px-3 m-1 rounded-md bg-white flex flex-row-reverse items-center'>
      <button
        className='rounded-full focus:outline-none'
        children={<MdMoreVert size={24} />}
      />
      <div className='flex-grow'>
        <Link
          className='font-semibold truncate hover:underline align-middle'
          to={`/${note.id}`}
        >
          {note.title || 'Untitled Note'}
        </Link>
      </div>
    </div>
  );
};

export default NoteCard;
