import React from 'react';
import Navigation from './Navigation/Navigation';
import base64 from 'react-native-base64';
import { Provider } from 'react-redux';
import Store from './Store/configureStore'
import { render } from 'react-dom';

if (!global.btoa) { global.btoa = base64.encode }
if (!global.atob) { global.atob = base64.decode }

export default class App extends React.Component {
    render() {
        return (
            <Provider store={Store}>
                <Navigation />
            </Provider>
        );
    }
}
