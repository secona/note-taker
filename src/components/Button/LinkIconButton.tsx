import clsx from 'clsx';
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { IconBaseProps } from 'react-icons/lib';

interface Props extends LinkProps {
  color: 'primary' | 'secondary';
  children: React.ReactElement<IconBaseProps>;
  disabled?: boolean;
}

const IconButton = ({
  color = 'primary',
  to,
  className,
  disabled,
  ...otherProps
}: Props) => {
  return (
    <Link
      to={to}
      className={clsx(
        'p-1.5 rounded-md focus:outline-none focus:ring fill-current',
        disabled && 'cursor-not-allowed pointer-events-none',
        color === 'primary'
          ? 'bg-blue-500 hover:bg-blue-600 text-white'
          : 'border border-gray-200 hover:bg-gray-50 hover:border-transparent text-black',
        className
      )}
      {...otherProps}
    />
  );
};

export default IconButton;
