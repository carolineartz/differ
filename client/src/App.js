import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import './App.css';

import App from 'grommet/components/App';

import Import from './components/Import';
import Options from './components/Options';
import Results from './components/Results';

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
    const { mode } = this.state;

    return (
      <div className='App'>
        <App className="wrap container-fluid">
          <Import onAdd={this.handleAddFile} mode={mode} />
          <Options />
          <Results />
        </App>
      </div>
    )
  }
}

let select = (state) => ({
  full: state.files.full,
  resultSets: state.api.resultSets,
  rawResultResponse: state.api.rawResultResponse
});

export default connect(select)(Main);

