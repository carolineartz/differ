import React from 'react';
import _ from 'lodash';
import ReactJson from 'react-json-view';

// TODO: extract
const formatData = (results, keyFields) =>
  _.chain(results).keyBy('id').mapValues(o => _.omit(o.fields, keyFields)).value()

const Updates = ({updateResults, keyFields}) => (
  <div id='update-json'>
    <ReactJson
      displayDataTypes={false}
      src={formatData(updateResults, keyFields)}
      displayObjectSize={false}
      indentWidth={3}
      name="updates"
      collapsed
    />
  </div>
)


export default Updates;
