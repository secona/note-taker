import { ContentState } from 'draft-js';
import React from 'react';

interface Props {
  note: ContentState;
}

type FullProps = Props & React.ComponentPropsWithoutRef<'p'>;

function Truncate(text: string, amount: number = 50): string {
  const length = text.length;
  if (length <= amount) return text;
  return text.substring(0, amount) + '...';
}

const NotePreview: React.FC<FullProps> = ({ note, ...otherProps }) => {
  return <p {...otherProps}>{Truncate(note.getPlainText())}</p>;
};

export default NotePreview;
