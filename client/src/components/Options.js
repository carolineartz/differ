import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import Papa from 'papaparse';

import Section from 'grommet/components/Section';
import Select from 'grommet/components/Select';
import Box from 'grommet/components/Box';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';
import CircleQuestionIcon from 'grommet/components/icons/base/CircleQuestion';
import Tip from 'grommet/components/Tip';

import { compareFiles } from '../actions/file';

class Options extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allFields: { data: [] },
      fileMode: props.fileMode,
      files: props.files.map(f => f.file),
      keyFields: [],
      keyFieldOptions: undefined,
      ignoreFields: [],
      ignoreFieldOptions: undefined,
      rowUniqueIdDisplayed: false,
      ignoreFieldsDisplayed: false,
      anySelected: false
    }
  }

  componentWillMount() {
    const [,file] = this.state.files;

    Papa.parse(file, {
      complete: ((results, file) => {
        this.setState({file: file, allFields: results})
        this.state.allFields = results
      })
    })
  }

  handleClickCompare() {
    const { keyFields, ignoreFields, files } = this.state;
    const meta = { keyFields, ignoreFields };

    compareFiles(files, this.props.fileMode, meta)(this.props.dispatch);
  }

  handleSelectKeyField({target, option, value}) {
    const fieldNames = this.state.allFields.data[0];
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
    const fieldNames = this.state.allFields.data[0];
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

  renderFieldsSelected(fields, type) {
    return (
      <List selectable={true}>
        {
          fields.map(selected =>
            <ListItem colorIndex="accent-2" margin="small" key={`${type}-${selected}`} separator='none'>
              <span>{selected}</span>
            </ListItem>
          )
        }
      </List>
    )
  }

  render() {
    const fieldNames = this.state.allFields.data[0] || [];
    const uniqueFieldsText = 'Combination of fields that together create a unique key';
    const ignoreFieldsText = 'Fields that will not contribute to diff results';

    return(
      <Section>
        <Box
          direction='row'
          justify='between'
          margin='small'
          pad='medium'
          colorIndex='accent-2-a'
          alignContent="between">
          <Box direction="column">
            <Box direction="row" justify="center">
              <Heading strong>Select Column Options</Heading>
            </Box>
            {
              <Box direction="row" justify="center">
                { this.state.anySelected &&
                  <Button
                    label='Compare'
                    primary
                    disabled={false}
                    onClick={this.handleClickCompare.bind(this)}
                    type="submit"
                   />
                }
              </Box>
            }
          </Box>
            <Box colorIndex="accent-2-t" direction="column" align="center" pad="medium" basis="medium">
            <Heading tag='h4' align='center'>
              Row Unique Identifiers
              <Button id="rowUniqueIdDisplayed" icon={<CircleQuestionIcon size="xsmall" />} onClick={(e) => { this.toggleTip(e, uniqueFieldsText) }} />
            </Heading>
              <Select placeHolder='None'
                multiple={true}
                options={this.state.keyFieldOptions || fieldNames}
                value={this.state.keyFields}
                onChange={this.handleSelectKeyField.bind(this)}
              />
              { this.state.keyFields && this.renderFieldsSelected(this.state.keyFields, 'keyFields') }
            </Box>
            <Box colorIndex="accent-2-t" direction="column" align="center" pad="medium" basis="medium">
              <Heading tag='h4' align='center'>
                Ignore Fields
                <Button id="ignoreFieldsDisplayed" icon={<CircleQuestionIcon size="xsmall" />} onClick={(e) => { this.toggleTip(e, ignoreFieldsText) }} />
              </Heading>
              <Select placeHolder='None'
                multiple={true}
                options={this.state.ignoreFieldOptions || fieldNames}
                value={this.state.ignoreFields}
                onChange={this.handleSelectIgnoreField.bind(this)}
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
  fileMode: PropTypes.string
}

let select = (state) => ({
  files: state.file.added,
  fileMode: state.fileMode
});

export default connect(select)(Options);

