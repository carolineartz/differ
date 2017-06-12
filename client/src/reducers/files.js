import { createReducer } from './utils';

import {
  FILE_ADD,
  FILE_ADD_SUCCESS,
  FILE_ADD_FAILURE
} from '../actions/files';

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
    return { adding, mode: action.file.type }
  },

  [FILE_ADD_SUCCESS]: (state, action) => {
    let added = state.added.slice(0);
    added.push(action.file);

    return {
      adding: [],
      lastAdded: action.file,
      full: added.length === 2,
      mode: action.file.type,
      added,
    }
  },

  [FILE_ADD_FAILURE]: (state, action) => {
    return { mode: state.mode };
  }
}

export default createReducer(initialState, handlers);
