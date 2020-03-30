import React from 'react';
import Navigation from './Navigation/Navigation';
import base64 from 'react-native-base64';
if (!global.btoa) {  global.btoa = base64.encode }

if (!global.atob) { global.atob = base64.decode }

export default function App() {
    return (
            <Navigation />
    );
}

