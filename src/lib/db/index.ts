export interface Response<ResultType> {
  result: ResultType;
  loading: boolean;
  error: any;
}

export * from './useNoteState';
export * from './useAllNotesState';
export * from './createNewNote';
export * from './updateNote';
