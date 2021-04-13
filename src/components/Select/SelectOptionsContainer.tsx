import * as React from 'react';
import clsx from 'clsx';

type Props = React.ComponentPropsWithoutRef<'div'>;

const SelectOptionsContainer = ({ className, ...otherProps }: Props) => {
  return (
    <div
      className={clsx(
        'absolute min-w-60 rounded-md bg-white shadow-lg',
        className
      )}
      {...otherProps}
    />
  );
};

export default SelectOptionsContainer;
