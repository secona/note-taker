import * as React from 'react';
import { Option } from './Select';

interface Props {
  option: Option;
  setSelectedOpt: React.Dispatch<React.SetStateAction<string>>;
  close: () => void;
}

const SelectOption = (props: Props) => {
  const { option, setSelectedOpt, close } = props;

  const handleClick = () => {
    setSelectedOpt(option.value);
    close();
  };

  return (
    <button
      className='flex w-full space-x-3 items-center cursor-pointer hover:bg-blue-50 focus:outline-none px-3 py-2 rounded-md'
      onClick={handleClick}
    >
      {option.icon}
      <p>{option.label}</p>
    </button>
  );
};

export default SelectOption;
