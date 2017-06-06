export const FILE_ADD = 'FILE_ADD';
export const FILE_ADD_SUCCESS = 'FILE_ADD_SUCCESS';
export const FILE_ADD_FAILURE = 'FILE_ADD_FAILURE';

export const COMPARE_FILES_SUCCESS = 'COMPARE_FILES_SUCCESS';
export const COMPARE_FILES_FAILURE = 'COMPARE_FILES_FAILURE';

const UPLOAD_ENDPOINT_BASE = 'http://localhost:3000/reporting_file_differ/diff/upload';
const CSV_MIME = 'text/csv';
const XLSX_MIME = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
const UPLOAD_ENDPOINT_MAP = {
  [CSV_MIME]: `${UPLOAD_ENDPOINT_BASE}-csv`,
  [XLSX_MIME]: `${UPLOAD_ENDPOINT_BASE}-xlsx`
}
const EXTENSION_MAP = {
  [CSV_MIME]: 'csv',
  [XLSX_MIME]: 'xlsx'
}

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

const REQUEST_OPTIONS = {
  method: 'POST',
  headers: new Headers({
    "Access-Control-Allow-Origin": '*',
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    "Accept": "application/json"
  })
};


export function compareFiles(files, fileMode, meta) {
  fileMode = fileMode || 'text/csv';

  return function(dispatch) {
    // postFiles(files, fileMode, meta, dispatch)
    const responseData = {};

    // const opts = { method: 'POST', headers: headers };
    return postFiles(files, fileMode, meta, dispatch).then(formData => {
      const request = new Request(UPLOAD_ENDPOINT_MAP[fileMode], { method: 'POST', body: formData });
    // const request = new Request('http://localhost:3000/reporting_file_differ/diff/upload-csv', REQUEST_OPTIONS);
      // request.body = formData;
      fetch(request)
        .then(response => {
          if (response.ok) return response.json();
          const error = new Error('Network response was not OK');
          dispatch(compareFilesFailure(error))
          throw error;
        })
        .then(json => {
          const data = json.data;
          responseData.data = data;
          return data;
          dispatch(compareFilesSuccess(data))
        })
        .catch(error => {
          dispatch(compareFilesFailure(error.message))
        });
    });
    debugger
    console.log("responseData", responseData);

    return responseData.data;
  }
}
