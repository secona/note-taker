import React from 'react';
import clsx from 'clsx';

interface Props extends React.ComponentPropsWithoutRef<'input'> {
  variant?: 'primary' | 'secondary';
  blurOnEnter?: boolean;
}

const TextInput = (props: Props) => {
  const {
    className,
    blurOnEnter,
    type,
    variant = 'primary',
    onKeyDown,
    ...otherProps
  } = props;
  const ref = React.useRef<HTMLInputElement>(null);

  return (
    <input
      ref={ref}
      className={clsx(
        'focus:outline-none',
        variant === 'primary'
          ? 'border border-gray-200 px-2 py-1 rounded focus:border-transparent focus:ring'
          : 'p-1 border-b',
        className
      )}
      onKeyDown={e => {
        if (e.key === 'Enter' && blurOnEnter) ref.current?.blur();
        onKeyDown?.(e);
      }}
      {...otherProps}
      type='text'
    />
  );
};

export default TextInput;
