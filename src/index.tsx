import '@babel/polyfill'
import "core-js/modules/es6.promise";
import "core-js/modules/es6.array.iterator";
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Dynamic Importing for better performance
// App will be broken down into chunks for quicker first runs

// Split your bundles into multiple files for faster load times.
async function getComponents() {
  const element = document.getElementById('root');
  const { default: App } = await import(/* webpackChunkName: "app" */ './App');
  ReactDOM.render(<App />, element);

  return element;
}

getComponents().then(component => {
  document.body.appendChild(component);
})