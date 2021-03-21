import { INote } from '../NoteReducer';
import { EditorState } from 'draft-js';

const data: INote[] = [
  {
    id: 'j38H2jdUI19j2Yh',
    title: 'My Note',
    note: EditorState.createEmpty(),
  },
  {
    id: '2iD71hduOp0Qm4r',
    title: 'Next Note',
    note: EditorState.createEmpty(),
  },
];

export function getAllData() {
  return data;
}

export function getDataById(id: string) {
  return data.find(note => note.id === id);
}
