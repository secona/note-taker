import React from 'react';

const NoteGrid: React.FC = props => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>{props.children}</div>
  );
};

export default NoteGrid;
