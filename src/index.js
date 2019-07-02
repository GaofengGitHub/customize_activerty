import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; 
import configureStore from './store/configure-store';
import rootSaga from './sagas/index';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Router,hashHistory } from 'react-router';
import routeConfig from './router'

const store = configureStore();  

// run root saga
store.runSaga(rootSaga);

const Root = () => (
    <Provider store={store}>
        <Router routes={routeConfig} history={hashHistory}/>
    </Provider>
);

export  {Root,store}; 


ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();  
 