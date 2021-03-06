import { IconButton } from '@components/Button';
import LoadingIcon from '@components/LoadingIcon';
import { newNote } from '@lib/db';
import * as React from 'react';
import { MdAdd } from 'react-icons/md';
import { useHistory } from 'react-router';

const Header = () => {
  const history = useHistory();
  const [loading, setLoading] = React.useState(false);

  return (
    <div className='w-full flex py-4'>
      <p className='text-2xl font-bold flex-grow uppercase'>notetaker</p>
      <IconButton
        className='shadow-md'
        color='primary'
        onClick={() => {
          setLoading(true);
          newNote()
            .then(id => history.push(`/${id}`))
            .catch(err => console.log(err));
        }}
        disabled={loading}
      >
        {loading ? <LoadingIcon size={24} /> : <MdAdd size={24} />}
      </IconButton>
    </div>
  );
};

export default Header;
