import React, { useState } from 'react';
import { RichUtils, EditorState } from 'draft-js';
import { Redirect, useParams } from 'react-router-dom';
import TextInput from '@components/TextInput';
import ToolbarButtons from './ToolbarButtons';
import { INote } from '@lib/note';
import { SaveNote } from '@lib/db';
import Button from '@components/Button';
import { MdArrowBack } from 'react-icons/md';
import LoadingIcon from '@components/LoadingIcon';

interface Props {
  setState: React.Dispatch<React.SetStateAction<INote | null>>;
  state: INote;
}

const Toolbar: React.FC<Props> = ({ state, setState }) => {
  const { id } = useParams<{ id: string }>();
  const [redirect, setRedirect] = useState('');
  const [loading, setLoading] = useState(false);

  if (redirect) return <Redirect to={redirect} />;

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
      <div className='flex space-x-1'>
        <Button
          onClick={async () => {
            setLoading(true);
            const result = await SaveNote(id, state);
            if (result === 'success') setRedirect('/');
            else console.log('Error!');
          }}
          children={loading ? <LoadingIcon /> : <MdArrowBack size={24} />}
        />
        <TextInput
          className='flex-grow'
          placeholder='Untitled Note'
          value={state.title}
          onChange={e =>
            setState(prev => ({ ...prev!, title: e.target.value }))
          }
        />
      </div>
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
