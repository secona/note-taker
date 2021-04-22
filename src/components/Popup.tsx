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
  withBackground?: boolean;
  onClickOutside?: () => void;
}

/**
 * if `withBackground` is true, `fixed` is automatically true
 * @reason When the user scrolls down, the popup doesn't get out of screen leaving a dark screen
 */
const Popup = (props: Props) => {
  const {
    style,
    className,
    coords,
    fixed,
    margin = 0,
    onClickOutside,
    withBackground,
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

  /** Wrapper for the popup */
  const Wrapper: React.FC = useCallback(
    props =>
      withBackground ? (
        <div
          className='fixed w-screen h-screen bg-black bg-opacity-40'
          {...props}
        />
      ) : (
        <React.Fragment {...props} />
      ),
    [withBackground]
  );

  return createPortal(
    <Wrapper>
      <div
        ref={onRefSet}
        className={clsx(
          'rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50',
          withBackground || fixed ? 'fixed' : 'absolute',
          className
        )}
        style={{ ...getPopupCoords(margin, coords, dimension), ...style }}
        {...otherProps}
      />
    </Wrapper>,
    document.getElementById('portal')!
  );
};

export default Popup;
