export interface DBHookReturnType<T> {
  value: T;
  loading: boolean;
  error: any;
}

export * from './useNoteState';
export * from './useAllNotesState';
export * from './newNote';
export * from './updateNote';
