import { EditorState } from 'draft-js';

export interface INote<NoteType = EditorState> {
  title: string;
  note: NoteType;
  starred?: boolean;
}

export interface INoteWithId<NoteType = EditorState> extends INote<NoteType> {
  id: string;
}

export type Vector2 = [number, number];
