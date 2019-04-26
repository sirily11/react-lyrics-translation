import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Music from './components/settings/music';


let musicProvider = Music.sharedProvider()
musicProvider.configure()
let musicInstance = musicProvider.getMusicInstance()

ReactDOM.render(<App musicInstance={musicInstance} />, document.getElementById('app'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
