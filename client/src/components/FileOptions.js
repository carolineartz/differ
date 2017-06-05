import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Papa from 'papaparse';

import Select from 'grommet/components/Select';
import Box from 'grommet/components/Box';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';

class FileOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allFields: { data: [] },
      file: undefined,
      keyFields: [],
      ignoreFields: []
    }
  }

  componentWillMount() {
    const file = this.props.file;
    Papa.parse(file, {
      complete: ((results, file) => {
        this.setState({allFields: results})
        this.state.allFields = results
      })
    })
  }

  handleSelectKeyField({target, option, value}) {
    this.setState({keyFields: value})
  }

  handleSelectIgnoreField({target, option, value}) {
    this.setState({ignoreFields: value})
  }

  renderFieldsSelected(fields, type) {
    return (
      <List selectable={true}>
        {
          fields.map(selected =>
            <ListItem colorIndex="accent-1" margin="small" key={`${type}-${selected}`} separator='none'>
              <span>{selected}</span>
            </ListItem>
          )
        }
      </List>
    )
  }

  render() {
    const fieldNames = this.state.allFields.data[0]
    return(
      <Box direction="row" justify="center" pad="small" full={true}>
        <Box direction="column" align="center" pad="medium" basis="medium">
          <Select placeHolder='None'
            multiple={true}
            options={fieldNames || []}
            value={this.state.keyFields}
            onChange={this.handleSelectKeyField.bind(this)}
          />
          { this.state.keyFields && this.renderFieldsSelected(this.state.keyFields, 'keyFields') }
        </Box>
        <Box direction="column" align="center" pad="medium" basis="medium">
          <Select placeHolder='None'
            multiple={true}
            options={fieldNames || []}
            value={this.state.ignoreFields}
            onChange={this.handleSelectIgnoreField.bind(this)}
          />
          { this.state.ignoreFields && this.renderFieldsSelected(this.state.ignoreFields, 'ignoreFields') }
        </Box>
      </Box>
    )
  }
}

FileOptions.propTypes = {
  file: PropTypes.instanceOf(File)
};

export default FileOptions;
