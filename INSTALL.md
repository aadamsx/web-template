> $ create-react-app <project_name>
> Remove node_modules
> Remove yarn.lock
> Remove react-scripts
> Change versions on react and react-dom
> $ yarn

# At this point no ES6+ or JSX , Class properties, Decorators etc. syntax code will be regonized by the browser, time for babel7
# now webpack is the bundler
# for the transpiler, use babel 7
> $ yarn add -D webpack webpack-cli webpack-dev-server html-webpack-plugin@next @babel/core babel-loader @babel/preset-env @babel/preset-react @babel/plugin-proposal-class-properties

> $ touch webpack.config.js
> search: webpack devtool
> search: babel7 website

> Inside webpack.config.js
# note, the rules as written here will not transform our code, it will just run it through babel but will not apply any preset or plugins.

# to do this we need instruct babel explicily
module.exports = {
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' } 
    ]
  }
}

# go to the babel.config.js secion on the website to review your options on configuration
# in this case, to keep the webpack.config.js clean, just create a babelrc file
> $ touch .babelrc
> Inside .babelrc

# applies two presets, "env" to transpile everythig down to es5, react preset to transform jsx to react createElement calls
# applies class props transform class props syntax
# could also install decorator plugin
# look at babel/package github page, if you want something, install and then place in the plugins array here
{
  "presets": [
    "@babel/env", "@babel/react"
  ],
  "plugins": [
    "@babel/proposal-class-properties"
  ]
}

# Now setup the new scripts inside the package.json file

"scripts": {
  "start": "webpack-dev-server",
  "dev": "webpack --mode development --progress",
  "build": "webpack --mode production --progress"
}

# setup the webpack html plugin
# new it up, by requireing it , 

# First import HtmlWebpackPlugin like so:
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
}

# move the index.html file from public into root (and rm the public folder)
# the new html file should look like so:
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>React App</title>
</head>

<body>
  <noscript>
    You need to enable JavaScript to run this app.
  </noscript>
  <div id="root"></div>
</body>

</html>

# the most important thing is the root

# now to to the package.json file and add in options to the webpack dev server start script.  Looking at the options, look to web dev server link and look for the options provided to you
"start": "webpack-dev-server --open --port 4000 --compress --mode development",

# take out the css, logo, svg files, your App.js should look like this to start

import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="App">
        Webpack baseline!!
      </div>
    );
  }
}

export default App;

# now run
> $ yarn start

# should run

> $ yarn build

# should build

# now you need polyfills for older browsers

> $ yarn add @babel/polyfill

# to use it, make sure it runs before any other code is run by doing this

# import this to the index.js file at the top

import '@babel/polyfill'

# in order for our bundles to not get so large, do this

# for bable configuration we can make sure we use the useBuiltins option

# notice the new "useBuiltIns" and "targets"

# look at browserl.ist for options

{
  "presets": [
    [
      "@babel/env",
      {
        "useBuiltIns": "entry",
        "targets": {
          "browsers": [
            ">0.9%",
            "ie >= 11",
            "not op_mini all"
          ]
        }
      }
    ],
    "@babel/react"
  ],
  "plugins": [
    "@babel/proposal-class-properties"
  ]
}

# now the bundle may be too big.  So we can do lazy loading or code splitting to remedy

# search: webpack code splitting

# Add code splitting ot your index.js file

import(/* webpackChunkName: 'app' */ './App')
  .then(({ default: App }) =>
    render(<App />, document.getElementById('root'))
  )

# but this special dynamic import syntax is not supported out of the box.  You'll need to also add a plugin by babel

# look for babel/babel package babel-plugin-syntax-dynamic-import

> $ yarn add -D @babel/plugin-syntax-dynamic-import

# go back to your .babelrc and add this to the list of plugins

"plugins": [
  "@babel/proposal-class-properties",
  "@babel/syntax-dynamic-import"
]

# remember the plugin can be removed as it's implied

> $ yarn build


# for class properties (already installed earlier)
https://babeljs.io/docs/en/babel-plugin-proposal-class-properties

$ yarn add -D @babel/plugin-proposal-class-properties


# for rest-spread
https://babeljs.io/docs/en/next/babel-plugin-proposal-object-rest-spread.html

$ yarn add -D @babel/plugin-proposal-object-rest-spread


# for typescript
yarn add -D @babel/preset-typescript typescript