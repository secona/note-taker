import React from 'react';
import clsx from 'clsx';

const ToolbarButton: React.FC<
  React.ComponentPropsWithoutRef<'button'>
> = props => {
  const { className, ...otherProps } = props;

  return (
    <button
      className={clsx(
        'border border-gray-200',
        'rounded',
        'focus:outline-none focus:ring focus:border-transparent',
        className
      )}
      {...otherProps}
    />
  );
};

export default ToolbarButton;
