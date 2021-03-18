import { EditorState } from 'draft-js';

export interface INote {
  title: string;
  preview: string;
}

export type NoteAction =
  | { type: 'updateNote'; payload: EditorState }
  | { type: 'updateTitle'; payload: string };
