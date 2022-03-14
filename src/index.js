import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
// import './i18next';
import store from './store';



ReactDOM.render(
  <Suspense fallback={<div className='se-pre-con'></div>}>
    <Provider store={store}>
    <Router>
      <React.StrictMode>
        <App />
        <ToastContainer />
      </React.StrictMode>
    </Router>
  </Provider>,
  </Suspense>,
  document.getElementById('root')
);

