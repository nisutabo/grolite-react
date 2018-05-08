import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore , applyMiddleware, combineReducers } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom'
import manageGreenhouse from './reducers/manageGreenhouse'
import manageUsers from './reducers/manageUsers'
import thunk from 'redux-thunk';


const rootReducer = combineReducers({users: manageUsers, greenhouse: manageGreenhouse})

const store = createStore(rootReducer, applyMiddleware(thunk));


ReactDOM.render(
  <Router>
    <Provider store={store}>
        <App />
    </Provider>
  </Router>,
  document.getElementById('root'));
registerServiceWorker();
