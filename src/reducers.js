import { ADD_TASKS_TO_LIST, DELETE_TODO_LIST, UPDATE_LIST } from './actions';

const initialState = {
  lists: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASKS_TO_LIST:
      return {
        ...state,
        lists: [...state.lists, action.payload],
      };
    case DELETE_TODO_LIST:
      return {
        ...state,
        lists: state.lists.filter((_, index) => index !== action.payload),
      };
    case UPDATE_LIST:
      return {
        ...state,
        lists: state.lists.map((list, index) =>
          index === action.payload.index
            ? { title: action.payload.title, tasks: action.payload.tasks }
            : list
        ),
      };
    default:
      return state;
  }
};

export default reducer;