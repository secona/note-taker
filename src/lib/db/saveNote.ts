import { convertToRaw, RawDraftContentState } from 'draft-js';
import localforage from 'localforage';
import { INote } from '../note';

export async function SaveNote(id: string, note: INote) {
  const rawNote = convertToRaw(note.note.getCurrentContent());
  try {
    await localforage.setItem<INote<RawDraftContentState>>(id, {
      title: note.title,
      note: rawNote,
    });
    return 'success';
  } catch (err) {
    return 'error';
  }
}
