import clsx from 'clsx';
import React from 'react';
import { IconBaseProps } from 'react-icons/lib';

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  color: 'primary' | 'secondary';
  children: React.ReactElement<IconBaseProps>;
}

const IconButton = ({
  color = 'primary',
  className,
  disabled,
  ...otherProps
}: Props) => {
  return (
    <button
      className={clsx(
        'p-1.5 rounded-md focus:outline-none focus:ring fill-current',
        disabled && 'cursor-not-allowed',
        color === 'primary'
          ? 'bg-blue-500 hover:bg-blue-600 text-white'
          : 'border border-gray-200 hover:bg-gray-50 hover:border-transparent text-black',
        className
      )}
      disabled={disabled}
      {...otherProps}
    />
  );
};

export default IconButton;
