import * as React from 'react';
import { EditorState, RichUtils } from 'draft-js';
import Select from '@components/Select/Select';
import ToolbarButton from './ToolbarButton';
import { ReactSetState } from 'src/interfaces';
import { IconType } from 'react-icons/lib';

import {
  MdFormatBold as Bold,
  MdFormatColorFill as ColorFill,
  MdFormatItalic as Italic,
  MdFormatListBulleted as ListBullet,
  MdFormatListNumbered as ListOrdered,
  MdFormatUnderlined as Underlined,
  MdFormatQuote as Quote,
  MdRedo as Redo,
  MdStrikethroughS as Strikethrough,
  MdUndo as Undo,
} from 'react-icons/md';

interface Props {
  note: EditorState;
  setNote: ReactSetState<EditorState>;
}

const NoteActions = React.memo<Props>(props => {
  const { note, setNote } = props;
  const undo = () => setNote(EditorState.undo(note));
  const redo = () => setNote(EditorState.redo(note));

  const getSelectValue = () => {
    const currentType = RichUtils.getCurrentBlockType(note);
    return currentType.startsWith('header') ? currentType : 'unstyled';
  };

  const isStyleActive = (type: 'inline' | 'block', style: string) =>
    type === 'inline'
      ? note.getCurrentInlineStyle().has(style)
      : RichUtils.getCurrentBlockType(note) === style;

  const toggleStyle = (type: 'inline' | 'block', style: string) => {
    setNote(
      type === 'inline'
        ? RichUtils.toggleInlineStyle(note, style)
        : RichUtils.toggleBlockType(note, style)
    );
  };

  /** component for toggling style */
  const ToggleStyle = (props: {
    type: 'inline' | 'block';
    value: string;
    Icon: IconType;
  }) => (
    <ToolbarButton
      onClick={() => toggleStyle(props.type, props.value)}
      active={isStyleActive(props.type, props.value)}
      Icon={props.Icon}
    />
  );

  return (
    <>
      <Select
        dropdownFixed
        buttonClassName='py-1 px-2.5 text-sm'
        onChange={value => toggleStyle('block', value)}
        value={getSelectValue()}
        options={[
          { value: 'header-one', label: 'Header One' },
          { value: 'header-two', label: 'Header Two' },
          { value: 'header-three', label: 'Header Three' },
          { value: 'header-four', label: 'Header Four' },
          { value: 'header-five', label: 'Header Five' },
          { value: 'header-six', label: 'Header Six' },
          { value: 'unstyled', label: 'Paragraph' },
        ]}
      />
      <ToggleStyle type='inline' value='BOLD' Icon={Bold} />
      <ToggleStyle type='inline' value='ITALIC' Icon={Italic} />
      <ToggleStyle type='inline' value='UNDERLINE' Icon={Underlined} />
      <ToggleStyle type='inline' value='STRIKETHROUGH' Icon={Strikethrough} />
      <ToggleStyle type='inline' value='HIGHLIGHT' Icon={ColorFill} />
      <ToggleStyle type='block' value='blockquote' Icon={Quote} />
      <ToggleStyle type='block' value='ordered-list-item' Icon={ListOrdered} />
      <ToggleStyle type='block' value='unordered-list-item' Icon={ListBullet} />
      <ToolbarButton onClick={undo} Icon={Undo} />
      <ToolbarButton onClick={redo} Icon={Redo} />
    </>
  );
});

export default NoteActions;
