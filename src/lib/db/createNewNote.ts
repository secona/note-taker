import { RawDraftContentState } from 'draft-js';
import localforage from 'localforage';
import { nanoid } from 'nanoid';
import { INote } from '../../interfaces';

/**
 * @returns id of the new note
 */
export async function newNote(): Promise<String> {
  const id = nanoid();
  await localforage.setItem<INote<RawDraftContentState>>(id, {
    title: '',
    note: { blocks: [], entityMap: {} },
  });
  return id;
}
