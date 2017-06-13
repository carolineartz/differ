import { createReducer } from './utils';
import _ from 'lodash';

import {
  FILES_SEND,
  FILES_SEND_SUCCESS,
  FILES_SEND_FAILURE,
  FILES_COMPARE_SUCCESS,
  FILES_COMPARE_FAILURE,
  FILES_CONVERT_SUCCESS,
  FILES_CONVERT_FAILURE
} from '../actions/Api';

const initialState = {
  sending: [],
  sent: [],
  converted: {},
  resultSets: [],
  rawResultResponse: [],
  fileData: undefined,
  dataSets: []
};

import FileData from './../models/FileData';

const handlers = {
  [FILES_SEND]: (state, action) => {
    return { sending: action.files }
  },

  [FILES_SEND_SUCCESS]: (state, action) => {
    return {
      sending: [],
      sent: action.files
    }
  },

  [FILES_SEND_FAILURE]: (state, action) => {
    return { sending: [] }
  },

  [FILES_CONVERT_SUCCESS]: (state, action) => {
    const fileData = new FileData(action.data)

    return {
      converted: action.data,
      dataSets: fileData.dataSets,
      fileData
    }
  },

  [FILES_CONVERT_FAILURE]: (state, action) => {
    return { converted: {} }
  },

  [FILES_COMPARE_SUCCESS]: (state, action) => {
    const resultSets = action.data.map(ds => {
      const { diffs, warnings, key_fields: keyFields } = ds;
      const { update: updates, add: adds, delete: deletes } = diffsByType(diffs);

      return {
        warnings,
        keyFields,
        updates: formatResult(updates, keyFields),
        adds: formatResult(adds, keyFields),
        deletes: formatResult(deletes, keyFields)
      }
    });

    return { resultSets, rawResultResponse: action.data }
  },

  [FILES_COMPARE_FAILURE]: (state, action) => {
    return { resultSets: [], rawResultResponse: {} }
  }
}

function diffsByType(diffs) {
  const transformed = _.mapValues(diffs, ((value, key, obj) => ({
      id: key,
      ...value
      })
    ))
  return { ..._.groupBy(transformed, "diff_type") };
}


function formatResult(result, keyFields) {
  return _
    .chain(result)
    .keyBy('id')
    .mapValues(o => _.omit(o.fields, keyFields))
    .value()
}

export default createReducer(initialState, handlers);
