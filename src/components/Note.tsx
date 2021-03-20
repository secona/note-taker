import React, { useContext } from 'react';
import { NoteContext } from '../NoteContext';

interface Props {
  idx: number;
}

const Note: React.FC<Props> = ({ idx }) => {
  const { state, dispatch } = useContext(NoteContext)!;

  return (
    <div
      className='border border-gray-200 w-52 p-4 m-1 rounded-md justify-center flex flex-col hover:shadow-md'
      onClick={() => dispatch({ type: 'selectNote', payload: idx })}
    >
      <p className='text-2xl font-semibold truncate'>
        {state.notes[idx].title}
      </p>
      {
        // <p className='text-sm text-gray-400 truncate'>{props.note.preview}</p>
        // need fix
      }
    </div>
  );
};

export default Note;
