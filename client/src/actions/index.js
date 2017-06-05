export const ADD_FILE = 'ADD_FILE';

export const addFile = (file) => {
  return {
    type: ADD_FILE,
    file
  }
}

// export const setVisibilityFilter = (filter) => {
//   return {
//     type: 'SET_VISIBILITY_FILTER',
//     filter
//   }
// }

// export const toggleTodo = (id) => {
//   return {
//     type: 'TOGGLE_TODO',
//     id
//   }
// }
