import React from 'react';

interface Props {
  onClick: () => void;
  icon: React.ReactNode;
}

const DropdownItem: React.FC<Props> = ({ onClick, icon, children }) => {
  return (
    <button
      className='flex space-x-2 min-w-full items-center cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md'
      onClick={onClick}
    >
      {icon}
      <p className='text-base'>{children}</p>
    </button>
  );
};

export default DropdownItem;
