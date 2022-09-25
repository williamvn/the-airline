import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import { Web3Provider } from './contexts/Web3Context/Web3Provider';
import { UserProvider } from './contexts/UserContext/UserProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Web3Provider>
      <UserProvider>
        <App />
      </UserProvider>
    </Web3Provider>
  </React.StrictMode>
);