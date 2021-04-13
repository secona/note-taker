import React, { useState } from 'react';
import { RichUtils, EditorState } from 'draft-js';
import { Redirect, useParams } from 'react-router-dom';
import ToolbarButtons from './ToolbarButtons';
import { INote } from '@lib/note';
import { SaveNote } from '@lib/db';
import { IconButton } from '@components/Button';
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
    <div className='fixed w-full top-2 z-10'>
      <div className='container mx-auto shadow-lg rounded-lg bg-blue-500 flex items-center space-x-1 p-1'>
        <IconButton
          color='primary'
          onClick={async () => {
            setLoading(true);
            const result = await SaveNote(id, state);
            if (result === 'success') setRedirect('/');
            else console.log('Error!');
          }}
          disabled={loading}
          children={loading ? <LoadingIcon size={16} /> : <MdArrowBack />}
        />
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
