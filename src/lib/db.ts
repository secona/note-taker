import { Dispatch, useEffect, useState, SetStateAction } from 'react';
import localforage from 'localforage';
import { nanoid } from 'nanoid';
import {
  EditorState,
  convertFromRaw,
  convertToRaw,
  RawDraftContentState,
  ContentState,
} from 'draft-js';
import { INote, INoteWithId } from './note';

export interface Response<ResultType> {
  result: ResultType;
  loading: boolean;
  error: any;
}

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
        const rawNote = await localforage.getItem<INote<RawDraftContentState>>(
          id
        );
        if (rawNote) {
          const { title } = rawNote;
          const note = EditorState.createWithContent(
            convertFromRaw(rawNote.note)
          );
          setResult({ title, note });
        }
        setLoading(false);
      } catch (err) {
        setError(err);
      }
    };

    getNote();
  }, []);

  return {
    result: [result, setResult],
    loading,
    error,
  };
}

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

/**
 * @returns id of the new note
 */
export async function CreateNewNote(): Promise<String> {
  const id = nanoid();
  await localforage.setItem<INote<RawDraftContentState>>(id, {
    title: '',
    note: { blocks: [], entityMap: {} },
  });
  return id;
}

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
