import React from 'react';
import { IconBaseProps } from 'react-icons/lib';
import { DropdownItemProps } from './DropdownItem';
import Popup from '@components/Popup';
import { Vector2 } from 'src/interfaces';

interface Props {
  icon: React.ReactElement<IconBaseProps>;
  className?: string;
  buttonClassName?: string;
  dropdownFixed?: boolean;
  children: React.ReactElement<DropdownItemProps>[];
}

const Dropdown: React.FC<Props> = (props: Props) => {
  const { children, dropdownFixed, icon, className, buttonClassName } = props;

  const [open, setOpen] = React.useState(false);
  const [coords, setCoords] = React.useState<Vector2>([0, 0]);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords([rect.x, rect.y]);
    setOpen(!open);
  };

  return (
    <div className={className}>
      <button
        className={buttonClassName}
        onClick={handleClick}
        children={icon}
        /* TODO: can render icon and text like Button.tsx */
      />
      {open && (
        <Popup
          fixed={dropdownFixed}
          coords={coords}
          className='text-gray-700'
          onClickOutside={() => setOpen(false)}
          margin={10}
        >
          {React.Children.map(
            children,
            (child: React.ReactElement<DropdownItemProps>) =>
              React.cloneElement(child, { closeDropdown: () => setOpen(false) })
          )}
        </Popup>
      )}
    </div>
  );
};

export default Dropdown;
