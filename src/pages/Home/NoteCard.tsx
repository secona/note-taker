import React from 'react';
import { ContentState } from 'draft-js';
import { Link } from 'react-router-dom';
import { MdMoreVert } from 'react-icons/md';
import { INoteWithId } from 'src/interfaces';
import { Dropdown, DropdownItem } from '@components/Dropdown';
import { DropdownItemProps } from '@components/Dropdown/DropdownItem';

interface Props {
  note: INoteWithId<ContentState>;
  actions: (id: string) => (() => DropdownItemProps)[];
}

const NoteCard: React.FC<Props> = ({ note, actions }) => {
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
        {actions(note.id).map(action => (
          <DropdownItem {...action()} />
        ))}
      </Dropdown>
    </div>
  );
};

export default NoteCard;
