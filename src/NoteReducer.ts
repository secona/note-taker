import { EditorState } from 'draft-js';

export interface INote {
  title: string;
  note: EditorState;
}

export type NoteAction =
  | { type: 'updateNote'; payload: EditorState }
  | { type: 'updateTitle'; payload: string };

export const NoteReducer = (state: INote, action: NoteAction) => {
  switch (action.type) {
    case 'updateTitle':
      return {
        ...state,
        title: action.payload,
      };

    case 'updateNote':
      return {
        ...state,
        note: action.payload,
      };

    default:
      return state;
  }
};
