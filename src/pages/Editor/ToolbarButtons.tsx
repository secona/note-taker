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
import Select from '@components/Select/Select';

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
      <Select
        selected='unstyled'
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
