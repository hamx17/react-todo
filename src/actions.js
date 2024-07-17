export const ADD_TASKS_TO_LIST = 'ADD_TASKS_TO_LIST';
export const DELETE_TODO_LIST = 'DELETE_TODO_LIST';
export const UPDATE_LIST = 'UPDATE_LIST';

export const addTasksToList = (title, tasks) => ({
  type: ADD_TASKS_TO_LIST,
  payload: { title, tasks },
});

export const deleteToDoList = (index) => ({
  type: DELETE_TODO_LIST,
  payload: index,
});

export const updateList = (index, title, tasks) => ({
  type: UPDATE_LIST,
  payload: { index, title, tasks },
});