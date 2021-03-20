import clsx from 'clsx';
import React from 'react';

const Button: React.FC<React.ComponentPropsWithoutRef<'button'>> = props => {
  const { className, ...otherProps } = props;

  return (
    <button
      className={clsx(
        'bg-indigo-600 rounded p-1',
        'focus:outline-none focus:ring',
        className
      )}
      {...otherProps}
    />
  );
};

export default Button;
