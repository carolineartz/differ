export const FILE_ADD = 'FILE_ADD';
export const FILE_ADD_SUCCESS = 'FILE_ADD_SUCCESS';
export const FILE_ADD_FAILURE = 'FILE_ADD_FAILURE';

export function addFile(file) {
  return { type: FILE_ADD, file: file };
}

export function addFileSuccess(file) {
  return { type: FILE_ADD_SUCCESS, file: file }
}

export function addFileFailure(file, error) {
  return { type: FILE_ADD_FAILURE, file: file, error: error }
}
