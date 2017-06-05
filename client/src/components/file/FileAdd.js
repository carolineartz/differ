import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Box from 'grommet/components/Box';

import { addFile, addFileFailure, addFileSuccess } from '../../actions/file';
import FileDrop from './FileDrop';

const CSV_MIME = 'text/csv';
const XLSX_MIME = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
const ACCEPTED_TYPES = [CSV_MIME, XLSX_MIME];

class FileAdd extends Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.state = {
      fileMode: props.fileMode,
      file: undefined
    }
  }

  handleAdd(file) {
    this.props.dispatch(addFile(file));

    const { fileMode } = this.state;
    let accept;

    if (fileMode) accept = file.type === fileMode;
    else accept = ACCEPTED_TYPES.includes(file.type);

    if (accept) {
      this.props.dispatch(addFileSuccess(file))
      this.props.onAdd(file);
      this.setState({file: file, fileMode: file.type});
      return true;
    }
    else {
      const error = `File of type: ${file.type} not accepted.`;
      this.props.dispatch(addFileFailure(file, error));
      return false;
    }
  }

  render() {
    return (
      <Box basis="small" size="small" align="center" justify="center">
        <FileDrop fileMode={this.state.fileMode} onDrop={this.handleAdd} />
      </Box>
    );
  }
}

FileAdd.propTypes = {
  fileMode: PropTypes.string,
  onAdd: PropTypes.func.isRequired
};

const select = (state, props) => {
  return {
    fileMode: state.fileMode,
    file: state.file
  };
};

export default connect(select)(FileAdd);

