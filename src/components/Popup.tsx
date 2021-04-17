import * as React from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { Vector2 } from 'src/interfaces';
import getPopupCoords from '@utils/getPopupCoords';

const { useState, useCallback, useEffect } = React;

interface Props extends React.ComponentPropsWithoutRef<'div'> {
  fixed?: boolean;
  coords: Vector2;
  margin?: number;
  onClickOutside?: () => void;
}

const Popup = (props: Props) => {
  const {
    style,
    className,
    coords,
    fixed,
    margin = 0,
    onClickOutside,
    ...otherProps
  } = props;

  const [dimension, setDimension] = useState<Vector2>([0, 0]);
  const [ref, setRef] = useState<HTMLDivElement>();

  const onRefSet = useCallback((el: HTMLDivElement | null) => {
    if (el) {
      setRef(el);
      const { width, height } = el.getBoundingClientRect();
      setDimension([width, height]);
    }
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!(ref as any).contains(e.target)) {
        onClickOutside?.();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref, onClickOutside]);

  return createPortal(
    <div
      ref={onRefSet}
      className={clsx(
        'min-w-60 rounded-md bg-white shadow-lg z-50',
        fixed ? 'fixed' : 'absolute',
        className
      )}
      style={{ ...getPopupCoords(margin, coords, dimension), ...style }}
      {...otherProps}
    />,
    document.getElementById('portal')!
  );
};

export default Popup;
