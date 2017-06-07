import { createReducer } from './utils';

import {
  FILES_SEND,
  FILES_COMPARE_SUCCESS,
  FILES_COMPARE_FAILURE
} from '../actions/Api';

const initialState = {
  uploaded: [],
  results: {},
  rawResults: {}
};

const handlers = {
  [FILES_SEND]: (state, action) => {
    return { uploaded: action.files  }
  },

  [FILES_COMPARE_SUCCESS]: (state, action) => {
    const { diffs, options, warnings  } = action.data;
    const results = { diffs, options, warnings };
    return { results, rawResults: action.data }
  },

  [FILES_COMPARE_FAILURE]: (state, action) => {
    return { results: {}, rawResults: {} }
  }
}

export default createReducer(initialState, handlers);
