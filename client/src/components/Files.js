import React, { Component } from 'react';
import { connect } from 'react-redux';

import Section from 'grommet/components/Section';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';

import FileAdd from './file/FileAdd';

class Files extends Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.state = {
      fileMode: undefined,
      added: [],
    }
  }

  handleAdd(file) {
    const files = [file, ...this.state.added];
    const fileMode = file.type;
    this.setState({added: files, fileMode: fileMode});
  }

  render() {
    return (
      <Section>
        <Box
          direction='row'
          justify='between'
          pad='medium'
          colorIndex='light-2'
          alignContent="between">
          <Box direction="column" justify="center">
            <Heading strong>1. Select Files</Heading>
          </Box>
          <Box direction="column" margin="medium" align="center" justify="center">
            <Tiles selectable direction="row" justify="between" margin="small">
              <Tile colorIndex="light-1" direction="column" align="center" pad="small" margin="medium">
                <Box>
                  <FileAdd onAdd={this.handleAdd} fileMode={this.state.fileMode} />
                </Box>
              </Tile>
              <Tile colorIndex="light-1" direction="column" align="center" pad="small" margin="medium">
                <Box>
                  <FileAdd onAdd={this.handleAdd} fileMode={this.state.fileMode} />
                </Box>
              </Tile>
            </Tiles>
          </Box>
        </Box>
      </Section>
    );
  }
}

let select = (state) => ({
  files: state.added,
  fileMode: state.fileMode
});

export default connect(select)(Files);

