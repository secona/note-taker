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
      className='flex w-full space-x-3 items-center cursor-pointer hover:bg-gray-50 focus:outline-none px-3 py-2 rounded-md'
      onClick={() => {
        onClick();
        if (closeOnClick) closeDropdown();
      }}
    >
      {icon}
      <p>{children}</p>
    </button>
  );
};

export default DropdownItem;
