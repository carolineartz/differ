import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    this.state = {
      fileMode: undefined,
      added: [],
    }
  }

  render() {
    return (
      <Section>
        <Box
          direction='row'
          justify='between'
          margin='small'
          pad='medium'
          colorIndex='neutral-2-a'
          alignContent="between">
          <Box direction="column" justify="center">
            <Heading strong>Select Files</Heading>
          </Box>
          <Box direction="column" margin="medium" align="center" justify="center">
            <Tiles selectable direction="row" justify="between" margin="small">
              <Tile colorIndex="neutral-2" direction="column" align="center" pad="small" margin="medium">
                <Box>
                  <FileAdd {...this.props} />
                </Box>
              </Tile>
              <Tile colorIndex="neutral-2" direction="column" align="center" pad="small" margin="medium">
                <Box>
                  <FileAdd {...this.props} />
                </Box>
              </Tile>
            </Tiles>
          </Box>
        </Box>
      </Section>
    );
  }
}

Files.propTypes = {
  onAdd: PropTypes.func.isRequired,
  fileMode: PropTypes.string
}

let select = (state) => ({
  files: state.added,
  full: state.file.full,
  fileMode: state.fileMode
});

export default connect(select)(Files);

