import { EditorState } from 'draft-js';
import { useEffect, useState } from 'react';
import localforage from 'localforage';
import { fullConvertToState } from '@utils/fullConvertToState';
import { NoteInDB, NoteInfo, ReactSetState } from '../../interfaces';
import { DBHookReturnType } from './index';

export type NoteStateType = {
  info: [NoteInfo | undefined, ReactSetState<NoteInfo | undefined>];
  note: [EditorState | undefined, ReactSetState<EditorState | undefined>];
};

export function useNoteState(id: string): DBHookReturnType<NoteStateType> {
  const [noteInfo, setNoteInfo] = useState<NoteInfo>();
  const [noteValue, setNoteValue] = useState<EditorState>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const response = await localforage.getItem<NoteInDB>(id);
        if (response) {
          const note = fullConvertToState(response.note);
          setNoteInfo({ ...response });
          setNoteValue(note);
        }
        setLoading(false);
      } catch (err) {
        setError(err);
      }
    })();
  }, [id]);

  return {
    value: {
      info: [noteInfo, setNoteInfo],
      note: [noteValue, setNoteValue],
    },
    loading,
    error,
  };
}
