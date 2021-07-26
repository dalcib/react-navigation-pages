var createExpoWebpackConfigAsync = require('@expo/webpack-config')
var VirtualModulesPlugin = require('webpack-virtual-modules')
var generateNavigator = require('./../dist/index.cjs').default
//console.log(generateNavigator)

var navigator = generateNavigator(undefined, undefined, true)

var virtualModules = new VirtualModulesPlugin({
  './AutoNavigator.js': navigator,
})

/* async function plugin(content) {
  const callback = this.async()
  return callback(null, navigator)
} */

/* const loader = {
  test: /AutoNavigator\.js\.nv$/,
  use:  require.resolve('./../dist/webpack.cjs'),
} */

// Expo CLI will await this method so you can optionally return a promise.
module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv)
  // If you want to add a new alias to the config.

  //const babel = config.module.rules //.filter(({ test }) => test === /\.js$/)
  //config.module.rules.unshift(loader)
  config.plugins.unshift(virtualModules)
  console.log(JSON.stringify(config.plugins, null, 2))

  // Finally return the new config for the CLI to use.
  return config
}
