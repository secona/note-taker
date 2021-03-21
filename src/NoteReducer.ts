import { EditorState } from 'draft-js';

export interface INote {
  id: string;
  title: string;
  note: EditorState;
}

export type NoteAction =
  | { type: 'updateNote'; payload: EditorState }
  | { type: 'updateTitle'; payload: string }
  | { type: 'updateAll'; payload: { id?: string; title: string; note: EditorState } };

export const EmptyInitialValue: INote = {
  id: '',
  title: '',
  note: EditorState.createEmpty(),
};

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

    case 'updateAll':
      return {
        id: action.payload.id || state.id,
        title: action.payload.title,
        note: action.payload.note,
      };

    default:
      return state;
  }
};
