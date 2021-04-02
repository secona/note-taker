import React from 'react';
import clsx from 'clsx';

const DropdownItemContainer: React.FC<
  React.ComponentPropsWithoutRef<'div'>
> = ({ className, ...otherProps }) => {
  return (
    <div
      className={clsx(
        'absolute rounded-md min-w-min shadow-sm bg-white',
        className
      )}
      {...otherProps}
    />
  );
};

export default DropdownItemContainer;
