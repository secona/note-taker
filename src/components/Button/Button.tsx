import clsx from 'clsx';
import React from 'react';

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  color: 'primary' | 'secondary';
  icon?: React.ReactNode;
}

const Button = ({
  className,
  icon,
  children,
  color = 'primary',
  disabled,
  ...otherProps
}: Props) => {
  return (
    <button
      className={clsx(
        'inline-flex px-3 py-2 rounded-md space-x-1.5 focus:outline-none focus:ring',
        disabled
          ? 'bg-gray-200 cursor-not-allowed'
          : color === 'primary'
          ? 'bg-blue-500 hover:bg-blue-600'
          : 'border border-gray-200 hover:bg-gray-50 hover:border-transparent',
        className
      )}
      disabled={disabled}
      {...otherProps}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;

/*
Both: inline-flex space-x-1.5 bg-gray-200 cursor-not-allowed
Text: bg-gray-200 cursor-not-allowed

<!-- Text -->
<button class="px-3 py-1.5 rounded-md bg-gray-200 cursor-not-allowed" disabled>
  Hello World
</button>

<!-- Icon -->
<button class="p-1.5 rounded-md bg-gray-200 cursor-not-allowed" disabled>
  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
  </svg>
</button>

<!-- Both -->
<button class="inline-flex space-x-1.5 px-3 py-2 rounded-md bg-gray-200 cursor-not-allowed" disabled>
  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
  </svg>
  <p class="text-black">New Note</p>
</button>
*/
