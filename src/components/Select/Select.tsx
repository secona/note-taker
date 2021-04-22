import clsx from 'clsx';
import * as React from 'react';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { IconType } from 'react-icons/lib';
import SelectOption from './SelectOption';
import Popup from '@components/Popup';
import { Vector2 } from 'src/interfaces';

export type Option = {
  value: string;
  label: string;
  Icon?: IconType;
};

interface Props {
  options: Option[];
  value: string;
  color?: 'primary' | 'secondary';
  buttonClassName?: string;
  className?: string;
  onChange?: (value: string) => void;
  dropdownFixed?: boolean;
}

const Select = (props: Props) => {
  const {
    value,
    options,
    color = 'primary',
    buttonClassName,
    className,
    onChange,
    dropdownFixed,
  } = props;

  const [open, setOpen] = React.useState(false);
  const [coords, setCoords] = React.useState<Vector2>([0, 0]);

  const selectOpt = React.useCallback(
    (newValue: string) => {
      if (onChange) onChange(newValue);
    },
    [onChange]
  );

  const close = React.useCallback(() => setOpen(false), [setOpen]);
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords([rect.x, rect.y]);
    setOpen(prev => !prev);
  };

  return (
    <div className={className}>
      <button
        className={clsx(
          'flex focus:outline-none items-center rounded-md',
          color === 'primary'
            ? 'bg-blue-500 hover:bg-blue-600 text-white'
            : 'border border-gray-200 hover:bg-gray-50 hover:border-transparent text-black',
          buttonClassName
        )}
        onMouseDown={e => e.preventDefault()}
        onClick={handleClick}
      >
        <p className='flex-grow'>
          {options.find(o => o.value === value)?.label}
        </p>
        {open ? <MdArrowDropUp /> : <MdArrowDropDown />}
      </button>
      {open && (
        <Popup
          fixed={dropdownFixed}
          coords={coords}
          className='text-gray-700'
          onClickOutside={() => setOpen(false)}
          margin={10}
        >
          {options.map((option, idx) => (
            <SelectOption
              key={idx}
              active={value === option.value}
              option={option}
              selectOpt={selectOpt}
              close={close}
            />
          ))}
        </Popup>
      )}
    </div>
  );
};

export default Select;
