import React from 'react';
import ToolbarButton from './ToolbarButton';
import {
  MdFormatBold as Bold,
  MdFormatItalic as Italic,
  MdFormatUnderlined as Underline,
  MdStrikethroughS as Strikethrough,
  MdFormatColorFill as ColorFill,
} from 'react-icons/md';

interface Props {
  toggleInlineStyle: (inlineStyle: string) => void;
}

const InlineStyleButtons: React.FC<Props> = ({ toggleInlineStyle }) => {
  return (
    <>
      <ToolbarButton
        onClick={() => toggleInlineStyle('BOLD')}
        children={<Bold />}
      />
      <ToolbarButton
        onClick={() => toggleInlineStyle('ITALIC')}
        children={<Italic />}
      />
      <ToolbarButton
        onClick={() => toggleInlineStyle('UNDERLINE')}
        children={<Underline />}
      />
      <ToolbarButton
        onClick={() => toggleInlineStyle('STRIKETHROUGH')}
        children={<Strikethrough />}
      />
      <ToolbarButton
        onClick={() => toggleInlineStyle('HIGHLIGHT')}
        children={<ColorFill />}
      />
    </>
  );
};

export default InlineStyleButtons;
