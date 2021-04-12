import clsx from 'clsx';
import React from 'react';
import { IconBaseProps } from 'react-icons/lib';

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  color: 'primary' | 'secondary';
  children: React.ReactElement<IconBaseProps>;
}

const IconButton = ({
  color = 'primary',
  children,
  className,
  disabled,
  ...otherProps
}: Props) => {
  return (
    <button
      className={clsx(
        'p-1.5 rounded-md focus:outline-none focus:ring',
        disabled && 'cursor-not-allowed',
        color === 'primary'
          ? 'bg-blue-500 hover:bg-blue-600'
          : 'border border-gray-200 hover:bg-gray-50 hover:border-transparent',
        className
      )}
      disabled={disabled}
      {...otherProps}
    >
      {React.cloneElement(children, {
        className: clsx(
          children.props.className,
          'fill-current',
          color === 'primary' ? 'text-white' : 'text-black'
        ),
      })}
    </button>
  );
};

export default IconButton;
