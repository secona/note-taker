import React, { useState } from 'react';
import { RichUtils, EditorState } from 'draft-js';
import { Redirect, useParams } from 'react-router-dom';
import { IconType } from 'react-icons/lib';

import { IconButton } from '@components/Button';
import ToolbarButton from './ToolbarButton';
import Select from '@components/Select/Select';
import LoadingIcon from '@components/LoadingIcon';

import { INote } from 'src/interfaces';
import { updateNote } from '@lib/db';
import { fullConvertToRaw } from '@utils/fullConvertToRaw';

import {
  MdArrowBack,
  MdFormatBold,
  MdFormatColorFill,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatUnderlined,
  MdFormatQuote,
  MdRedo,
  MdSave,
  MdStrikethroughS,
  MdUndo,
} from 'react-icons/md';

type Button =
  | ['inline' | 'block', string, IconType]
  | ['other', () => void, IconType];

interface Props {
  setHasChanged: React.Dispatch<React.SetStateAction<boolean>>;
  setState: React.Dispatch<React.SetStateAction<INote | null>>;
  state: INote;
}

const selectOptions = [
  { value: 'header-one', label: 'Header One' },
  { value: 'header-two', label: 'Header Two' },
  { value: 'header-three', label: 'Header Three' },
  { value: 'header-four', label: 'Header Four' },
  { value: 'header-five', label: 'Header Five' },
  { value: 'header-six', label: 'Header Six' },
  { value: 'unstyled', label: 'Paragraph' },
];

const Toolbar: React.FC<Props> = ({ state, setState, setHasChanged }) => {
  const { id } = useParams<{ id: string }>();
  const [redirect, setRedirect] = useState('');
  const [loading, setLoading] = useState(false);

  const setNote = (n: EditorState) => setState(prev => ({ ...prev!, note: n }));

  const toggleInline = (s: string) =>
    setNote(RichUtils.toggleInlineStyle(state.note, s));
  const toggleBlock = (t: string) =>
    setNote(RichUtils.toggleBlockType(state.note, t));
  const undo = () => setNote(EditorState.undo(state.note));
  const redo = () => setNote(EditorState.redo(state.note));

  const toolbarButtons: Button[] = [
    ['inline', 'BOLD', MdFormatBold],
    ['inline', 'ITALIC', MdFormatItalic],
    ['inline', 'UNDERLINE', MdFormatUnderlined],
    ['inline', 'STRIKETHROUGH', MdStrikethroughS],
    ['inline', 'HIGHLIGHT', MdFormatColorFill],
    ['block', 'blockquote', MdFormatQuote],
    ['block', 'ordered-list-item', MdFormatListNumbered],
    ['block', 'unordered-list-item', MdFormatListBulleted],
    ['other', undo, MdUndo],
    ['other', redo, MdRedo],
  ];

  if (redirect) return <Redirect to={redirect} />;

  const isStyleActive = {
    inline: (s: string) => state.note.getCurrentInlineStyle().has(s),
    block: (t: string) => RichUtils.getCurrentBlockType(state.note) === t,
  };

  const buttons = {
    /** Toolbar button for toggling inline style */
    inline: (s: string, Icon: IconType) => (
      <ToolbarButton
        onClick={() => toggleInline(s)}
        active={isStyleActive.inline(s)}
        Icon={Icon}
      />
    ),
    /** Toolbar button for toggling block types */
    block: (t: string, Icon: IconType) => (
      <ToolbarButton
        onClick={() => toggleBlock(t)}
        active={isStyleActive.block(t)}
        Icon={Icon}
      />
    ),
    /** Toolbar button for anything  */
    other: (onClick: () => void, Icon: IconType) => (
      <ToolbarButton onClick={onClick} Icon={Icon} />
    ),
    /** Toolbar button for saving notes */
    save: (Icon: IconType, cb?: () => void) => (
      <IconButton
        color='primary'
        onClick={() => {
          setLoading(true);
          const note = fullConvertToRaw(state.note);
          updateNote(id, { ...state, note })
            .then(() => {
              setHasChanged(false);
              cb?.();
            })
            .catch(() => alert('An error occured. Please try again!'));
          setLoading(false);
        }}
        disabled={loading}
        children={loading ? <LoadingIcon /> : <Icon />}
      />
    ),
  };

  return (
    <>
      <div className='fixed w-full top-0 z-10'>
        <div className='shadow-lg bg-blue-500 flex items-center overflow-x-auto space-x-0.5 p-1'>
          {buttons.save(MdArrowBack, () => setRedirect('/'))}
          {buttons.save(MdSave)}
          <Select
            dropdownFixed
            buttonClassName='py-1 px-2.5 text-sm'
            options={selectOptions}
            onChange={value => toggleBlock(value)}
            value={(() => {
              const currentType = RichUtils.getCurrentBlockType(state.note);
              return currentType.startsWith('header')
                ? currentType
                : 'unstyled';
            })()}
          />
          {toolbarButtons.map(([type, value, Icon]) =>
            type === 'other'
              ? /* @ts-ignore */
                buttons.other(value, Icon)
              : /* @ts-ignore */
                buttons[type](value, Icon)
          )}
        </div>
      </div>
    </>
  );
};

export default Toolbar;
