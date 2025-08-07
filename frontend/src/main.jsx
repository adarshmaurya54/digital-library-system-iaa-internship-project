import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import store from './redux/store.js';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import router from './Router.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router} />
        <Toaster />
    </Provider>
);