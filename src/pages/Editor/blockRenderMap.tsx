import { DefaultDraftBlockRenderMap } from 'draft-js';
import { Map } from 'immutable';

export const HeaderOne = <p className='text-5xl' />;
export const HeaderTwo = <p className='text-4xl' />;
export const HeaderThree = <p className='text-3xl' />;
export const HeaderFour = <p className='text-2xl' />;
export const HeaderFive = <p className='text-xl' />;
export const HeaderSix = <p className='text-lg' />;

export const blockRenderMap = DefaultDraftBlockRenderMap.merge(
  Map({
    'header-one': { element: 'h1', wrapper: HeaderOne },
    'header-two': { element: 'h2', wrapper: HeaderTwo },
    'header-three': { element: 'h3', wrapper: HeaderThree },
    'header-four': { element: 'h4', wrapper: HeaderFour },
    'header-five': { element: 'h5', wrapper: HeaderFive },
    'header-six': { element: 'h6', wrapper: HeaderSix },
  })
);
