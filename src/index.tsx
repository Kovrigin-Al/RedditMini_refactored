import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import NavBar from './components/NavBar';
import Toasts from './components/Toasts';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <NavBar/>
      <App />
      <Toasts />
    </Provider>
  </React.StrictMode>
);


