import React from 'react';
import DropdownItemContainer from './DropdownItemContainer';
import { DropdownContext } from '../../lib/DropdownContext';

interface Props {
  icon: React.ReactNode;
  className?: string;
  buttonClassName?: string;
}

const Dropdown: React.FC<Props> = ({
  children,
  icon,
  className,
  buttonClassName,
}) => {
  const node = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);

  const handleClick = (e: MouseEvent) => {
    if (!(node.current! as any).contains(e.target)) setOpen(false);
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className={className} ref={node}>
      <button
        className={buttonClassName}
        onClick={() => setOpen(!open)}
        children={icon}
      />
      {open && (
        <DropdownItemContainer>
          <DropdownContext.Provider
            value={{ closeDropdown: () => setOpen(false) }}
            children={children}
          />
        </DropdownItemContainer>
      )}
    </div>
  );
};

export default Dropdown;
