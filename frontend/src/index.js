import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/utils.css';
import './styles/index.css';
import { Provider } from 'react-redux';
import store from './store';
import { AlertProvider, AlertTemplate, options } from './components/layouts/Alert/Alert'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>,
  document.getElementById('root')
);
