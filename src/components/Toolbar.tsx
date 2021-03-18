import React from 'react';
import { EditorState, RichUtils } from 'draft-js';
import TextInput from './TextInput';
import EditorButton from './EditorButton';
import { NoteAction } from '../interfaces';

import { ReactComponent as Bold } from '../icons/bold.svg';
import { ReactComponent as Italic } from '../icons/italic.svg';
import { ReactComponent as Underline } from '../icons/underline.svg';

// this is temporary
interface INote {
  title: string;
  note: EditorState;
}

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
    <div className='fixed top-0 w-full flex flex-col p-3'>
      <TextInput
        className='w-full'
        value={state.title}
        onChange={e =>
          dispatch({ type: 'updateTitle', payload: e.target.value })
        }
      />
      <div className='flex flex-row flex-wrap space-x-2 space-y-2'>
        <EditorButton
          onClick={() => toggleInlineStyle('BOLD')}
          children={<Bold />}
        />
        <EditorButton
          onClick={() => toggleInlineStyle('ITALIC')}
          children={<Italic />}
        />
        <EditorButton
          onClick={() => toggleInlineStyle('UNDERLINE')}
          children={<Underline />}
        />
      </div>
    </div>
  );
};

export default Toolbar;