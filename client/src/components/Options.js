import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import Papa from 'papaparse';

import Section from 'grommet/components/Section';
import Select from 'grommet/components/Select';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';
import CircleQuestionIcon from 'grommet/components/icons/base/CircleQuestion';
import Tip from 'grommet/components/Tip';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import { compareFiles } from '../actions/Api';

// TODO: extract field calculations into model

class Options extends Component {
  constructor(props) {
    super(props);
    this.handleSearchIgnoreFields = this.handleSearchIgnoreFields.bind(this);
    this.handleSearchKeyFields = this.handleSearchKeyFields.bind(this);
    this.handleSelectKeyField = this.handleSelectKeyField.bind(this)
    this.handleSelectIgnoreField = this.handleSelectIgnoreField.bind(this);
    this.handleClickCompare = this.handleClickCompare.bind(this);

    this.state = {
      allFields: [],
      mode: props.mode,
      files: props.addedFiles,
      keyFields: [],
      keyFieldOptions: undefined,
      ignoreFields: [],
      ignoreFieldOptions: undefined,
      rowUniqueIdDisplayed: false,
      ignoreFieldsDisplayed: false,
      anySelected: false,
      results: props.results
    }
  }

  componentWillMount() {
    const [,file] = this.state.files;

    Papa.parse(file, {
      complete: ((results, file) => {
        this.setState({ file: file, allFields: results.data[0] })
      })
    })
  }

  handleClickCompare() {
    const { keyFields, ignoreFields, files } = this.state;
    const meta = { keyFields, ignoreFields };
    compareFiles(files, this.props.mode, meta)(this.props.dispatch);
  }

  handleSelectKeyField({target, option, value}) {
    const fieldNames = this.state.allFields;
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
    const fieldNames = this.state.allFields;
    const keyFields = _.difference(this.state.keyFields, value);
    const keyFieldOptions = _.difference(fieldNames, value);
    this.setState({
      ignoreFields: value,
      keyFields,
      keyFieldOptions
    })
  }

  toggleTip(el, text) {
    const id = el.currentTarget.id;
    if (this.state[id]) this.setState({[id]: false})
    else this.setState({[id]: true})
  }

 // TODO: extract this logic
  handleSearchKeyFields(event) {
    const availableOptions = _.difference(this.state.allFields, this.state.ignoreFieldOptions || []);
    const value = event.target.value;
    const regexp = new RegExp(value, 'i');
    const updatedOptions = availableOptions.filter(val => regexp.test(val));
    this.setState({ keyFieldOptions: value ? updatedOptions : availableOptions })
  }

  handleSearchIgnoreFields(event) {
    const availableOptions = _.difference(this.state.allFields, this.state.keyFieldOptions || []);
    const value = event.target.value;
    const regexp = new RegExp(value, 'i');
    const updatedOptions = availableOptions.filter(val => regexp.test(val));
    this.setState({ ignoreFieldOptions: value ? updatedOptions : availableOptions })
  }

  renderFieldsSelected(fields, type) {
    return (
      <Tiles flush={false}
        fill={false}
        selectable={true}
      >
        {
          fields.map(selected =>
            <Tile align='center' basis='1/3' key={`${type}-${selected}`} separator='none'>
               <span>{selected}</span>
            </Tile>
          )
        }
      </Tiles>
    )
  }

  render() {
    const allFields = this.state.allFields;
    const uniqueFieldsText = 'Combination of fields that together create a unique key';
    const ignoreFieldsText = 'Fields that will not contribute to diff results';

    return(
      <Section pad="none">
        <Box
          direction='row'
          justify='between'
          margin='small'
          pad='small'
          colorIndex='light-2'
          className="outline-a2"
          alignContent="between">
          <Box direction="column">
            <Box direction="row" pad={{between: "small"}} justify="center">
              <Heading tag="h2">Select Column Options</Heading>
            </Box>
            {
              <Box direction="row" pad="small" align="start" justify="start">
                { this.state.anySelected &&
                  <Button
                    label='Compare'
                    accent
                    onClick={this.handleClickCompare}
                    type="submit"
                   />
                }
              </Box>
            }
          </Box>
            <Box direction="column" align="center" pad="none" basis="medium">
            <Heading tag='h4' align='center'>
              Row Unique Identifiers
              <Button id="rowUniqueIdDisplayed" icon={<CircleQuestionIcon size="xsmall" />} onClick={(e) => { this.toggleTip(e, uniqueFieldsText) }} />
            </Heading>
              <Select placeHolder='None'
                onSearch={this.handleSearchKeyFields}
                multiple
                options={this.state.keyFieldOptions || allFields}
                value={this.state.keyFields}
                onChange={this.handleSelectKeyField}
              />
              { this.state.keyFields && this.renderFieldsSelected(this.state.keyFields, 'keyFields') }
            </Box>
            <Box  direction="column" align="center" pad="none" basis="medium">
              <Heading tag='h4' align='center'>
                Ignore Fields
                <Button id="ignoreFieldsDisplayed" icon={<CircleQuestionIcon size="xsmall" />} onClick={(e) => { this.toggleTip(e, ignoreFieldsText) }} />
              </Heading>
              <Select placeHolder='None'
                onSearch={this.handleSearchIgnoreFields}
                multiple
                options={this.state.ignoreFieldOptions || allFields}
                value={this.state.ignoreFields}
                onChange={this.handleSelectIgnoreField}
              />
              { this.state.ignoreFields && this.renderFieldsSelected(this.state.ignoreFields, 'ignoreFields') }
            </Box>
        </Box>
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
      </Section>
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
  results: state.api.results
});

export default connect(select)(Options);

