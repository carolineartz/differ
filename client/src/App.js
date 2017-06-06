import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import App from 'grommet/components/App';
import Files from './components/Files';
import Options from './components/Options';

class Main extends Component {
  constructor() {
    super();
    this.handleAddFile = this.handleAddFile.bind(this);
    this.state = {
      fileMode: undefined,
      added: [],
      full: false
    }
  }

  handleAddFile(file) {
    const files = [file, ...this.state.added];
    const fileMode = file.type;
    this.setState({added: files, full: files.length === 2, fileMode: fileMode});
  }

  render() {
    return (
      <div className='App'>
        <App>
          <Files onAdd={this.handleAddFile} fileMode={this.state.fileMode} />
          {
            this.state.full && <Options fileMode={this.state.fileMode} files={this.state.added} />
          }
        </App>
      </div>
    )
  }
}

let select = (state) => ({
  files: state.added
});

export default connect(select)(Main);

