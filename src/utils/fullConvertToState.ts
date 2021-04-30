import { convertFromRaw, EditorState, RawDraftContentState } from "draft-js";

/**
 * convert RawDraftContentState to EditorState
 * @param raw the RawDraftContentState you want to convert
 */
export function fullConvertToState(raw: RawDraftContentState) {
  return EditorState.createWithContent(convertFromRaw(raw))
}