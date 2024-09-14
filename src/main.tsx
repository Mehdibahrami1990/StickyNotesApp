import React from 'react';
import ReactDOM from 'react-dom/client';
import NotesProvider from './context/NotesContextUser';
import App from './App.tsx';
import './styles/index.css';
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NotesProvider>
      <App />
    </NotesProvider>
  </React.StrictMode>
);
