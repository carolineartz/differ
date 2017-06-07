import { combineReducers } from 'redux';
import files from './files';
import api from './api';

export default combineReducers({ files, api });

