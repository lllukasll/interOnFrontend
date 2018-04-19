import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store, history } from './helpers';
import { mainCategoryActions } from './actions';
import routes from './routes';
import App from './components/App.js'
import { userActions } from './actions';


render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
