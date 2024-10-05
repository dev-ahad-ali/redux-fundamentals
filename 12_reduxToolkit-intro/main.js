import { createRoot } from 'react-dom/client';
import App from './App.js';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home.js';
import Cart from './pages/Cart.js';
import React from 'react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
    ],
  },
]);

createRoot(document.querySelector('#root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
