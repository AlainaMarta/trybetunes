import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import IsLoadingProvider from './context/LoadingProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
  <React.StrictMode>
    <IsLoadingProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </IsLoadingProvider>
  </React.StrictMode>,
);
