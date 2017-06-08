import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import ReactJson from 'react-json-view';
import _ from 'lodash';

import Section from 'grommet/components/Section';
// import Tiles from 'grommet/components/Tiles';
// import Tile from 'grommet/components/Tile';
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
import CutIcon from 'grommet/components/icons/base/Cut';
import LoginIcon from 'grommet/components/icons/base/Login';

import { rawResultResponse, resultResponse  } from './tempResp';

// import UpdateTable from './results/UpdateTable';
// import Updates from './results/Updates';
import ResultSet from './results/ResultSet';

const diffsByType = (diffs) => { // TODO: Extract this logic
  const transformed = _.mapValues(diffs, (value, key, obj) => {
    return { id: key, ...value }
  })
  return { ..._.groupBy(transformed, "diff_type") };
}
const formatData = (results, keyFields) => // TODO: Extract logic
  _.chain(results).keyBy('id').mapValues(o => _.omit(o.fields, keyFields)).value()

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyFields: props.rawResults.options.key_fields,
      ...diffsByType(props.results.diffs) // gives me this.state.add, this.state.delete, this.state.update
    }
  }

  renderUpdates() {
    const icon = <UpdateIcon className="icon-color-orange status-icon" />;
    const data = formatData(this.state.update, this.state.keyFields);

    return <ResultSet label="Updated" rootLabel="updates" icon={icon} resultData={data}/>;
  }

  renderAdds() {
    const icon = <LoginIcon className="icon-color-orange status-icon" />;
    const data = formatData(this.state.add, this.state.keyFields);

    return <ResultSet label="New" rootLabel="adds" icon={icon} resultData={data}/>;
  }

  renderDeletes() {
    const icon = <CutIcon className="icon-color-orange status-icon" />;
    const data = formatData(this.state.delete, this.state.keyFields);

    return <ResultSet label="Removed" rootLabel="deletes" icon={icon} resultData={data}/>;
  }

  render() {
    // const { rawResults, results } = this.props;
    const { update: updates, add: adds, delete: deletes } = this.state;

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
          { updates && this.renderUpdates() }
          { adds && this.renderAdds() }
          { deletes && this.renderDeletes() }
          <Box basis="full" direction="row">
            <Accordion>
              <AccordionPanel heading='Full Results (debug)'>
                <ReactJson collapsed src={this.props.rawResults} />
              </AccordionPanel>
            </Accordion>
          </Box>
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

