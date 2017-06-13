import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'lodash';

import Select from 'grommet/components/Select';
import Heading from 'grommet/components/Heading';
import { Row, Col } from '../layout'

import { selectKeyField, selectIgnoreField } from './../../actions/options';

class OptionSet extends Component {
  constructor(props) {
    super(props);
    this.handleSelectKeyField = this.handleSelectKeyField.bind(this)
    this.handleSelectIgnoreField = this.handleSelectIgnoreField.bind(this);

    this.state = {
      anySelected: false,
      keys: [],
      keyOptions: props.fields,
      ignores: [],
      ignoreOptions: props.fields,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { keys, keyOptions, ignores, ignoreOptions } = nextProps;
    this.setState({ keys, keyOptions, ignores, ignoreOptions })
  }

  handleSelectKeyField({target, option, value}) {
    this.props.dispatch(selectKeyField(this.props.id, value, this.props.fields));
  }

  handleSelectIgnoreField({target, option, value}) {
    this.props.dispatch(selectIgnoreField(this.props.id, value, this.props.fields));
  }

  renderSheetHeader()  {
    return (
      <Col defs="col-xs-12">
        <div className='divider' />
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
            options={this.state.keyOptions || this.props.fields}
            value={this.state.keys}
            onChange={this.handleSelectKeyField}
          />
          { this.renderFieldsSelected(this.state.keys, 'keys') }
        </Col>
        <Col defs='col-xs'>
          <Select placeHolder='None'
            multiple
            options={this.state.ignoreOptions || this.props.fields}
            value={this.state.ignores}
            onChange={this.handleSelectIgnoreField}
          />
          { this.renderFieldsSelected(this.state.ignores, 'ignoreFields') }
        </Col>
      </Row>
    )
  }
}

OptionSet.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  fields: PropTypes.array.isRequired,
  dataSet: PropTypes.object.isRequired
}

const select = (state, props) => {
  const opts = state.options[props.id] || {};
  const { keys, keyOptions, ignores, ignoreOptions }  = opts;
  return {
    keys,
    keyOptions,
    ignores,
    ignoreOptions
  }
}

export default connect(select)(OptionSet);
