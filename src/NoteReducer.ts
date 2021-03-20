import { EditorState } from 'draft-js';

export interface INote {
  title: string;
  note: EditorState;
}

export interface INotes {
  selectedNote: string;
  notes: { [id: string]: INote };
}

export type NoteAction =
  | { type: 'updateCurrentNote'; payload: EditorState }
  | { type: 'updateCurrentTitle'; payload: string }
  | { type: 'selectNote'; payload: string }
  | { type: 'closeNote' };

export const NoteReducer = (state: INotes, action: NoteAction) => {
  switch (action.type) {
    case 'updateCurrentTitle': {
      const newState = { ...state };
      newState.notes[state.selectedNote].title = action.payload;
      return newState;
    }

    case 'updateCurrentNote': {
      const newState = { ...state };
      newState.notes[state.selectedNote].note = action.payload;
      return newState;
    }

    case 'selectNote':
      return {
        ...state,
        selectedNote: action.payload,
      };

    case 'closeNote':
      return {
        ...state,
        selectedNote: '',
      };

    default:
      return state;
  }
};
