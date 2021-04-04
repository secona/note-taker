import React from 'react';
import clsx from 'clsx';

const DropdownItemContainer: React.FC<
  React.ComponentPropsWithoutRef<'div'>
> = ({ className, ...otherProps }) => {
  return (
    <div
      className={clsx(
        'absolute min-w-60 rounded-md bg-white shadow-md',
        className
      )}
      {...otherProps}
    />
  );
};

export default DropdownItemContainer;
