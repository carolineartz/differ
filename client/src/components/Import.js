import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Heading from 'grommet/components/Heading';
import FileAdd from './files/FileAdd';
import { Row, Col } from './layout'
import { convertFiles } from './../actions/Api';

class Import extends Component {
  componentWillReceiveProps(nextProps) {
    const { full, mode, files } = nextProps;

    if (full) convertFiles(files, mode, this.props.dispatch);
  }

  render() {
    return (
      <Row className="outline-a1">
        <Col defs="col-xs">
          <Heading tag="h2">Select Files</Heading>
        </Col>
        <Col defs="col-xs">
          <FileAdd {...this.props} />
        </Col>
        <Col defs="col-xs">
          <FileAdd {...this.props} />
        </Col>
      </Row>
    )
  }
}

Import.propTypes = {
  onAdd: PropTypes.func.isRequired,
  mode: PropTypes.string
}

const select = (state, props) => {
  return {
    mode: state.files.mode,
    full: state.files.full,
    files: state.files.added
  };
};


export default connect(select)(Import);
