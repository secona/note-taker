import { useEffect, useState } from 'react';
import localforage from 'localforage';
import { DBHookReturnType } from './index';
import { NoteInDB, ReactSetState } from '../../interfaces';

type Result = [NoteInDB[], ReactSetState<NoteInDB[]>];

export function useAllNotesState(): DBHookReturnType<Result> {
  const [response, setResponse] = useState<NoteInDB[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const ids = await localforage.keys();
        let notes: NoteInDB[] = [];
        for (const id of ids) {
          const note = await localforage.getItem<NoteInDB>(id);
          if (note) notes.push({ id, ...note });
        }
        setResponse(notes);
        setLoading(false);
      } catch (err) {
        setError(err);
      }
    })();
  }, []);

  return { value: [response, setResponse], loading, error };
}
