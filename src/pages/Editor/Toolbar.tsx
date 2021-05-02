import React, { useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import { IconButton } from '@components/Button';
import LoadingIcon from '@components/LoadingIcon';
import NoteActions from './NoteActions';

import { ReactSetState } from 'src/interfaces';
import { NoteStateTypeNotNull, updateNote } from '@lib/db';
import { fullConvertToRaw } from '@utils/fullConvertToRaw';

import { MdArrowBack, MdSave } from 'react-icons/md';

interface Props {
  setHasChanged: ReactSetState<boolean>;
  value: NoteStateTypeNotNull;
}

const Toolbar: React.FC<Props> = ({
  value: {
    info: [noteInfo],
    note: [note, setNote],
  },
  setHasChanged,
}) => {
  const { id } = useParams<{ id: string }>();
  const [redirect, setRedirect] = useState('');
  const [loading, setLoading] = useState(false);

  if (redirect) return <Redirect to={redirect} />;

  const saveNote = (cb?: () => void) => {
    setLoading(true);
    const convertedNote = fullConvertToRaw(note);
    updateNote(id, { ...noteInfo, note: convertedNote })
      .then(() => {
        setHasChanged(false);
        cb?.();
      })
      .catch(() => alert('An error occured. Please try again!'));
    setLoading(false);
  };

  return (
    <>
      <div className='fixed w-full top-0 z-10'>
        <div className='shadow-lg bg-blue-500 flex items-center overflow-x-auto space-x-0.5 p-1'>
          <IconButton
            color='primary'
            onClick={() => saveNote(() => setRedirect('/'))}
            disabled={loading}
            children={loading ? <LoadingIcon /> : <MdArrowBack />}
          />
          <IconButton
            color='primary'
            onClick={() => saveNote()}
            disabled={loading}
            children={loading ? <LoadingIcon /> : <MdSave />}
          />
          <NoteActions note={note} setNote={setNote} />
        </div>
      </div>
    </>
  );
};

export default Toolbar;
