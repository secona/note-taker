import React, { useState } from 'react';
import { RichUtils, EditorState } from 'draft-js';
import { Redirect, useParams } from 'react-router-dom';
import { IconType } from 'react-icons/lib';

import { IconButton } from '@components/Button';
import ToolbarButton from './ToolbarButton';
import Select from '@components/Select/Select';
import LoadingIcon from '@components/LoadingIcon';

import { ReactSetState } from 'src/interfaces';
import { NoteStateType, updateNote } from '@lib/db';
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
  setHasChanged: ReactSetState<boolean>;
  value: NoteStateType;
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

const Toolbar: React.FC<Props> = ({
  value: {
    info: [noteInfo],
    note: [note, setNote],
  },
  setHasChanged,
}) => {
  const { id } = useParams<{ id: string }>();
  const [redirect, setRedirect] = useState('');
  const [loading, setLoading] = useState(false);

  const noteFns = React.useMemo(
    () => ({
      toggleInline: (s: string) =>
        setNote(RichUtils.toggleInlineStyle(note!, s)),
      toggleBlock: (t: string) => setNote(RichUtils.toggleBlockType(note!, t)),
      undo: () => setNote(EditorState.undo(note!)),
      redo: () => setNote(EditorState.redo(note!)),
    }),
    [note, setNote]
  );

  const toolbarButtons: Button[] = React.useMemo(
    // TODO: can render custom button for dropdowns
    () => [
      ['inline', 'BOLD', MdFormatBold],
      ['inline', 'ITALIC', MdFormatItalic],
      ['inline', 'UNDERLINE', MdFormatUnderlined],
      ['inline', 'STRIKETHROUGH', MdStrikethroughS],
      ['inline', 'HIGHLIGHT', MdFormatColorFill],
      ['block', 'blockquote', MdFormatQuote],
      ['block', 'ordered-list-item', MdFormatListNumbered],
      ['block', 'unordered-list-item', MdFormatListBulleted],
      ['other', noteFns.undo, MdUndo],
      ['other', noteFns.redo, MdRedo],
    ],
    [noteFns]
  );

  const isStyleActive = React.useMemo(
    () => ({
      inline: (s: string) => note!.getCurrentInlineStyle().has(s),
      block: (t: string) => RichUtils.getCurrentBlockType(note!) === t,
    }),
    [note]
  );

  const buttons = React.useMemo(
    () => ({
      /** Toolbar button for toggling inline style */
      inline: (s: string, Icon: IconType) => (
        <ToolbarButton
          onClick={() => noteFns.toggleInline(s)}
          active={isStyleActive.inline(s)}
          Icon={Icon}
        />
      ),
      /** Toolbar button for toggling block types */
      block: (t: string, Icon: IconType) => (
        <ToolbarButton
          onClick={() => noteFns.toggleBlock(t)}
          active={isStyleActive.block(t)}
          Icon={Icon}
        />
      ),
      /** Toolbar button for anything other than toggling styles  */
      other: (onClick: () => void, Icon: IconType) => (
        <ToolbarButton onClick={onClick} Icon={Icon} />
      ),
    }),
    [noteFns, isStyleActive]
  );

  if (redirect) return <Redirect to={redirect} />;

  const saveButton = (Icon: IconType, cb?: () => void) => (
    <IconButton
      color='primary'
      onClick={() => {
        setLoading(true);
        const convertedNote = fullConvertToRaw(note!);
        updateNote(id, { ...noteInfo!, note: convertedNote })
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
  );

  return (
    <>
      <div className='fixed w-full top-0 z-10'>
        <div className='shadow-lg bg-blue-500 flex items-center overflow-x-auto space-x-0.5 p-1'>
          {saveButton(MdArrowBack, () => setRedirect('/'))}
          {saveButton(MdSave)}
          <Select
            dropdownFixed
            buttonClassName='py-1 px-2.5 text-sm'
            options={selectOptions}
            onChange={value => noteFns.toggleBlock(value)}
            value={(() => {
              const currentType = RichUtils.getCurrentBlockType(note!);
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
