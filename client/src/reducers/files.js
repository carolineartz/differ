import { createReducer } from './utils';

import {
  FILE_ADD,
  FILE_ADD_SUCCESS,
  FILE_ADD_FAILURE
} from '../actions/files';

import _ from 'lodash';

const initialState = {
  adding: [],
  added: [],
  lastAdded: undefined,
  full: false,
  mode: undefined
};

const handlers = {
  [FILE_ADD]: (state, action) => {
    let adding = state.adding.slice(0);
    adding.push(action.file);
    return { adding }
  },

  [FILE_ADD_SUCCESS]: (state, action) => {
    let added = state.added.slice(0);
    added.push(action.file);

    return {
      adding: [],
      added: added,
      mode: action.file.type,
      lastAdded: action.file,
      full: added.length === 2
    }
  },

  [FILE_ADD_FAILURE]: (state, action) => {
    return { mode: state.mode };
  }
}

export default createReducer(initialState, handlers);
