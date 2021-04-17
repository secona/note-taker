import clsx from 'clsx';
import * as React from 'react';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import SelectOption from './SelectOption';
import Popup from '@components/Popup';
import { Vector2 } from 'src/interfaces';

export type Option = {
  value: string;
  label: string;
  icon?: React.ReactNode;
};

interface Props {
  options: Option[];
  value: string;
  color?: 'primary' | 'secondary';
  buttonClassName?: string;
  className?: string;
  onChange?: (value: string) => void;
}

const Select = (props: Props) => {
  const {
    value,
    options,
    color = 'primary',
    buttonClassName,
    className,
    onChange,
  } = props;

  const [open, setOpen] = React.useState(false);
  const [coords, setCoords] = React.useState<Vector2>([0, 0]);

  const selectOpt = (newValue: string) => {
    if (onChange) onChange(newValue);
  };

  const close = () => setOpen(false);

  return (
    <div className={className}>
      <button
        className={clsx(
          'flex focus:outline-none items-center py-1.5 px-2.5 rounded-md',
          color === 'primary'
            ? 'bg-blue-500 hover:bg-blue-600 text-white'
            : 'border border-gray-200 hover:bg-gray-50 hover:border-transparent text-black',
          buttonClassName
        )}
        onMouseDown={e => e.preventDefault()}
        onClick={e => {
          const rect = e.currentTarget.getBoundingClientRect();
          setCoords([rect.x, rect.y]);
          setOpen(!open);
        }}
      >
        <p className='flex-grow'>
          {options.find(o => o.value === value)?.label}
        </p>
        {open ? <MdArrowDropUp /> : <MdArrowDropDown />}
      </button>
      {open && (
        <Popup
          fixed
          coords={coords}
          onClickOutside={() => setOpen(false)}
          margin={10}
        >
          {options.map(option => (
            <SelectOption option={option} selectOpt={selectOpt} close={close} />
          ))}
        </Popup>
      )}
    </div>
  );
};

export default Select;
