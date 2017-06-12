import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import Select from 'grommet/components/Select';
import Heading from 'grommet/components/Heading';

import { Row, Col } from '../layout'

// import { compareFiles } from './../../actions/Api';

class OptionSet extends Component {
  constructor(props) {
    super(props);

    this.handleSelectKeyField = this.handleSelectKeyField.bind(this)
    this.handleSelectIgnoreField = this.handleSelectIgnoreField.bind(this);

    this.state = {
      anySelected: false,
      keyFields: [],
      keyFieldOptions: undefined,
      ignoreFields: [],
      ignoreFieldOptions: undefined
    }
  }

  handleSelectKeyField({target, option, value}) {
    const fieldNames = this.props.fields;
    const ignoreFields = _.difference(this.state.ignoreFields, value);
    const ignoreFieldOptions = _.difference(fieldNames, value);
    const anySelected = ignoreFieldOptions.length !== fieldNames.length;

    this.setState({
      keyFields: value,
      ignoreFields,
      ignoreFieldOptions,
      anySelected
    })
  }

  handleSelectIgnoreField({target, option, value}) {
    const fieldNames = this.props.fields;
    const keyFields = _.difference(this.state.keyFields, value);
    const keyFieldOptions = _.difference(fieldNames, value);
    this.setState({
      ignoreFields: value,
      keyFields,
      keyFieldOptions
    })
  }

  renderSheetHeader()  {
    return (
      <Col defs="col-xs-12">
      <hr />
        <Heading tag="h5">
          {this.props.name}
        </Heading>
      </Col>
    )
  }

  renderFieldsSelected(fields, type) {
    return (
      <Row>
          { fields.map(selected =>
            <Col defs="col-xs" key={`${type}-${selected}`}>
               <span>{selected}</span>
            </Col>
            )
          }
      </Row>
    )
  }

  render() {
    return (
      <Row>
        { this.props.name && this.renderSheetHeader() }
        <Col defs="col-xs-offset-4 col-xs">
          <Select placeHolder='None'
            multiple
            options={this.state.keyFieldOptions || this.props.fields}
            value={this.state.keyFields}
            onChange={this.handleSelectKeyField}
          />
          { this.renderFieldsSelected(this.state.keyFields, 'keyFields') }
        </Col>
        <Col defs='col-xs'>
          <Select placeHolder='None'
            multiple
            options={this.state.ignoreFieldOptions || this.props.fields}
            value={this.state.ignoreFields}
            onChange={this.handleSelectIgnoreField}
          />
          { this.state.ignoreFields && this.renderFieldsSelected(this.state.ignoreFields, 'ignoreFields') }
        </Col>
      </Row>
    )
  }
}


OptionSet.propTypes = {
  name: PropTypes.string,
  fields: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired
}

export default OptionSet;
