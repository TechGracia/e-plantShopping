import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Main application component
import './index.css'; // Global styles
import { Provider } from 'react-redux'; // Redux Provider
import store from './store.js'; // Redux store

// Render the application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> {/* Provide the Redux store to the app */}
      <App />
    </Provider>
  </React.StrictMode>
);
