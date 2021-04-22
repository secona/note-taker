import { RawDraftContentState } from 'draft-js';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import localforage from 'localforage';
import { Response } from '.';
import { INote, INoteWithId } from '../../interfaces';

export function useAllNotesState(): Response<
  [
    INoteWithId<RawDraftContentState>[],
    Dispatch<SetStateAction<INoteWithId<RawDraftContentState>[]>>
  ]
> {
  const [result, setResult] = useState<INoteWithId<RawDraftContentState>[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    const getNotes = async () => {
      try {
        const ids = await localforage.keys();
        let notes: INoteWithId<RawDraftContentState>[] = [];
        for (const id of ids) {
          const note = await localforage.getItem<INote<RawDraftContentState>>(
            id
          );
          if (note) notes.push({ id, ...note });
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
