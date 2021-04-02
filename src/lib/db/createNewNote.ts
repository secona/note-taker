import { RawDraftContentState } from 'draft-js';
import localforage from 'localforage';
import { nanoid } from 'nanoid';
import { INote } from '../note';

/**
 * @returns id of the new note
 */
export async function CreateNewNote(): Promise<String> {
  const id = nanoid();
  await localforage.setItem<INote<RawDraftContentState>>(id, {
    title: '',
    note: { blocks: [], entityMap: {} },
  });
  return id;
}
