import { EditorState } from 'draft-js';

export interface INote<NoteType = EditorState> {
  title: string;
  note: NoteType;
}

export interface INoteWithId<NoteType = EditorState> {
  id: string;
  title: string;
  note: NoteType;
}

export const EmptyNote: INote = {
  title: '',
  note: EditorState.createEmpty(),
};
