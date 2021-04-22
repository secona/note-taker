import { convertFromRaw, EditorState, RawDraftContentState } from 'draft-js';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import localforage from 'localforage';
import { INote } from '../../interfaces';
import { Response } from './index';

export function useNoteState(
  id: string
): Response<[INote | null, Dispatch<SetStateAction<INote | null>>]> {
  const [result, setResult] = useState<INote | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    const getNote = async () => {
      try {
        const response = await localforage.getItem<INote<RawDraftContentState>>(
          id
        );
        if (response) {
          const note = EditorState.createWithContent(
            convertFromRaw(response.note)
          );
          setResult({ ...response, note });
        }
        setLoading(false);
      } catch (err) {
        setError(err);
      }
    };

    getNote();
  }, [id]);

  return {
    result: [result, setResult],
    loading,
    error,
  };
}
