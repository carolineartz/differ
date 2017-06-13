import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactJson from 'react-json-view';
import _ from 'lodash';

import Heading from 'grommet/components/Heading';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import { Row, Col } from './layout';

import ResultSet from './results/ResultSet';

class Results extends Component {
  render() {
    return (
      <Row className="outline-a3">
        <Col defs="col-md-2 col-sm-12">
          <Heading tag="h2">Results</Heading>
        </Col>
        <Col defs="col-xs-12">
          {
            this.props.resultSets.map((results, i) =>
              <ResultSet {...results} key={`results-${i}`} />)
          }
        </Col>
        <Col defs="col-xs-12">
          <Accordion>
            <AccordionPanel heading='Full Results (debug)'>
              <ReactJson collapsed src={this.props.rawResultResponse} />
            </AccordionPanel>
          </Accordion>
        </Col>
      </Row>
    )
  }
}

const select = (state) => ({
  resultSets: state.api.resultSets,
  rawResultResponse: state.api.rawResultResponse
});

export default connect(select)(Results);

