import { createReducer } from './utils';

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
  results: {},
  rawResults: {},
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

  [FILES_COMPARE_SUCCESS]: (state, action) => {
    const { diffs, options, warnings  } = action.data;
    const results = { diffs, options, warnings };
    return { results, rawResults: action.data }
  },

  [FILES_COMPARE_FAILURE]: (state, action) => {
    return { results: {}, rawResults: {} }
  },

  [FILES_CONVERT_SUCCESS]: (state, action) => {
    const fileData = new FileData(action.data)

    return {
      converted: action.data,
      fileData,
      dataSets: fileData.dataSets
    }
  },

  [FILES_CONVERT_FAILURE]: (state, action) => {
    console.log('state', state)
    console.log('action', action)
    return { converted: {} }
  }
}

export default createReducer(initialState, handlers);


// {
//   workbooks: [@wb1.original_filename, @wb2.original_filename],
//   sheets: [
//     {
//       name: ,
//       [@wb1.original_filename]: ...,
//       [@wb2.original_filename]: ...
//     }
//   ]
// }

