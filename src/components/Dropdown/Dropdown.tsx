import React from 'react';
import DropdownItemContainer from './DropdownItemContainer';

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

  const closeDropdown = () => {
    if (open) setOpen(false);
  };

  // TODO: fix mouse down behaviour
  React.useEffect(() => {
    document.addEventListener('mousedown', closeDropdown);
    return () => document.removeEventListener('mousedown', closeDropdown);
  }, []);

  return (
    <div className={className} ref={node}>
      <button
        className={buttonClassName}
        onClick={() => setOpen(!open)}
        children={icon}
      />
      {open && <DropdownItemContainer>{children}</DropdownItemContainer>}
    </div>
  );
};

export default Dropdown;
