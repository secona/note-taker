import { createContext } from 'react';

export interface IDropdownValue {
  closeDropdown: () => void;
}

export const DropdownContext = createContext<IDropdownValue>({
  closeDropdown: () => {},
});
