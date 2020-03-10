/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './app/App';
import {name as appName} from './app.json';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware,compose} from 'redux';
import { Provider } from 'react-redux';
import reducers from './app/reducers';
function Root(){
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return(
        <Provider store={store}>
            <App/>
        </Provider>
    )
}
AppRegistry.registerComponent(appName, () => Root);
