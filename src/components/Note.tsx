import React from 'react';
import { INote } from '../interfaces';

interface Props {
  note: INote
}

const Note: React.FC<Props> = props => {
  return (
    <div className='border border-gray-200 w-52 p-4 m-1 rounded-md justify-center flex flex-col hover:shadow-md'>
      <p className='text-2xl font-semibold truncate'>{props.note.title}</p>
      <p className='text-sm text-gray-400 truncate'>{props.note.preview}</p>
    </div>
  )
};

export default Note;