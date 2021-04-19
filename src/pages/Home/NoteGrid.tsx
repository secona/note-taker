import React from 'react';

interface Props {
  title: string;
}

const NoteGrid: React.FC<Props> = props => {
  return (
    <div className='mb-8'>
      <p className='text-lg uppercase py-0.5 my-2 border-b'>{props.title}</p>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {props.children}
      </div>
    </div>
  );
};

export default NoteGrid;
