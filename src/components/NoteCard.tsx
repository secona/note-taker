import React from 'react';
import { ContentState } from 'draft-js';
import { Link } from 'react-router-dom';
import { INoteWithId } from '../lib/note';
import NotePreview from './NotePreview';

interface Props {
  note: INoteWithId<ContentState>;
}

const NoteCard: React.FC<Props> = ({ note }) => {
  return (
    <div className='border flex-1 p-4 m-1 rounded-md justify-center flex flex-col bg-white'>
      <p className='text-lg font-semibold truncate hover:underline'>
        <Link to={`/${note.id}`}>{note.title || 'Untitled Note'}</Link>
      </p>
      <NotePreview note={note.note} />
    </div>
  );
};

export default NoteCard;
