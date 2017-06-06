const UPLOAD_ENDPOINT_BASE = 'http://localhost:3000/reporting_file_differ/diff/upload';
const CSV_MIME = 'text/csv';
const XLSX_MIME = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
const UPLOAD_ENDPOINT_MAP = {
  [CSV_MIME]: `${UPLOAD_ENDPOINT_BASE}-csv`,
  [XLSX_MIME]: `${UPLOAD_ENDPOINT_BASE}-xlsx`
}
// const EXTENSION_MAP = {
//   [CSV_MIME]: 'csv',
//   [XLSX_MIME]: 'xlsx'
// }
//
export const FILES_SEND = 'FILES_SEND';

const formData = ([file1, file2], meta) => {
  const data = new FormData();
  data.append('file1.csv', file1);
  data.append('file2.csv', file2);
  data.append('meta.json', JSON.stringify(meta))
  return data
}

export const COMPARE_FILES_SUCCESS = 'COMPARE_FILES_SUCCESS';
export const COMPARE_FILES_FAILURE = 'COMPARE_FILES_FAILURE';

export const compareFilesSuccess = (data) => {
  return { type: COMPARE_FILES_SUCCESS, data }
}

export const compareFilesFailure = (error) => {
  return { type: COMPARE_FILES_FAILURE, error }
}

export function postFiles(files, fileMode, meta, dispatch) {
  dispatch({ type: FILES_SEND, files: files.map(f => f.name), meta: meta });
  const data = formData(files, meta);
  const request = new Request(UPLOAD_ENDPOINT_MAP[fileMode], { method: 'POST', body: data });

  return fetch(request)
    .then(response => {
      if (response.ok) return response.json();
      const error = new Error('Network response was not OK');
      dispatch(compareFilesFailure(error))
      throw error;
    })
    .then(json => {
      return dispatch(compareFilesSuccess(json.data))
    })
    .catch(error => {
      return dispatch(compareFilesFailure(error.message))
    });
}


