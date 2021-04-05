import clsx from 'clsx';
import React from 'react';

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  color: 'primary' | 'secondary';
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
        'p-1.5 rounded-md focus:outline-none focus:ring',
        disabled
          ? 'p-1.5 rounded-md bg-gray-200 cursor-not-allowed'
          : color === 'primary'
          ? 'bg-blue-500 hover:bg-blue-600'
          : 'border border-gray-200 hover:bg-gray-50 hover:border-transparent',
        className
      )}
      disabled={disabled}
      {...otherProps}
    />
  );
};

export default IconButton;
