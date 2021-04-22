import React from 'react';
import { Link } from 'react-router-dom';
import { MdMoreVert } from 'react-icons/md';
import { INoteWithId } from 'src/interfaces';
import { Dropdown, DropdownItem } from '@components/Dropdown';
import { DropdownItemProps } from '@components/Dropdown/DropdownItem';

export type NoteCardDropdownActions = (
  id: string,
  isStarred: boolean | undefined
) => DropdownItemProps[];

interface Props {
  note: INoteWithId<any>;
  actions: NoteCardDropdownActions;
}

const NoteCard = ({ note, actions }: Props) => {
  return (
    <div className='h-10 px-3 m-1 rounded-md bg-white flex items-center'>
      <div className='flex-grow truncate'>
        <Link className='hover:underline align-middle' to={`/${note.id}`}>
          {note.title || 'Untitled Note'}
        </Link>
      </div>
      <Dropdown
        icon={<MdMoreVert size={24} />}
        className='h-6'
        buttonClassName='rounded-full focus:outline-none flex-shrink-0'
      >
        {actions(note.id, note.starred).map((action, idx) => (
          <DropdownItem {...action} key={idx} />
        ))}
      </Dropdown>
    </div>
  );
};

export default NoteCard;
