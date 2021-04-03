import React from 'react';
import { DropdownContext } from '../../lib/DropdownContext';

interface Props {
  onClick: () => void;
  icon: React.ReactNode;
  closeOnClick?: boolean;
}

const DropdownItem: React.FC<Props> = ({
  onClick,
  icon,
  children,
  closeOnClick,
}) => {
  const { closeDropdown } = React.useContext(DropdownContext);
  return (
    <button
      className='flex space-x-2 min-w-full items-center cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md'
      onClick={() => {
        onClick();
        if (closeOnClick) closeDropdown();
      }}
    >
      {icon}
      <p className='text-base'>{children}</p>
    </button>
  );
};

export default DropdownItem;
