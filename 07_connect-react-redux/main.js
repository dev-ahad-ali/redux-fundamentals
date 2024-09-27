import { createRoot } from 'react-dom/client';
import App from './App.js';
import { Provider } from 'react-redux';
import { store } from './store/store.js';

createRoot(document.querySelector('#root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
