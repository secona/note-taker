import React from 'react';
import { ContentState } from 'draft-js';
import { Link } from 'react-router-dom';
import { INoteWithId } from 'src/interfaces';
import { MdDelete, MdMoreVert } from 'react-icons/md';
import { Dropdown, DropdownItem } from '@components/Dropdown';

interface Props {
  note: INoteWithId<ContentState>;
  deleteNote: (id: string) => void;
}

const NoteCard: React.FC<Props> = ({ note, deleteNote }) => {
  return (
    <div className='h-10 px-3 m-1 rounded-md bg-white flex items-center'>
      <div className='flex-grow truncate'>
        <Link
          className='font-semibold hover:underline align-middle'
          to={`/${note.id}`}
        >
          {note.title || 'Untitled Note'}
        </Link>
      </div>
      <Dropdown
        icon={<MdMoreVert size={24} />}
        className='h-6'
        buttonClassName='rounded-full focus:outline-none'
      >
        <DropdownItem
          onClick={() => deleteNote(note.id)}
          closeOnClick={true}
          icon={<MdDelete />}
          children='Delete Note'
        />
      </Dropdown>
    </div>
  );
};

export default NoteCard;
