import * as React from 'react';
import LoadingIcon from '@components/LoadingIcon';

export const Loading = () => {
  return (
    <div className='h-screen flex justify-center items-center'>
      <LoadingIcon size={64} className='animate-spin' />
    </div>
  );
};
