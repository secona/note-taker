import React, { useMemo, useState } from 'react';
import { RichUtils, EditorState } from 'draft-js';
import { Redirect, useParams } from 'react-router-dom';
import { INote } from 'src/interfaces';
import { SaveNote } from '@lib/db';
import { IconButton } from '@components/Button';
import {
  MdArrowBack,
  MdFormatBold,
  MdFormatColorFill,
  MdFormatItalic,
  MdFormatListBulleted as MdFormatListBullet,
  MdFormatListNumbered,
  MdFormatUnderlined,
  MdRedo,
  MdStrikethroughS,
  MdUndo,
} from 'react-icons/md';
import LoadingIcon from '@components/LoadingIcon';
import { IconType } from 'react-icons/lib';
import ToolbarButton from './ToolbarButton';
import Select from '@components/Select/Select';

type Button = {
  type: 'inline' | 'block' | 'other';
  value: string;
  icon: IconType;
};

interface Props {
  setState: React.Dispatch<React.SetStateAction<INote | null>>;
  state: INote;
}

const Toolbar: React.FC<Props> = ({ state, setState }) => {
  const { id } = useParams<{ id: string }>();
  const [redirect, setRedirect] = useState('');
  const [loading, setLoading] = useState(false);

  const buttons = useMemo<Button[]>(
    () => [
      { type: 'inline', value: 'BOLD', icon: MdFormatBold },
      { type: 'inline', value: 'ITALIC', icon: MdFormatItalic },
      { type: 'inline', value: 'UNDERLINE', icon: MdFormatUnderlined },
      { type: 'inline', value: 'STRIKETHROUGH', icon: MdStrikethroughS },
      { type: 'inline', value: 'HIGHLIGHT', icon: MdFormatColorFill },
      { type: 'block', value: 'ordered-list-item', icon: MdFormatListNumbered },
      { type: 'block', value: 'unordered-list-item', icon: MdFormatListBullet },
      { type: 'other', value: 'undo', icon: MdUndo },
      { type: 'other', value: 'redo', icon: MdRedo },
    ],
    []
  );

  if (redirect) return <Redirect to={redirect} />;

  const setNote = (n: EditorState) => setState(prev => ({ ...prev!, note: n }));

  const action: any = {
    inline: (s: string) => {
      /* Toggle inline style */
      setNote(RichUtils.toggleInlineStyle(state.note, s));
    },
    block: (t: string) => {
      /* Toggle block type */
      setNote(RichUtils.toggleBlockType(state.note, t));
    },
    other: {
      undo: () => setNote(EditorState.undo(state.note)),
      redo: () => setNote(EditorState.redo(state.note)),
    },
  };

  const isStyleActive = {
    inline: (s: string) => state.note.getCurrentInlineStyle().has(s),
    block: (t: string) => RichUtils.getCurrentBlockType(state.note) === t,
    other: () => false,
  };

  return (
    <div className='fixed w-full top-2 z-10'>
      <div className='container mx-auto shadow-lg rounded-lg bg-blue-500 flex items-center space-x-0.5 p-1'>
        <IconButton
          color='primary'
          onClick={async () => {
            setLoading(true);
            const result = await SaveNote(id, state);
            if (result === 'success') setRedirect('/');
            else console.log('Error!');
          }}
          disabled={loading}
          children={loading ? <LoadingIcon /> : <MdArrowBack size={24} />}
        />
        <Select
          value={(() => {
            const currentType = RichUtils.getCurrentBlockType(state.note);
            return currentType.startsWith('header') ? currentType : 'unstyled';
          })()}
          options={[
            { value: 'header-one', label: 'Header One' },
            { value: 'header-two', label: 'Header Two' },
            { value: 'header-three', label: 'Header Three' },
            { value: 'header-four', label: 'Header Four' },
            { value: 'header-five', label: 'Header Five' },
            { value: 'header-six', label: 'Header Six' },
            { value: 'unstyled', label: 'Paragraph' },
          ]}
          onChange={value => action.block(value)}
        />
        {buttons.map(({ type, value, icon }) => (
          <ToolbarButton
            active={isStyleActive[type](value)}
            onClick={() => {
              if (type === 'other') action[type][value]();
              else action[type](value);
            }}
            Icon={icon}
          />
        ))}
      </div>
    </div>
  );
};

export default Toolbar;
