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

  const handleClickOutside = (e: MouseEvent) => {
    if ((node.current! as any).contains(e.target)) return;
    setOpen(false);
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
