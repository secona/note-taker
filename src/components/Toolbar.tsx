import React from 'react';
import { RichUtils } from 'draft-js';
import { Link } from 'react-router-dom';
import TextInput from './TextInput';
import InlineStyleButtons from './InlineStyleButtons';
import { NoteAction, INote } from '../NoteReducer';

interface Props {
  dispatch: React.Dispatch<NoteAction>;
  state: INote;
}

const Toolbar: React.FC<Props> = ({ state, dispatch }) => {
  const toggleInlineStyle = (inlineStyle: string) => {
    const newNote = RichUtils.toggleInlineStyle(state.note, inlineStyle);
    dispatch({ type: 'updateNote', payload: newNote });
  };

  return (
    <div className='fixed top-0 w-full flex flex-col p-3 bg-white rounded-b-md space-y-2 shadow-md'>
      <Link to='/'>
        <button>
          {/* temproary */}
          Back
        </button>
      </Link>
      <TextInput
        className='w-full'
        value={state.title}
        onChange={e =>
          dispatch({ type: 'updateTitle', payload: e.target.value })
        }
      />
      <div className='flex flex-row flex-wrap space-x-1'>
        <InlineStyleButtons toggleInlineStyle={toggleInlineStyle} />
      </div>
    </div>
  );
};

export default Toolbar;
