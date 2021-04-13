import clsx from 'clsx';
import * as React from 'react';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import SelectOption from './SelectOption';
import SelectOptionsContainer from './SelectOptionsContainer';

export type Option = {
  value: string;
  label: string;
  icon?: React.ReactNode;
};

interface Props {
  options: Option[];
  selected: string;
  color?: 'primary' | 'secondary';
  buttonClassName?: string;
  className?: string;
}

const Select = (props: Props) => {
  const {
    selected,
    options,
    color = 'primary',
    buttonClassName,
    className,
  } = props;
  const node = React.useRef<HTMLDivElement>(null);
  const [selectedOpt, setSelectedOpt] = React.useState(selected);
  const [open, setOpen] = React.useState(false);

  const handleClick = (e: MouseEvent) => {
    if (!(node.current! as any).contains(e.target)) setOpen(false);
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const close = () => setOpen(false);

  return (
    <div className={className} ref={node}>
      <button
        className={clsx(
          'flex focus:outline-none items-center py-1.5 px-2.5 rounded-md',
          color === 'primary'
            ? 'bg-blue-500 hover:bg-blue-600 text-white'
            : 'border border-gray-200 hover:bg-gray-50 hover:border-transparent text-black',
          buttonClassName
        )}
        onClick={() => setOpen(!open)}
      >
        <p className='flex-grow'>
          {options.find(o => o.value === selectedOpt)?.label}
        </p>
        {open ? <MdArrowDropUp /> : <MdArrowDropDown />}
      </button>
      {open && (
        <SelectOptionsContainer>
          {options.map(option => (
            <SelectOption
              option={option}
              setSelectedOpt={setSelectedOpt}
              close={close}
            />
          ))}
        </SelectOptionsContainer>
      )}
    </div>
  );
};

export default Select;
