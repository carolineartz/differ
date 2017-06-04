import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

import Section from 'grommet/components/Section';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Box from 'grommet/components/Box';

import Results from './Results';


const REQUEST_OPTIONS = {
  method: 'POST',
  headers: new Headers({
    "Access-Control-Allow-Origin": '*',
    'Content-Type': 'application/json',
    "Accept": "application/json"
  }),
  mode: 'no-cors'
};

const CSV_MIME = 'text/csv';
const XLSX_MIME = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
const ACCEPTED_TYPES = [CSV_MIME, XLSX_MIME];

const UPLOAD_ENDPOINT_BASE = 'http://localhost:3000/reporting_file_differ/diff/upload';
const UPLOAD_ENDPOINT_MAP = {
  [CSV_MIME]: `${UPLOAD_ENDPOINT_BASE}-csv`,
  [XLSX_MIME]: `${UPLOAD_ENDPOINT_BASE}-xlsx`
}
const EXTENSION_MAP = {
  [CSV_MIME]: 'csv',
  [XLSX_MIME]: 'xlsx'
}

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileMode: undefined,
      files: [],
      diffSummary: undefined
    }
  }

  onDrop(acceptedFiles, rejectedFiles) {
    const acceptedFile = acceptedFiles && acceptedFiles[0];
    const rejectedFile = rejectedFiles && rejectedFiles[0];

    if (!this.state.files || (this.state.files && !this.state.files.length)) {
      const file = acceptedFile || rejectedFile;
      if (!ACCEPTED_TYPES.includes(file.type)) {
        this.setState({
          rejectedFiles: [file],
          files: [],
          fileMode: undefined
        });
        return false;
      }
      else {
        this.setState({
          files: [file],
          fileMode: file.type
        })
        return true
      }
    }

    if (rejectedFile) return false;
    const files = [acceptedFile, ...this.state.files];
    const fileMode = acceptedFile.type;
    this.setState({ files: files, fileMode: fileMode });
    const responseData = {};
    if (files.length === 2) {
      const zip = new JSZip();
      zip.file(`before.${EXTENSION_MAP[fileMode]}`, files[0])
      zip.file(`after.${EXTENSION_MAP[fileMode]}`, files[1])
      zip.generateAsync({ type: "blob" })
        .then(content => {
          const name = "compare.zip";
          saveAs(content, name)
        });

      const request = new Request(UPLOAD_ENDPOINT_MAP[fileMode], {method: 'POST', body: '{"path":"~/Downloads/compare.zip"}'});
      fetch(request)
        .then(response => { return response.json() })
        .then(json => {
          const data = json.data;
          responseData.data = data;
          this.setState({files: [], diffSummary: data})
        });
    }
  }

  render() {
    return (
      <Section>
        <Box
          direction='row'
          justify='between'
          align='center'
          wrap={true}
          pad='medium'
          margin='small'
          colorIndex='light-2'>
          <Tiles selectable pad="large" align='center' justify='between'>
            <Tile align='center'
              basis='1/4'>
              <Dropzone
                onDrop={this.onDrop.bind(this)}
                accept={this.state.fileMode}
                multiple={false}>
                <div>Try dropping some files here, or click to select files to upload.</div>
              </Dropzone>
            </Tile>
            <Tile align='center'
              basis='1/4'>
              <Dropzone
                onDrop={this.onDrop.bind(this)}
                accept={this.state.fileMode}
                multiple={false}>
                <div>Try dropping some files here, or click to select files to upload.</div>
              </Dropzone>
            </Tile>
          </Tiles>
        </Box>
        { this.state.diffSummary &&
          <Box
            pad='medium'
            margin='small'
            colorIndex='light-2'
            direction='row'>
            <Results resultObject={this.state.diffSummary}></Results>
          </Box>
        }
      </Section>
    );
  }
}
