import clsx from 'clsx';
import React from 'react';
import { IconBaseProps } from 'react-icons/lib';
import { VscLoading } from 'react-icons/vsc';

const LoadingIcon: React.FC<IconBaseProps> = ({
  className,
  size = 16,
  ...otherProps
}) => {
  return (
    <VscLoading
      className={clsx('animate-spin', className)}
      size={size}
      {...otherProps}
    />
  );
};

export default LoadingIcon;
