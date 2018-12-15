import '@babel/polyfill'
import "core-js/modules/es6.promise";
import "core-js/modules/es6.array.iterator";
import React from 'react';
import ReactDOM from 'react-dom';

// Dynamic Importing for better performance
// App will be broken down into chunks for quicker first runs
async function getComponents() {
  const element = document.getElementById('root');
  const { default: App } = await import(/* webpackChunkName: "app" */ './App');
  ReactDOM.render(<App />, element);

  return element;
}

getComponents().then(component => {
  document.body.appendChild(component);
})