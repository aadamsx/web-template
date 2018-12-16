# Installs to start

```bash
# Init the project
> yarn

# Add webpack dependencies
> yarn add -D webpack webpack-cli webpack-dev-server html-webpack-plugin@next 

# Add babel7 dependencies
> yarn add -D @babel/core babel-loader @babel/preset-env @babel/preset-react @babel/plugin-proposal-class-properties

# You need polyfills for older browsers
# to use it, make sure it runs before any other code is run by doing this
# import this to the index.js file at the top
# import '@babel/polyfill'
> $ yarn add @babel/polyfill

```






# Beginning webpack.config.js edit

```bash
# Create webpack configuration file
> touch webpack.config.js
```

Note: the rules as written here will not transform our code, it will just run it through babel but will not apply any preset or plugins.

```javascript
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
```

# Beginning .babelrc config edit

```bash
# Create babel configuration file
> touch .babelrc
```
Applies two presets, "env" to transpile everythig down to es5, react preset to transform jsx to react createElement calls
```json
{
  "presets": [
    "@babel/env", 
    "@babel/react"
  ],
  "plugins": [
    "@babel/proposal-class-properties"
  ]
}
```
Look at babel/package github page, if you want something, install and then place in the plugins array.


# Beginning package.json configuration file, scripts edit

```json
"scripts": {
  "start": "webpack-dev-server  --open --port 4000 --compress --mode development",
  "dev": "webpack --mode development --progress",
  "build": "webpack --mode production --progress"
}
```

# Beginning index.html file

```html
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
````

The most important thing is the `root`


# Optimizations

In order for our bundles to not get so large, we have a few options.  Make sure to use the `useBuiltins` option in Babel.


```json
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
```
Look at `browserl.ist` website for options.

Another issue may be that the bundle is too big.  We can try lazy loading or code splitting to remedy that situation.  `Search: webpack code splitting`.

To add code splitting to your index.js file.

```javascript
import(/* webpackChunkName: 'app' */ './App')
  .then(({ default: App }) =>
    render(<App />, document.getElementById('root'))
  )
```
This special dynamic import syntax above is not supported out of the box.  You'll need to also add a plugin by babel


```bash
# Install for dynamic import syntax code splitting or chunking
> $ yarn add -D @babel/plugin-syntax-dynamic-import
```

Go back to your .babelrc and add syntax-dynamic-import to the plugins array list

```json
"plugins": [
  "@babel/proposal-class-properties",
  "@babel/syntax-dynamic-import"
]
```


Optional support for [rest-spread](https://babeljs.io/docs/en/next/babel-plugin-proposal-object-rest-spread.html)


```bash
> yarn add -D @babel/plugin-proposal-object-rest-spread
```

# TypeSript support additions

```bash
# Install for typescript support
> yarn add -D @babel/preset-typescript typescript
```

Make the following additions to the `.bablerc` file.

```json
{
  "presets": [
    "@babel/react", 
    "@babel/typescript", 
    [
      "@babel/env", 
      { "modules": false }
    ]
  ],
```

And add these rules ot the `webpack.config.js` file.

```javascript
rules: [
  {
    test: /\.tsx?$/,
    loader: 'babel-loader',
  },
  {
    test: /\.js$/,
    use: ["source-map-loader"],
    enforce: "pre"
  },
```

Now create a TypeScript configuration file.

```bash
# Create a tsconfig.json
> touch. tsconfig.json
```

Add the following config to the TypeScript configuraion file.

```json
{
    "compilerOptions": {
        "outDir": "./dist/",
        "sourceMap": true,
        "noImplicitAny": true,
        "module": "commonjs",
        "target": "es5",
        "jsx": "react"
    },
    "include": [
        "./src/**/*"
    ]
}
```
