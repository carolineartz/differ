import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'lodash';
import ReactJson from 'react-json-view';

import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';
import CircleQuestionIcon from 'grommet/components/icons/base/CircleQuestion';
import Tip from 'grommet/components/Tip';

import { compareFiles } from '../actions/Api';
import OptionSet from './options/OptionSet';

import { Row, Col } from './layout'

const XLSX_MIME = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

// TODO: extract field calculations into model
class Options extends Component {
  constructor(props) {
    super(props);
    this.handleClickCompare = this.handleClickCompare.bind(this);

    this.state = {
      mode: props.mode,
      files: props.addedFiles,
      rowUniqueIdDisplayed: false,
      ignoreFieldsDisplayed: false,
      anySelected: false,
      results: props.results,
      excel: props.mode === XLSX_MIME,
      fileData: undefined,
      dataSets: [],
      multi: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.dataSets.length && nextProps.dataSets.length) {
      this.setState({
        fileData: nextProps.fileData,
        multi: nextProps.multi,
        dataSets: nextProps.dataSets
      })
    }
  }

  handleClickCompare() {
    const { keyFields, ignoreFields, files } = this.state;
    const meta = { keyFields, ignoreFields };
    compareFiles(files, this.props.mode, meta, this.props.dispatch);
  }

  toggleTip(el, text) {
    const id = el.currentTarget.id;
    if (this.state[id]) this.setState({[id]: false})
    else this.setState({[id]: true})
  }

  render() {
    const uniqueFieldsText = 'Combination of fields that together create a unique key';
    const ignoreFieldsText = 'Fields that will not contribute to diff results';

    const dataDisplay = this.state.dataSets.map(ds =>
      <ReactJson
        key={`${ds.name || 'csv'}`}
        src={{
          data1: ds.data1,
          data2: ds.data2,
          fields: ds.data1.data[0],
          name: ds.name
        }}
        collapsed
      />
    )

    const selectDisplay = this.state.dataSets.map((ds, i) =>
      <OptionSet
        key={`${ds.name || 'csv'}-${i}`}
        name={ds.name}
        fields={ds.data1.data[0]}
        data={{
          data1: ds.data1,
          data2: ds.data2
        }}
      />
    )

    return (
      <Row className="outline-a2">
        <Col defs='col-xs-12'>
          <Row>
            <Col defs='col-xs'>
              <Heading tag="h2">Select Column Options</Heading>
                { this.state.anySelected &&
                  <div>
                    <Button
                      label='Compare'
                      accent
                      onClick={this.handleClickCompare}
                      type="submit"
                    />
                  </div>
                }
            </Col>
            <Col defs='col-xs'>
              <Heading tag='h4' align='center'>
                Row Unique Identifiers
                <Button id="rowUniqueIdDisplayed" icon={<CircleQuestionIcon size="xsmall" />} onClick={(e) => { this.toggleTip(e, uniqueFieldsText) }} />
              </Heading>
            </Col>
            <Col defs='col-xs'>
              <Heading tag='h4' align='center'>
                Ignore Fields
                <Button id="ignoreFieldsDisplayed" icon={<CircleQuestionIcon size="xsmall" />} onClick={(e) => { this.toggleTip(e, ignoreFieldsText) }} />
              </Heading>
            </Col>
          </Row>
          { this.state.fileData && selectDisplay }
          <Col defs='col-xs-12'>
            { this.state.fileData && dataDisplay }
          </Col>
          { this.state.rowUniqueIdDisplayed &&
            <Tip target='rowUniqueIdDisplayed' onClose={() => true}>
              {uniqueFieldsText}
            </Tip>
          }
          { this.state.ignoreFieldsDisplayed &&
            <Tip target='ignoreFieldsDisplayed' onClose={() => true}>
              {ignoreFieldsText}
            </Tip>
          }
        </Col>
      </Row>
    )
  }
}

Options.propTypes = {
  mode: PropTypes.string
}

let select = (state) => ({
  uploadedFiles: state.api.uploaded,
  addedFiles: state.files.added,
  mode: state.files.mode,
  results: state.api.results,
  fileData: state.api.fileData,
  dataSets: state.api.dataSets,
  multi: state.api.dataSets > 1
});

export default connect(select)(Options);

