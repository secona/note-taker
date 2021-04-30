import localforage from 'localforage';
import { nanoid } from 'nanoid';
import { NoteInDB } from '../../interfaces';

/** @returns id of the new note */
export async function newNote(): Promise<String> {
  const id = nanoid();
  await localforage.setItem<NoteInDB>(id, {
    title: '',
    note: { blocks: [], entityMap: {} },
  });
  return id;
}
