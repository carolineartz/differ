import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addFile, addFileFailure, addFileSuccess } from '../../actions/files';

import Box from 'grommet/components/Box';

import FileDrop from './FileDrop';

const CSV_MIME = 'text/csv';
const XLSX_MIME = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
const ACCEPTED_TYPES = [CSV_MIME, XLSX_MIME];

class FileAdd extends Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.state = {
      mode: props.mode,
      file: undefined
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
      return true;
    }
    else {
      const error = `File of type: ${file.type} not accepted.`;
      this.setState({file});
      this.props.dispatch(addFileFailure(file, error));
      return false;
    }
  }

  render() {
    return (
      <Box basis="small" size="small" align="center" justify="center">
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
    file: state.file
  };
};

export default connect(select)(FileAdd);

