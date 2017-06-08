import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import ReactJson from 'react-json-view';
import _ from 'lodash';

import Section from 'grommet/components/Section';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
// import List from 'grommet/components/List';
// import ListItem from 'grommet/components/ListItem';
// import Label from 'grommet/components/Label';

// import Table from 'grommet/components/Table';
// import TableRow from 'grommet/components/TableRow';

import AddCircleIcon from 'grommet/components/icons/base/AddCircle';
import UpdateIcon from 'grommet/components/icons/base/Update';
import SubtractCircleIcon from 'grommet/components/icons/base/SubtractCircle';
import { rawResultResponse, resultResponse  } from './tempResp';

import UpdateTable from './results/UpdateTable';

// TODO: Extract this logic
const diffsByType = (diffs) => {
  const transformed = _.mapValues(diffs, (value, key, obj) => {
    return { id: key, ...value }
  })
  return { ..._.groupBy(transformed, "diff_type") };
}

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = { ...diffsByType(props.results.diffs) } // gives me this.state.adds, this.state.delete, this.state.update
  }

  renderAddsAndDeletes() {
  }

  renderUpdates() {
    const keyFields = this.props.rawResults.options.key_fields; // TODO: get from state?
    return (
      <UpdateTable updates={this.state.update} keyFields={keyFields} />
    )
  }

  render() {
    const { rawResults, results } = this.props;

    return (
      <Section>
        <Box
          direction='column'
          margin='small'
          pad='small'
          colorIndex='light-2'
          alignContent="between"
          className="outline-a3">
          <Box basis="full"  direction="row">
            <Heading tag="h2">Results</Heading>
          </Box>
            <Accordion active={0} openMulti>
              {
                this.state.update &&
                  <AccordionPanel heading={<div><UpdateIcon className="icon-color-orange status-icon" size="small" /> Updates</div>}>
                    { this.renderUpdates() }
                  </AccordionPanel>
              }
              {
                rawResults &&
                <AccordionPanel heading='Full Results (debug)'>
                  <ReactJson collapsed src={rawResults} />
                </AccordionPanel>
              }
            </Accordion>
        </Box>
      </Section>
    )
  }
}

const select = (state) => ({
  uploadedFiles: state.api.uploaded,
  addedFiles: state.files.added,
  mode: state.files.mode,
  results: resultResponse,
  rawResults: rawResultResponse
  // results: state.api.results,
  // rawResults: state.api.rawResults
});

export default connect(select)(Results);

