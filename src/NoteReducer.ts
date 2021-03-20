import { EditorState } from 'draft-js';

export interface INote {
  title: string;
  note: EditorState;
}

export interface INotes {
  selectedNote: number | null;
  notes: INote[];
}

export type NoteAction =
  | { type: 'updateCurrentNote'; payload: EditorState }
  | { type: 'updateCurrentTitle'; payload: string }
  | { type: 'selectNote'; payload: number }
  | { type: 'closeNote' };

export const NoteReducer = (state: INotes, action: NoteAction) => {
  switch (action.type) {
    case 'updateCurrentTitle':
      if (state.selectedNote === null) return state;
      else {
        var notes = [...state.notes];
        notes[state.selectedNote] = {
          ...notes[state.selectedNote],
          title: action.payload,
        };
        return {
          ...state,
          notes,
        };
      }

    case 'updateCurrentNote':
      if (state.selectedNote === null) return state;
      else {
        var notes = [...state.notes];
        notes[state.selectedNote] = {
          ...notes[state.selectedNote],
          note: action.payload,
        };
        return {
          ...state,
          notes,
        };
      }

    case 'selectNote':
      return {
        ...state,
        selectedNote: action.payload,
      };

    case 'closeNote':
      return {
        ...state,
        selectedNote: null,
      };

    default:
      return state;
  }
};
