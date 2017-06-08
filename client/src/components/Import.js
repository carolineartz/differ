import React from 'react';
import PropTypes from 'prop-types';

import Section from 'grommet/components/Section';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';

import FileAdd from './files/FileAdd';

const Import = ({onAdd, mode}) => (
  <Section>
    <Box
      direction='row'
      justify='between'
      margin='small'
      pad='small'
      colorIndex='light-2'
      alignContent="between"
      className="outline-a1">
      <Box direction="column" justify="center">
        <Heading tag="h2">Select Files</Heading>
      </Box>
      <Box direction="column" margin="none" align="center" justify="center">
        <Tiles selectable direction="row" flush={false} fill justify="between" margin="none">
          <Tile  size="xsmall" direction="column" justify="center" align="center" pad="none" margin="medium">
            <Box>
              <FileAdd onAdd={onAdd} mode={mode} />
            </Box>
          </Tile>
          <Tile size="xsmall" direction="column" justify="center" align="center" pad="none" margin="medium">
            <Box>
              <FileAdd onAdd={onAdd} mode={mode} />
            </Box>
          </Tile>
        </Tiles>
      </Box>
    </Box>
  </Section>
)

Import.propTypes = {
  onAdd: PropTypes.func.isRequired,
  mode: PropTypes.string
}

export default Import;
