import { DefaultDraftBlockRenderMap } from 'draft-js';
import { Map } from 'immutable';
import * as wrappers from './wrappers';

export const blockRenderMap = DefaultDraftBlockRenderMap.merge(
  Map({
    'header-one': { element: 'h1', wrapper: wrappers.HeaderOne },
    'header-two': { element: 'h2', wrapper: wrappers.HeaderTwo },
    'header-three': { element: 'h3', wrapper: wrappers.HeaderThree },
    'header-four': { element: 'h4', wrapper: wrappers.HeaderFour },
    'header-five': { element: 'h5', wrapper: wrappers.HeaderFive },
    'header-six': { element: 'h6', wrapper: wrappers.HeaderSix },
  })
);
