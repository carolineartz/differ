const CSV_MIME = 'text/csv';
const XLSX_MIME = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
const EXTENSION_MAP = {
  [CSV_MIME]: 'csv',
  [XLSX_MIME]: 'xlsx'
}
const COMPARE_ENDPOINT = 'http://localhost:3000/reporting_file_differ/diff/compare'; // FIXME: localhost
const CONVERT_ENDPOINT = 'http://localhost:3000/reporting_file_differ/diff/convert'; // FIXME: localhost


// API Action exports
// **********************************
export const FILES_SEND = 'FILES_SEND';
export const FILES_SEND_SUCCESS = 'FILES_SEND_SUCCESS';
export const FILES_SEND_FAILURE = 'FILES_SEND_FAILURE';

export const FILES_COMPARE_SUCCESS = 'FILES_COMPARE_SUCCESS';
export const FILES_COMPARE_FAILURE = 'FILES_COMPARE_FAILURE';

export const FILES_CONVERT_SUCCESS = 'FILES_CONVERT_SUCCESS';
export const FILES_CONVERT_FAILURE = 'FILES_CONVERT_FAILURE';

// -----------------------------------

export const sendFilesSuccess = (files) => {
  return { type: FILES_SEND_SUCCESS, files }
}

export const sendFilesFailure = (files, error) => {
  return { type: FILES_SEND_FAILURE, files, error }
}

export const compareFilesSuccess = (data) => {
  return { type: FILES_COMPARE_SUCCESS, data }
}

export const compareFilesFailure = (error) => {
  return { type: FILES_COMPARE_FAILURE, error }
}

export const convertFilesSuccess = (data) => {
  return { type: FILES_CONVERT_SUCCESS, data }
}

export const convertFilesFailure = (error) => {
  return { type: FILES_CONVERT_FAILURE, error }
}

export function compareFiles(files, mode, meta, dispatch) {
  dispatch({ type: FILES_SEND, files: files.map(f => f.name), meta: meta });
  const data = formData(files, mode, meta);
  const request = new Request(COMPARE_ENDPOINT, { method: 'POST', body: data });

  return postFiles(files, request, dispatch)
    .then(json => {
      return dispatch(compareFilesSuccess(json.data))
    })
    .catch(error => {
      return dispatch(compareFilesFailure(error.message))
    });
}

export function convertFiles(files, mode, dispatch) {
  dispatch({ type: FILES_SEND, files: files.map(f => f.name) });
  const meta = {mode}
  const data = formData(files, mode, meta);
  const request = new Request(CONVERT_ENDPOINT, { method: 'POST', body: data });

  return postFiles(files, request, dispatch)
    .then(json => {
      return dispatch(convertFilesSuccess(json.data))
    })
    .catch(error => {
      return dispatch(convertFilesFailure(error.message))
    })
}

// Helpers
// **************************************

function formData([file1, file2], mode, meta) {
  const data = new FormData();
  data.append(`file1.${EXTENSION_MAP[mode]}`, file1);
  data.append(`file2.${EXTENSION_MAP[mode]}`, file2);
  data.append('meta.json', JSON.stringify(meta))
  return data
}

function postFiles(files, request, dispatch) {
  return fetch(request)
    .then(response => {
      if (response.ok) {
        dispatch(sendFilesSuccess(files))
        return response.json();
      }
      else {
        const error = new Error('Network response was not OK');
        dispatch(sendFilesFailure(files, error))
        throw error;
      }
    })
}

// **************************************

