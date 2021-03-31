import clsx from 'clsx';
import React from 'react';
import { IconBaseProps } from 'react-icons/lib';
import { VscLoading } from 'react-icons/vsc';

const LoadingIcon: React.FC<IconBaseProps> = ({
  className,
  size,
  ...otherProps
}) => {
  return (
    <VscLoading
      className={clsx('animate-spin', className)}
      size={size || 24}
      {...otherProps}
    />
  );
};

export default LoadingIcon;
