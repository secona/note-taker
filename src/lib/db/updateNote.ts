import localforage from 'localforage';
import { NoteInDB } from '../../interfaces';

export async function updateNote(id: string, note: NoteInDB) {
  return localforage.setItem<NoteInDB>(id, note);
}
