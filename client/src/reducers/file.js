import {
  FILE_ADD,
  FILE_ADD_SUCCESS,
  FILE_ADD_FAILURE
} from '../actions/file';

import { FILE_SEND } from '../actions/Api';

import { createReducer } from './utils';

const initialState = {
  upload: undefined,
  added: [],
  fileMode: undefined
};

// function added(state, action) {
//   let files = state.files.slice(0);
//   for (let i = 0; i < files.length; i++) {
//     if (files[i].file === action.file) {
//       files[i].state = 'Added';
//       break;
//     }
//   }
//   return { files: files }
// }

// function addComplete(state, action) {
//   let files = state.files.slice(0);
//   for (let i = 0; i < files.length; i++) {
//     if (files[i].file === action.file) {
//       files.splice(i, 1);
//       break;
//     }
//   }
//   return { files: files };
// }

// function uploaded(state, action) {
//   let upload = this.state.upload;
//   if (this.state.files.map(f => f.name) === action.files) {
//     upload.state = 'Uploaded'
//   }

//   for (let i = 0; i < uploads.length; i++) {
//     if (uploads[i].file === action.file) {
//       uploads[i].state = 'Uploaded';
//       break;
//     }
//   }
//   return { uploads: uploads };
// }

// function uploadComplete(state, action) {
//   let files = state.added.slice(0);
//   for (let i = 0; i < files.length; i++) {
//     if (files[i].file === action.file) {
//       files.splice(i, 1);
//       break;
//     }
//   }
//   return { added: files };
// }

const handlers = {
  [FILE_ADD]: (state, action) => {
    let files = state.added.slice(0);
    files.push({
      file: action.file,
      state: 'Adding',
      status: 'unknown',
      message: 'Add'
    });

    return { added: files };
  },
  [FILE_ADD_SUCCESS]: (state, action) => {
    return { fileMode: action.file.type };
  },
  [FILE_ADD_FAILURE]: (state, action) => {
    return { fileMode: state.fileMode };
  },
  [FILE_SEND]: (state, action) => initialState
}

export default createReducer(initialState, handlers);
