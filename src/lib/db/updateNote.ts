import { RawDraftContentState } from 'draft-js';
import localforage from 'localforage';
import { INote } from '../../interfaces';

export async function updateNote(
  id: string,
  note: INote<RawDraftContentState>
) {
  return localforage.setItem<INote<RawDraftContentState>>(id, note);
}
