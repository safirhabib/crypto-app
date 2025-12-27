import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from './components/axiosInstance'; 

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);