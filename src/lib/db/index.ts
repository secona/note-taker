export interface Response<ResultType> {
  result: ResultType;
  loading: boolean;
  error: any;
}

export * from './useNoteState';
export * from './useAllNotes';
export * from './createNewNote';
export * from './saveNote';
