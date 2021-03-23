import { INote } from './note';
import { EditorState } from 'draft-js';

export type Data = { [id: string]: INote };

const data: Data = {
  j38H2jdUI19j2Yh: {
    title: 'My Note',
    note: EditorState.createEmpty(),
  },
  '2iD71hduOp0Qm4r': {
    title: 'Next Note',
    note: EditorState.createEmpty(),
  },
};

export function getAllData() {
  return data;
}

export function getDataById(id: string) {
  return data[id];
}
