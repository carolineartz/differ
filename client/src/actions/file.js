export const FILE_ADD = 'FILE_ADD';
export const FILE_ADD_SUCCESS = 'FILE_ADD_SUCCESS';
export const FILE_ADD_FAILURE = 'FILE_ADD_FAILURE';

export const COMPARE_FILES_SUCCESS = 'COMPARE_FILES_SUCCESS';
export const COMPARE_FILES_FAILURE = 'COMPARE_FILES_FAILURE';

import { postFiles } from './Api';

export function addFile(file) {
  return { type: FILE_ADD, file: file };
}

export function addFileSuccess(file) {
  return { type: FILE_ADD_SUCCESS, file: file }
}

export function addFileFailure(file, error) {
  return { type: FILE_ADD_FAILURE, file: file, error: error }
}

export function compareFiles(files, fileMode, meta) {
  fileMode = fileMode || 'text/csv'; // FIXME
  return (dispatch) => postFiles(files, fileMode, meta, dispatch);
}
