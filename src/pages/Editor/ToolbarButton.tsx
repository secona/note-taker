import React from 'react';
import clsx from 'clsx';
import { IconType } from 'react-icons/lib';

interface Props {
  className?: string;
  iconSize?: number;
  active: boolean;
  Icon: IconType;
  onClick: () => void;
}

const ToolbarButton = (props: Props) => {
  const { className, Icon, active, iconSize = 24, ...otherProps } = props;

  return (
    <button
      className={clsx(
        'hover:bg-blue-600 rounded-md focus:outline-none p-1.5',
        className
      )}
      onMouseDown={e => e.preventDefault()}
      {...otherProps}
    >
      <Icon
        className={clsx(
          'fill-current',
          active ? 'text-blue-300' : 'text-white'
        )}
        size={iconSize}
      />
    </button>
  );
};

export default ToolbarButton;
