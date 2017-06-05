import streamSaver from 'streamsaver';
import screwFilereader from 'screw-filereader'; // eslint-disable-line
import JSZip from 'jszip';

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

export const FILES_SEND = 'FILES_SEND';

export function postFiles([file1, file2], fileMode, meta, dispatch) {
  dispatch({ type: FILES_SEND, files: [file1, file2].map(f => f.name), meta: meta });

  const zip = new JSZip();
  const fileStream = streamSaver.createWriteStream('compare.zip');

  zip.file(`before.${EXTENSION_MAP[fileMode]}`, file1);
  zip.file(`after.${EXTENSION_MAP[fileMode]}`, file2);
  zip.file('meta.json', meta);

  zip.generateAsync({ type: "blob" })
    .then(content => {
      content.stream().pipeTo(fileStream)
    });

  const request = new Request(UPLOAD_ENDPOINT_MAP[fileMode], { method: 'POST', body: fileStream });

  return fetch(request)
}
