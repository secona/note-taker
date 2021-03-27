import React from 'react';
import ToolbarButton from './ToolbarButton';
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdStrikethroughS,
  MdFormatColorFill,
  MdUndo,
  MdRedo,
} from 'react-icons/md';

interface Props {
  toggleInlineStyle: (inlineStyle: string) => void;
  toggleBlockType: (blockType: string) => void;
  undo: () => void;
  redo: () => void;
}

const ToolbarButtons: React.FC<Props> = ({
  toggleInlineStyle,
  toggleBlockType,
  undo,
  redo,
}) => {
  return (
    <>
      <select
        onChange={e => toggleBlockType(e.target.value)}
        defaultValue='unstyled'
      >
        <option value='header-one'>Header One</option>
        <option value='header-two'>Header Two</option>
        <option value='header-three'>Header Three</option>
        <option value='header-four'>Header Four</option>
        <option value='header-five'>Header Five</option>
        <option value='header-six'>Header Six</option>
        <option value='unstyled'>Paragraph</option>
      </select>
      <ToolbarButton
        onClick={() => toggleInlineStyle('BOLD')}
        children={<MdFormatBold />}
      />
      <ToolbarButton
        onClick={() => toggleInlineStyle('ITALIC')}
        children={<MdFormatItalic />}
      />
      <ToolbarButton
        onClick={() => toggleInlineStyle('UNDERLINE')}
        children={<MdFormatUnderlined />}
      />
      <ToolbarButton
        onClick={() => toggleInlineStyle('STRIKETHROUGH')}
        children={<MdStrikethroughS />}
      />
      <ToolbarButton
        onClick={() => toggleInlineStyle('HIGHLIGHT')}
        children={<MdFormatColorFill />}
      />
      <ToolbarButton onClick={undo} children={<MdUndo />} />
      <ToolbarButton onClick={redo} children={<MdRedo />} />
    </>
  );
};

export default ToolbarButtons;
