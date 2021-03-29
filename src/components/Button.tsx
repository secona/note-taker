import React from 'react';
import clsx from 'clsx';

const Button: React.FC<React.ComponentPropsWithoutRef<'button'>> = ({
  className,
  ...otherProps
}) => {
  return (
    <button
      className={clsx(
        'border border-gray-200',
        'px-2 py-1',
        'rounded',
        'focus:outline-none focus:border-transparent focus:ring',
        className
      )}
      {...otherProps}
    />
  );
};

export default Button;
