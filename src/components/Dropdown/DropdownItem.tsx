import React from 'react';

export interface DropdownItemProps {
  onClick: () => void;
  icon: React.ReactNode;
  closeOnClick?: boolean;
  closeDropdown?: () => void;
  children: string;
}

const DropdownItem = ({
  onClick,
  icon,
  children,
  closeOnClick,
  closeDropdown,
}: DropdownItemProps) => {
  return (
    <button
      className='flex w-full space-x-3 items-center cursor-pointer hover:bg-blue-50 focus:outline-none px-3 py-2 rounded-md'
      onClick={() => {
        onClick();
        if (closeOnClick) closeDropdown?.();
      }}
    >
      {icon}
      <p>{children}</p>
    </button>
  );
};

export default DropdownItem;
