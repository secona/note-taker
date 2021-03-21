import React from 'react';

const NoteGrid: React.FC = props => {
  return <div className='flex flex-wrap justify-center'>{props.children}</div>;
};

export default NoteGrid;
