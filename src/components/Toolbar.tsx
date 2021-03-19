import React from 'react';
import { RichUtils } from 'draft-js';
import TextInput from './TextInput';
import EditorButton from './EditorButton';
import { NoteAction, INote } from '../NoteReducer';

import { ReactComponent as Bold } from '../icons/bold.svg';
import { ReactComponent as Italic } from '../icons/italic.svg';
import { ReactComponent as Underline } from '../icons/underline.svg';
import { ReactComponent as Strikethrough } from '../icons/strikethrough.svg';
import { ReactComponent as ColorFill } from '../icons/colorFill.svg';

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
      <TextInput
        className='w-full'
        value={state.title}
        onChange={e =>
          dispatch({ type: 'updateTitle', payload: e.target.value })
        }
      />
      <div className='flex flex-row flex-wrap space-x-1'>
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
        <EditorButton
          onClick={() => toggleInlineStyle('STRIKETHROUGH')}
          children={<Strikethrough />}
        />
        <EditorButton
          onClick={() => toggleInlineStyle('HIGHLIGHT')}
          children={<ColorFill />}
        />
      </div>
    </div>
  );
};

export default Toolbar;
