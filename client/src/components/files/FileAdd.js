import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addFile, addFileFailure, addFileSuccess } from '../../actions/files';

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import FileDrop from './FileDrop';

import { CSV_MIME, XLSX_MIME } from './../../models/constants';

const ACCEPTED_TYPES = [CSV_MIME, XLSX_MIME];

class FileAdd extends Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.state = {
      mode: props.mode,
      file: undefined,
      allFull: props.allFull
    }
  }

  handleAdd(file) {
    this.props.dispatch(addFile(file));
    const currentMode = this.state.mode;

    // TODO: extract logic
    let accept;
    if (currentMode) accept = file.type === currentMode;
    else accept = ACCEPTED_TYPES.includes(file.type);

    if (accept) {
      this.setState({file, mode: file.type});
      this.props.onAdd(file);
      this.props.dispatch(addFileSuccess(file))
    }
    else {
      const error = `File of type: ${file.type} not accepted.`;
      this.setState({file});
      this.props.dispatch(addFileFailure(file, error));
    }

    return accept;
  }

  render() {
    const fileName = this.state.file && this.state.file.name;

    return (
      <Box margin="none" align="center" justify="center">
        { fileName &&
          <Heading className="file-name" tag="h6">
            {fileName}
          </Heading>
        }
        <FileDrop mode={this.state.mode} onDrop={this.handleAdd} />
      </Box>
    );
  }
}

FileAdd.propTypes = {
  mode: PropTypes.string,
  onAdd: PropTypes.func.isRequired
};

const select = (state, props) => {
  return {
    mode: state.files.mode,
    allFull: state.files.full,
    file: state.file,
    files: state.files.added
  };
};

export default connect(select)(FileAdd);

