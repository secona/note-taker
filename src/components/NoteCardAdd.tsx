import React from 'react';
import { MdAdd } from 'react-icons/md';
import { useHistory } from 'react-router';
import { CreateNewNote } from '../lib/db';

const NoteCardAdd: React.FC = () => {
  const history = useHistory();
  return (
    <div
      className='h-12 px-3 m-1 rounded-md bg-gray-100 flex items-center space-x-1 hover:shadow cursor-pointer'
      onClick={() => {
        CreateNewNote()
          .then(id => history.push(`/${id}`))
          .catch(err => console.log(err));
      }}
    >
      <MdAdd size={24} />
      <p>New Note</p>
    </div>
  );
};

export default NoteCardAdd;
