import React from 'react';
import { IconType } from 'react-icons/lib';

export interface DropdownItemProps {
  onClick: () => void;
  Icon?: IconType;
  closeOnClick?: boolean;
  closeDropdown?: () => void;
  children: string;
}

const DropdownItem = ({
  onClick,
  Icon,
  children,
  closeOnClick,
  closeDropdown,
}: DropdownItemProps) => {
  return (
    <button
      className='flex w-full space-x-2 text-sm items-center cursor-pointer hover:bg-gray-50 focus:outline-none px-2.5 py-1.5 rounded-md'
      onClick={() => {
        onClick();
        if (closeOnClick) closeDropdown?.();
      }}
    >
      {Icon && <Icon size={24} className='fill-current text-gray-500' />}
      <p>{children}</p>
    </button>
  );
};

export default DropdownItem;
