import React, { useContext } from 'react';
import { RichUtils } from 'draft-js';
import TextInput from './TextInput';
import EditorButton from './EditorButton';

import { ReactComponent as Bold } from '../icons/bold.svg';
import { ReactComponent as Italic } from '../icons/italic.svg';
import { ReactComponent as Underline } from '../icons/underline.svg';
import { ReactComponent as Strikethrough } from '../icons/strikethrough.svg';
import { ReactComponent as ColorFill } from '../icons/colorFill.svg';
import { NoteContext } from '../NoteContext';

const Toolbar: React.FC = () => {
  const { state, dispatch } = useContext(NoteContext)!;

  const toggleInlineStyle = (inlineStyle: string) => {
    const newNote = RichUtils.toggleInlineStyle(
      state.notes[state.selectedNote!].note,
      inlineStyle
    );
    dispatch({ type: 'updateCurrentNote', payload: newNote });
  };

  return (
    <div className='fixed top-0 w-full flex flex-col p-3 bg-white rounded-b-md space-y-2 shadow-md'>
      <div className='flex flex-row space-x-1'>
        <button onClick={() => dispatch({ type: 'closeNote' })}>
          {/* this is temporary */}
          Back
        </button>
        <TextInput
          className='w-full'
          value={state.notes[state.selectedNote!].title}
          onChange={e =>
            dispatch({ type: 'updateCurrentTitle', payload: e.target.value })
          }
        />
      </div>
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
