import * as React from 'react';
import { MdArrowBack } from 'react-icons/md';
import { LinkButton } from '@components/Button';

export const Error = () => {
  return (
    <div className='h-screen flex justify-center items-center flex-col space-y-5'>
      <div className='bg-white px-10 py-3 text-center rounded-lg shadow-lg'>
        <p className='text-2xl font-black mb-2.5'>ERROR!</p>
        <p className='text-sm'>An error occured. Try refreshing the page!</p>
      </div>
      <LinkButton to='/' icon={<MdArrowBack size={24} />}>
        Back
      </LinkButton>
    </div>
  );
};
