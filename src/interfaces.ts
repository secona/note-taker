import { RawDraftContentState } from 'draft-js';
import { Dispatch, SetStateAction } from 'react';

/** contains note informations */
export interface NoteInfo {
  id?: string;
  title: string;
  starred?: boolean;
}

/** note type in database */
export interface NoteInDB extends NoteInfo {
  note: RawDraftContentState;
}

export type ReactSetState<T> = Dispatch<SetStateAction<T>>;

export type Vector2 = [number, number];
