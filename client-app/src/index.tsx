import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.css';
import './app/layout/styles.css';
import { store, StoreContext } from './app/stores/store';

export const history = createBrowserHistory();

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreContext.Provider>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
