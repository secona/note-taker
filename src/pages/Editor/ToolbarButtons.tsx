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
  MdFormatListNumbered,
  MdFormatListBulleted,
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
        active={false}
        onClick={() => toggleInlineStyle('BOLD')}
        Icon={MdFormatBold}
      />
      <ToolbarButton
        active={false}
        onClick={() => toggleInlineStyle('ITALIC')}
        Icon={MdFormatItalic}
      />
      <ToolbarButton
        active={false}
        onClick={() => toggleInlineStyle('UNDERLINE')}
        Icon={MdFormatUnderlined}
      />
      <ToolbarButton
        active={false}
        onClick={() => toggleInlineStyle('STRIKETHROUGH')}
        Icon={MdStrikethroughS}
      />
      <ToolbarButton
        active={false}
        onClick={() => toggleInlineStyle('HIGHLIGHT')}
        Icon={MdFormatColorFill}
      />
      <ToolbarButton
        active={false}
        onClick={() => toggleBlockType('ordered-list-item')}
        Icon={MdFormatListNumbered}
      />
      <ToolbarButton
        active={false}
        onClick={() => toggleBlockType('unordered-list-item')}
        Icon={MdFormatListBulleted}
      />
      <ToolbarButton active={false} onClick={undo} Icon={MdUndo} />
      <ToolbarButton active={false} onClick={redo} Icon={MdRedo} />
    </>
  );
};

export default ToolbarButtons;
