import { ContentState, convertFromRaw, RawDraftContentState } from 'draft-js';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import localforage from 'localforage';
import { Response } from '.';
import { INote, INoteWithId } from '../note';

export function useAllNotesState(): Response<
  [
    INoteWithId<ContentState>[],
    Dispatch<SetStateAction<INoteWithId<ContentState>[]>>
  ]
> {
  const [result, setResult] = useState<INoteWithId<ContentState>[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    const getNotes = async () => {
      try {
        const ids = await localforage.keys();
        let notes: INoteWithId<ContentState>[] = [];
        for (const id of ids) {
          const rawNote = await localforage.getItem<
            INote<RawDraftContentState>
          >(id);
          if (rawNote) {
            const note = convertFromRaw(rawNote.note);
            notes.push({ id, title: rawNote.title, note });
          }
        }
        setResult(notes);
        setLoading(false);
      } catch (err) {
        setError(err);
      }
    };
    getNotes();
  }, []);

  return { result: [result, setResult], loading, error };
}
