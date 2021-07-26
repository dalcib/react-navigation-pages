/**
 * @typedef {import('esbuild').Plugin} Plugin
 * @typedef {import('esbuild').PluginBuild} PluginBuild
 * @typedef {import('esbuild').OnLoadArgs} OnLoadArgs
 * @typedef {import('esbuild').OnResolveArgs} OnResolveArgs
 * @typedef {import('esbuild').Message} Message
 */

import generateReactNavigation from './index.cjs'
import { parse } from 'path'

/**
 * @export
 * @param {string} [dest]
 * @return {Plugin}
 */
export default function (mainNavigator, pages, dest, forceStack) {
  return {
    name: 'auto-navigation',

    /** @param {PluginBuild} build */
    setup(build) {
      build.onResolve({ filter: new RegExp(mainNavigator) }, (args) => {
        return { path: args.path, namespace: 'AutoNavigation' }
      })
      /** @param {OnLoadArgs} data */
      build.onLoad({ filter: /.*/, namespace: 'AutoNavigation' }, (args) => {
        console.log(generateReactNavigation(pages, dest, forceStack, pages, dest, forceStack))
        return {
          contents: generateReactNavigation(pages, dest, forceStack),
          loader: 'jsx',
          resolveDir: parse(args.path).dir,
        }
      })
    },
  }
}
