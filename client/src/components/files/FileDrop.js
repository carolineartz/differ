import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import { CsvFileIcon, XlsxFileIcon } from './icons';

import { CSV_MIME } from './../../models/constants';

class FileDrop extends Component {
  constructor(props) {
    super(props);
    this.handleDrop = this.handleDrop.bind(this);
    this.state = {
      full: false,
      mode: props.mode,
      file: props.file
    }
  }

  handleDrop([file]) {
    const isAccepted = this.props.onDrop(file);
    this.setState({ file, full: isAccepted} );
  }

  renderFileIcon() {
    if (this.props.mode === CSV_MIME) return <CsvFileIcon />;
    return <XlsxFileIcon />
  }

  renderDropZone() {
    const openClasses = cx({
      dropzone: true,
      "open": !this.state.full
    })
    return (
      <Dropzone
        className={openClasses}
        onDrop={this.handleDrop}
        multiple={false}
      >
        <div>Drop here or click to select</div>
      </Dropzone>
    )
  }

  render() {
    if (this.state.full) return this.renderFileIcon();
    else return this.renderDropZone();
  }
}

FileDrop.propTypes = {
  mode: PropTypes.string,
  onDrop: PropTypes.func.isRequired
}

const select = (state) => {
  return {
    mode: state.files.mode
  };
};

export default connect(select)(FileDrop);
