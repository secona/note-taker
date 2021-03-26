import React from 'react';
import clsx from 'clsx';

const Fab: React.FC<React.ComponentPropsWithoutRef<'button'>> = ({
  className,
  ...otherProps
}) => (
  <button
    className={clsx(
      'bg-blue-700',
      'rounded-full p-2',
      'fixed bottom-5 right-5',
      'hover:outline-none',
      className
    )}
    {...otherProps}
  />
);

export default Fab;
