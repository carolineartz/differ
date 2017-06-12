import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import './App.css';

import App from 'grommet/components/App';

import Import from './components/Import';
import Options from './components/Options';
import Results from './components/Results';

// TEMP
import { rawResultResponse, resultResponse  } from './components/tempResp';

class Main extends Component {
  constructor() {
    super();
    this.handleAddFile = this.handleAddFile.bind(this);
    this.state = {
      mode: undefined,
      addedFiles: [],
      full: false
    }
  }

  handleAddFile(file) {
    const files = [file, ...this.state.addedFiles];
    this.setState({ addedFiles: files, mode: file.type, full: files.length === 2 });
  }

  render() {
    const { mode, addedFiles } = this.state;
    const full = this.props.full;

    const displayResults = !_.isEmpty(this.props.results);
    return (
      <div className='App'>
        <App className="wrap container-fluid">

          <Import onAdd={this.handleAddFile} mode={mode} />
          {
            full && <Options files={addedFiles} />
          }
          {
            displayResults && <Results />
          }
        </App>
      </div>
    )
  }
}

let select = (state) => ({
  mode: state.files.mode,
  addedFiles: state.files.added,
  convertedFiles: state.api.convered,
  full: state.files.full,
  uploadedFiles: state.api.sent,
  results: resultResponse,
  rawResults: rawResultResponse
  // results: state.api.results,
  // rawResults: state.api.rawResults
});

export default connect(select)(Main);

