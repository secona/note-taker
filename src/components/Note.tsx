import React, { useContext } from 'react';
import { NoteContext } from '../NoteContext';

const Note: React.FC<{ id: string }> = ({ id }) => {
  const { state, dispatch } = useContext(NoteContext)!;

  return (
    <div
      className='border border-gray-200 w-44 py-2 px-3 m-1 rounded-md justify-center flex flex-col hover:shadow-md cursor-pointer'
      onClick={() => dispatch({ type: 'selectNote', payload: id })}
    >
      <p className='text-xl font-medium truncate'>
        {state.notes[id].title || 'Untitled Note'}
      </p>
      {
        // <p className='text-sm text-gray-400 truncate'>{props.note.preview}</p>
        // need fix
      }
    </div>
  );
};

export default Note;
