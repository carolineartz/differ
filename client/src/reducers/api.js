import { createReducer } from './utils';

import {
  FILES_SEND,
  FILES_COMPARE_SUCCESS,
  FILES_COMPARE_FAILURE
} from '../actions/Api';

const initialState = {
  uploaded: [],
  results: {}
};

const handlers = {
  [FILES_SEND]: (state, action) => {
    return { uploaded: action.files  }
  },

  [FILES_COMPARE_SUCCESS]: (state, action) => {
    return { results: action.data }
  },

  [FILES_COMPARE_FAILURE]: (state, action) => {
    return { results: {} }
  }
}

export default createReducer(initialState, handlers);
