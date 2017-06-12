import { combineReducers } from 'redux';
import files from './files';
import api from './api';
import options from './options';

export default combineReducers({ files, api, options });

