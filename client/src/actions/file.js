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

export const compareFilesSuccess = (data) => {
  return { type: COMPARE_FILES_SUCCESS, data }
}

export const compareFilesFailure = (error) => {
  return { type: COMPARE_FILES_FAILURE, error }
}

export function compareFiles(files, fileMode, meta) {
  return function(dispatch) {
    const responseData = {};
    postFiles(files, fileMode, meta, dispatch)
      .then(response => {
        if (response.ok) return response.json();
        const error = new Error('Network response was not OK');
        dispatch(compareFilesFailure(error))
        throw error;
      })
      .then(json => {
        const data = json.data;
        responseData.data = data;
        dispatch(compareFilesSuccess(data))
      })
      .catch(error => {
        dispatch(compareFilesFailure(error.message))
      });

    return responseData.data;
  }
}
