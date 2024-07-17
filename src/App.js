import React from 'react';
import { Provider } from 'react-redux';
import store from './store'; // Assuming you have your Redux store configured in store.js
import YourComponent from './YourComponent';
import './App.css'; // Your main component where you add lists and tasks

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>multi to do list</h1>
        <YourComponent />
      </div>
    </Provider>
  );
}

export default App;