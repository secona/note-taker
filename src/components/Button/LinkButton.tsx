import clsx from 'clsx';
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { IconBaseProps } from 'react-icons/lib';

interface Props extends LinkProps {
  color?: 'primary' | 'secondary';
  icon?: React.ReactElement<IconBaseProps>;
  children: string;
  disabled?: boolean;
}

const Button = ({
  className,
  to,
  icon,
  children,
  color = 'primary',
  disabled,
  ...otherProps
}: Props) => {
  return (
    <Link
      to={to}
      className={clsx(
        'inline-flex px-2.5 py-1.5 rounded-md space-x-1.5 focus:outline-none focus:ring fill-current',
        disabled && 'cursor-not-allowed pointer-events-none',
        color === 'primary'
          ? 'bg-blue-500 hover:bg-blue-600 text-white'
          : 'border border-gray-200 hover:bg-gray-50 hover:border-transparent text-black',
        className
      )}
      {...otherProps}
    >
      {icon}
      <p>{children}</p>
    </Link>
  );
};

export default Button;
