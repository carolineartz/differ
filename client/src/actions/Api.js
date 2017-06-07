const CSV_MIME = 'text/csv';
const XLSX_MIME = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
const EXTENSION_MAP = {
  [CSV_MIME]: 'csv',
  [XLSX_MIME]: 'xlsx'
}
const UPLOAD_ENDPOINT_BASE = 'http://localhost:3000/reporting_file_differ/diff/upload'; // FIXME: localhost
const UPLOAD_ENDPOINT_MAP = {
  [CSV_MIME]: `${UPLOAD_ENDPOINT_BASE}-csv`,
  [XLSX_MIME]: `${UPLOAD_ENDPOINT_BASE}-xlsx`
}

// API Action exports
// **********************************
export const FILES_SEND = 'FILES_SEND';
export const FILES_COMPARE_SUCCESS = 'FILES_COMPARE_SUCCESS';
export const FILES_COMPARE_FAILURE = 'FILES_COMPARE_FAILURE';

export const compareFilesSuccess = (data) => {
  return { type: FILES_COMPARE_SUCCESS, data }
}

export const compareFilesFailure = (error) => {
  return { type: FILES_COMPARE_FAILURE, error }
}

export function compareFiles(files, mode, meta) {
  mode = mode || 'text/csv'; // FIXME
  return (dispatch) => postFiles(files, mode, meta, dispatch);
}

// Helpers
// **************************************
function formData([file1, file2], meta, mode) {
  const data = new FormData();
  data.append(`file1.${EXTENSION_MAP[mode]}`, file1);
  data.append(`file2.${EXTENSION_MAP[mode]}`, file2);
  data.append('meta.json', JSON.stringify(meta))
  return data
}

function postFiles(files, mode, meta, dispatch) {
  dispatch({ type: FILES_SEND, files: files.map(f => f.name), meta: meta });
  const data = formData(files, meta, mode);
  const request = new Request(UPLOAD_ENDPOINT_MAP[mode], { method: 'POST', body: data });

  return fetch(request)
    .then(response => {
      if (response.ok) return response.json();
      const error = new Error('Network response was not OK');
      dispatch(compareFilesFailure(error)) // this could be a separate network send failure action
      throw error;
    })
    .then(json => {
      return dispatch(compareFilesSuccess(json.data))
    })
    .catch(error => {
      return dispatch(compareFilesFailure(error.message))
    });
}


