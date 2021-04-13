import clsx from 'clsx';
import React from 'react';

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  color: 'primary' | 'secondary';
  icon?: React.ReactNode;
}

const Button = ({
  className,
  icon,
  children,
  color = 'primary',
  disabled,
  ...otherProps
}: Props) => {
  return (
    <button
      className={clsx(
        'inline-flex px-3 py-2 rounded-md space-x-1.5 focus:outline-none focus:ring fill-current',
        disabled && 'cursor-not-allowed',
        color === 'primary'
          ? 'bg-blue-500 hover:bg-blue-600 text-white'
          : 'border border-gray-200 hover:bg-gray-50 hover:border-transparent text-black',
        className
      )}
      disabled={disabled}
      {...otherProps}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;
