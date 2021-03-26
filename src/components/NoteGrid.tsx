import React from 'react';

const NoteGrid: React.FC = props => {
  return (
    <div className='flex flex-wrap justify-center mt-5'>{props.children}</div>
  );
};

export default NoteGrid;
