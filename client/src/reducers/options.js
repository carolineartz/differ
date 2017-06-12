import { createReducer } from './utils';
import _ from 'lodash';

import {
  KEY_FIELD_SELECT,
  IGNORE_FIELD_SELECT
} from '../actions/options';

const initialState = {};

const handlers = {
  [KEY_FIELD_SELECT]: (state, action) => {
    const { id, value, fields } = action;
    state[id] = state[id] || {};

    let { ignores } = state[id];
    const ignoreFields = _.difference(ignores, value);
    const ignoreFieldOptions = _.difference(fields, value);
    const keyFieldOptions = _.difference(fields, ignoreFields);
    return {
      [id]: {
        keys: value,
        keyOptions: keyFieldOptions,
        ignores: ignoreFields,
        ignoreOptions: ignoreFieldOptions
      }
    }
  },

  [IGNORE_FIELD_SELECT]: (state, action) => {
    const { id, value, fields } = action;
    state[id] = state[id] || {};

    let { keys } = state[id];
    const keyFields = _.difference(keys, value);
    const keyFieldOptions = _.difference(fields, value);
    const ignoreFieldOptions = _.difference(fields, keyFields);
    return {
      [id]: {
        ignores: value,
        ignoreOptions: ignoreFieldOptions,
        keys: keyFields,
        keyOptions: keyFieldOptions
      }
    }
  },
}

export default createReducer(initialState, handlers);

