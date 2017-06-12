import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactJson from 'react-json-view';
import _ from 'lodash';

import Heading from 'grommet/components/Heading';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import UpdateIcon from 'grommet/components/icons/base/Update';
import CutIcon from 'grommet/components/icons/base/Cut';
import LoginIcon from 'grommet/components/icons/base/Login';

import ResultSet from './results/ResultSet';

import { rawResultResponse, resultResponse  } from './tempResp';

import { Row, Col } from './layout';

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
    const { update: updates, add: adds, delete: deletes } = this.state;

    return (
      <Row className="outline-a3">
        <Col defs="col-md-2 col-sm-12">
          <Heading tag="h2">Results</Heading>
        </Col>
        <Col defs="col-xs-12">
          <Row>
            { updates && <Col defs="col-xs-12 col-sm">{this.renderUpdates()}</Col> }
            { adds && <Col defs="col-xs-12 col-sm">{this.renderAdds()}</Col> }
            { deletes && <Col defs="col-xs-12 col-sm">{this.renderDeletes()}</Col> }
          </Row>
        </Col>
        <Col defs="col-xs-12">
          <Accordion>
            <AccordionPanel heading='Full Results (debug)'>
              <ReactJson collapsed src={this.props.rawResults} />
            </AccordionPanel>
          </Accordion>
        </Col>
      </Row>
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

