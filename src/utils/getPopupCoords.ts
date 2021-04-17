import clamp from './clamp';
import { Vector2 } from 'src/interfaces';

export default function getPopupCoords(
  margin: number = 0,
  coords: Vector2,
  elementDimension: Vector2
) {
  return {
    left:
      clamp(
        coords[0] + document.documentElement.scrollLeft,
        margin,
        document.body.scrollWidth - elementDimension[0] - margin
      ) + 'px',
    top:
      clamp(
        coords[1] + document.documentElement.scrollTop,
        margin,
        document.body.scrollHeight - elementDimension[1] - margin
      ) + 'px',
  };
}
