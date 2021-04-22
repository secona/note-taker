import { INoteWithId } from "src/interfaces";

type Notes = INoteWithId<any>[];

export interface FilteredNotes {
  starred: Notes;
  notStarred: Notes;
}

/**
 * @description filter notes to starred and not starred
 * @param notes note array to be filtered
 * @returns starred and not starred notes
 */
export function filterNotes(notes: Notes): FilteredNotes {
  let starred: Notes = [];
  let notStarred: Notes = [];

  notes.forEach(n => {
    n.starred
      ? starred.push(n)
      : notStarred.push(n);
  });

  return { starred, notStarred };
}