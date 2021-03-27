import React from 'react';
import { RichUtils, EditorState } from 'draft-js';
import { Link } from 'react-router-dom';
import TextInput from './TextInput';
import ToolbarButtons from './ToolbarButtons';
import { INote } from '../lib/note';

interface Props {
  setState: React.Dispatch<React.SetStateAction<INote | null>>;
  state: INote;
}

const Toolbar: React.FC<Props> = ({ state, setState }) => {
  const toggleInlineStyle = (inlineStyle: string) => {
    const newNote = RichUtils.toggleInlineStyle(state.note, inlineStyle);
    setState(prev => ({ ...prev!, note: newNote }));
  };

  const toggleBlockType = (blockType: string) => {
    const newNote = RichUtils.toggleBlockType(state.note, blockType);
    setState(prev => ({ ...prev!, note: newNote }));
  };

  const undo = () => {
    setState(prev => ({ ...prev!, note: EditorState.undo(state.note) }));
  };

  const redo = () => {
    setState(prev => ({ ...prev!, note: EditorState.redo(state.note) }));
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
        placeholder='Untitled Note'
        value={state.title}
        onChange={e => setState(prev => ({ ...prev!, title: e.target.value }))}
      />
      <div className='flex flex-row flex-wrap space-x-1'>
        <ToolbarButtons
          toggleInlineStyle={toggleInlineStyle}
          toggleBlockType={toggleBlockType}
          undo={undo}
          redo={redo}
        />
      </div>
    </div>
  );
};

export default Toolbar;
