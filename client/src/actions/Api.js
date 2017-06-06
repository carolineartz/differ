// import streamSaver from 'streamsaver';
// import { createWriteStream } from 'streamsaver/StreamSaver';
// import { ReadableStream } from "web-streams-polyfill";
// import screwFilereader from 'screw-filereader'; // eslint-disable-line
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
  // debugger
  dispatch({ type: FILES_SEND, files: [file1, file2].map(f => f.name), meta: meta });
  // debugger
  const zip = new JSZip();
  // const fileStream = createWriteStream('compare.zip');

  fileMode = fileMode || 'text/csv';
  zip.file(`before.${EXTENSION_MAP[fileMode]}`, file1);
  zip.file(`after.${EXTENSION_MAP[fileMode]}`, file2);
  zip.file('meta.json', JSON.stringify(meta));

  const data = new FormData();
  const request = new Request('http://localhost:3000/reporting_file_differ/diff/upload-csv', { method: 'POST' });
  return zip.generateAsync({ type: "blob" }).then(content => {
    data.append('files', content);
    return data
    // fetch(request)
    // const a = window.document.createElement('a');
    // a.href = window.URL.createObjectURL(file, { type: "application/zip" });
    // debugger
    // a.download = "compare.zip"
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
  });

  // request.body = data;

  // debugger

  // const request = new Request(UPLOAD_ENDPOINT_MAP[fileMode], { method: 'POST', body: fileStream });

  // return fetch(request)
}
