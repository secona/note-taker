import { EditorState } from 'draft-js';

export interface INote {
  title: string;
  note: EditorState;
}

export const EmptyNote: INote = {
  title: '',
  note: EditorState.createEmpty(),
};
