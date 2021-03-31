import React from 'react';
import { MdAdd } from 'react-icons/md';
import { useHistory } from 'react-router';
import { CreateNewNote } from '../lib/db';
import LoadingIcon from './LoadingIcon';

const NoteCardAdd: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = React.useState(false);

  return (
    <div
      className='h-12 px-3 m-1 rounded-md bg-gray-100 flex items-center space-x-1 hover:shadow cursor-pointer'
      onClick={() => {
        setLoading(true);
        CreateNewNote()
          .then(id => history.push(`/${id}`))
          .catch(err => console.log(err));
      }}
    >
      {loading ? <LoadingIcon /> : <MdAdd size={24} />}
      <p>New Note</p>
    </div>
  );
};

export default NoteCardAdd;
