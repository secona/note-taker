import { ContentState, convertFromRaw, RawDraftContentState } from 'draft-js';
import { useEffect, useState } from 'react';
import localforage from 'localforage';
import { Response } from '../db';
import { INote, INoteWithId } from '../note';

export function useAllNotes(): Response<INoteWithId<ContentState>[]> {
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

  return { result, loading, error };
}
