/*import { createStore } from 'redux';
import rootReducer from './reducers';
// Example middleware, you may have others
 // Assuming you have a rootReducer that combines all reducers

// Combine reducers if you have multiple reducers


// Apply middleware if needed
 // Example middleware, you may have others
// You can add more middleware here if needed

// Create the Redux store with combined reducers and middleware
const store = createStore(
 rootReducer,
 
);

export default store;

*/
import { createStore } from 'redux';
import reducer from './reducers';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('todoState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('todoState', serializedState);
  } catch (error) {
    // Ignore write errors
  }
};

const persistedState = loadState();

const store = createStore(
  reducer,
  persistedState
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;























