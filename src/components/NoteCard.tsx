import React from 'react';
import { ContentState } from 'draft-js';
import { Link } from 'react-router-dom';
import { INoteWithId } from '../lib/note';
import { MdDelete, MdMoreVert } from 'react-icons/md';
import { Dropdown, DropdownItem } from './Dropdown';

interface Props {
  note: INoteWithId<ContentState>;
  deleteNote: (id: string) => void;
}

const NoteCard: React.FC<Props> = ({ note, deleteNote }) => {
  return (
    <div className='border h-12 px-3 m-1 rounded-md bg-white flex flex-row-reverse items-center'>
      <Dropdown
        icon={<MdMoreVert size={24} />}
        className='h-6'
        buttonClassName='rounded-full focus:outline-none'
      >
        <DropdownItem
          onClick={() => deleteNote(note.id)} // temporary
          icon={<MdDelete />}
          children='Delete Note'
        />
      </Dropdown>
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
