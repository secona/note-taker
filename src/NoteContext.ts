import { createContext, Dispatch } from 'react';
import { INotes, NoteAction } from './NoteReducer';

export type Notes = {
  state: INotes;
  dispatch: Dispatch<NoteAction>;
};

export const NoteContext = createContext<Notes | undefined>(undefined);
