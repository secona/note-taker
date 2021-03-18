import React from 'react';
import clsx from 'clsx';

const TextInput: React.FC<React.ComponentPropsWithoutRef<'input'>> = props => {
  const { className, type, ...otherProps } = props;

  return (
    <input
      className={clsx(
        'border border-gray-200',
        'px-2 py-1',
        'rounded',
        'focus:outline-none focus:border-transparent focus:ring',
        className
      )}
      {...otherProps}
      type='text'
    />
  );
};

export default TextInput;
