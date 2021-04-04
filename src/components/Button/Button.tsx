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
  ...otherProps
}: Props) => {
  return (
    <button
      className={clsx(
        'inline-flex px-3 py-2 rounded-md space-x-1.5 focus:outline-none focus:ring',
        color === 'primary'
          ? 'bg-blue-500 hover:bg-blue-600'
          : 'border border-gray-200 hover:bg-gray-50 hover:border-transparent',
        className
      )}
      {...otherProps}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;
