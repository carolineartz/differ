import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import ReactJson from 'react-json-view';
import _ from 'lodash';

import Heading from 'grommet/components/Heading';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import { Row, Col } from './layout';

import ResultSet from './results/ResultSet';

const Results = ({...props}) => {
  const resultsClassNames = cx({
    'outline-a3': true,
    results: true,
    active: props.active
  });

  return (
    <Row className={resultsClassNames}>
      <Col defs="col-md-2 col-sm-12">
        <Heading tag="h2">Results</Heading>
      </Col>
      <Col defs="col-xs-12">
        {
          props.resultSets.map((results, i) =>
            <ResultSet {...results} key={`results-${i}`} />)
        }
      </Col>
      {
        props.active &&
          <Col defs="col-xs-12">
            <Accordion>
              <AccordionPanel heading='Full Results (debug)'>
                <ReactJson collapsed src={props.rawResultResponse} />
              </AccordionPanel>
            </Accordion>
          </Col>
      }
    </Row>
  )
}

const select = (state) => ({
  resultSets: state.api.resultSets,
  active: !_.isEmpty(state.api.resultSets),
  rawResultResponse: state.api.rawResultResponse
});

export default connect(select)(Results);

