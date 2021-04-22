import { EditorState, convertToRaw } from 'draft-js';

/**
 * convert EditorState to RawDraftContentState
 * @param editorState the EditorState you want to convert
 */
export function fullConvertToRaw(editorState: EditorState) {
  return convertToRaw(editorState.getCurrentContent());
}
