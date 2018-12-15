import '@babel/polyfill'
import "core-js/modules/es6.promise";
import "core-js/modules/es6.array.iterator";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


// import( /* webpackChunkName: 'app' */'./App')
//   .then(({ default: App }) => {
//     render(<App />, document.getElementById('root'))
//   });
ReactDOM.render(<App />, document.getElementById('root'));

