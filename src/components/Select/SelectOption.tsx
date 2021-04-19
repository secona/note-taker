import clsx from 'clsx';
import * as React from 'react';
import { Option } from './Select';

interface Props {
  option: Option;
  active: boolean;
  selectOpt: (value: string) => void;
  close: () => void;
}

const SelectOption = (props: Props) => {
  const { option, active, selectOpt, close } = props;

  const handleClick = () => {
    selectOpt(option.value);
    close();
  };

  return (
    <button
      className={clsx(
        'flex w-full space-x-2 text-sm items-center cursor-pointer hover:bg-gray-50 focus:outline-none px-2.5 py-1.5 rounded-md',
        active ? 'bg-blue-50' : 'bg-white'
      )}
      onClick={handleClick}
      onMouseDown={e => e.preventDefault()}
    >
      {option.Icon && <option.Icon size={24} className='fill-current' />}
      <p>{option.label}</p>
    </button>
  );
};

export default SelectOption;
