import React from 'react';
import clsx from 'clsx';

interface Props extends React.ComponentPropsWithoutRef<'input'> {
  variant?: 'primary' | 'secondary';
}

const TextInput = (props: Props) => {
  const { className, type, variant = 'primary', ...otherProps } = props;

  return (
    <input
      className={clsx(
        'focus:outline-none',
        variant === 'primary'
          ? 'border border-gray-200 px-2 py-1 rounded focus:border-transparent focus:ring'
          : 'p-1 border-b',
        className
      )}
      {...otherProps}
      type='text'
    />
  );
};

export default TextInput;
