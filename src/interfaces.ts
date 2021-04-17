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

export type Vector2 = [number, number];
