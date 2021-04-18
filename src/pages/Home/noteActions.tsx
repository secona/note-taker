import { Dispatch, SetStateAction } from 'react';
import localforage from 'localforage';
import { ContentState } from 'draft-js';
import { MdDelete, MdStar, MdStarBorder } from 'react-icons/md';
import { DropdownItemProps } from '@components/Dropdown/DropdownItem';
import { INoteWithId } from 'src/interfaces';

type NoteType = INoteWithId<ContentState>[];

/**
 * @description NoteCard's dropdown menu actions
 */
export const noteActions = (
  notes: NoteType,
  setNotes: Dispatch<SetStateAction<NoteType>>,
  id: string
) => {
  const actions: (() => DropdownItemProps)[] = [
    () => {
      const deleteNote = () => {
        localforage
          .removeItem(id)
          .then(() => setNotes(notes.filter(v => v.id !== id)))
          .catch(err => console.log(err));
      };

      return {
        closeOnClick: true,
        onClick: deleteNote,
        children: 'Delete note',
        icon: <MdDelete />,
      };
    },
    () => {
      const isStarred = notes.find(n => n.id === id)?.starred;
      const toggleStar = () => {
        setNotes(
          notes.map(note =>
            note.id === id ? { ...note, starred: !isStarred } : note
          )
        );
        // TODO: update notes in localforage
      };

      return {
        closeOnClick: true,
        onClick: toggleStar,
        children: isStarred ? 'Unstar note' : 'Star note',
        icon: isStarred ? <MdStar /> : <MdStarBorder />,
      };
    },
  ];

  return actions;
};
