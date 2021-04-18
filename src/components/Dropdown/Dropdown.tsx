import React from 'react';
import { DropdownItemProps } from './DropdownItem';
import Popup from '@components/Popup';
import { Vector2 } from 'src/interfaces';

interface Props {
  icon: React.ReactNode;
  className?: string;
  buttonClassName?: string;
  children: React.ReactElement<DropdownItemProps>[];
}

const Dropdown: React.FC<Props> = (props: Props) => {
  const { children, icon, className, buttonClassName } = props;

  const [open, setOpen] = React.useState(false);
  const [coords, setCoords] = React.useState<Vector2>([0, 0]);

  return (
    <div className={className}>
      <button
        className={buttonClassName}
        onClick={e => {
          const rect = e.currentTarget.getBoundingClientRect();
          setCoords([rect.x, rect.y]);
          setOpen(!open);
        }}
        children={icon}
      />
      {open && (
        <Popup
          coords={coords}
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
