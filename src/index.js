import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Assuming your App component is defined in App.js
import './index.css'; // Optional: Import CSS for styling

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);