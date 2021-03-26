import { ContentState } from 'draft-js';
import React from 'react';

interface Props {
  note: ContentState;
}

const NotePreview: React.FC<Props & React.ComponentPropsWithoutRef<'p'>> = ({
  note,
  ...otherProps
}) => {
  const noteInText = note.getPlainText();
  const preview = noteInText ? noteInText.substring(50) + '...' : '';
  return <p {...otherProps}>{preview}</p>;
};

export default NotePreview;
