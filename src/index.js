import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs'
import { join, sep, resolve, relative } from 'path'

/**
 * @typedef {'stack' | 'bottom-tabs' | 'drawer' | 'native-stack' | 'material-bottom-tabs' | 'material-top-tabs' } NavigationTypes
 *
 * @typedef DirectoryInfo
 * @property {Page[]} pages
 * @property {string} root
 * @property {NavigationTypes} [navigator]
 *
 * @typedef Page
 * @property {string} name
 * @property {string} filePath
 * @property {DirectoryInfo} [directoryInfo]
 */

/**
 * @param {string} text
 * @param {boolean} [upperFirst=true]
 * @return {string}
 */
function camelize(text, upperFirst = true) {
  text = text.replace(/[-_\s./\\]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
  const firstLetter = upperFirst ? text.substr(0, 1).toUpperCase() : text.substr(0, 1).toLowerCase()
  return firstLetter + text.substr(1)
}

/**
 * @param {string} [dir='pages']
 * @param {string} [root='']
 * @param {boolean} [forceStack=false]
 * @return {Promise<DirectoryInfo>}
 */
function pagesForDirectory(dir = 'pages', root = '', forceStack = false) {
  const files = readdirSync(dir)
  if (!files.length) return null
  /** @type {DirectoryInfo} */
  const results = { pages: [], root }
  for (const fileName of files) {
    if (fileName.match(/node_modules/) || fileName.match(/^\./)) {
      continue
    }
    const filePath = join(dir, fileName).split(sep).join('/')
    /** @type {Page} */
    const page = { name: fileName, filePath }
    const stats = statSync(filePath)
    if (stats.isDirectory()) {
      const info = pagesForDirectory(filePath, join(root || '', fileName), forceStack)
      if (!info) {
        continue
      }
      page.directoryInfo = info
    }
    if (fileName.match(/^_config\.[j|t]s(x|on)?$/)) {
      const configContent = readFileSync(resolve(filePath), { encoding: 'utf8' })
      const navigator = configContent.match(/['"]?navigator['"]?\s*:\s*['"](.*)['"]/)
      if (navigator) results.navigator = navigator[1]
      if (forceStack && results.navigator === 'native-stack') {
        results.navigator = 'stack'
      }
    }

    results.pages.push(page)
  }
  if (!results.navigator) results.navigator = 'stack'
  return results
}

/** @type {Record<NavigationTypes, string>} */
const navsDict = {
  'bottom-tabs': '@react-navigation/bottom-tabs',
  drawer: '@react-navigation/drawer',
  stack: '@react-navigation/stack',
  'native-stack': 'react-native-screens/native-stack',
  'material-top-tabs': '@react-navigation/material-top-tabs',
  'material-bottom-tabs': '@react-navigation/material-bottom-tabs',
}

/** @type {NavigationTypes[]} */
const navigators = []
/** @type {string[]} */
const screenNavigators = []
/** @type {string[]} */
const paths = []

/**
 * @param {DirectoryInfo} info
 * @return {string}
 */
function buildNavigator(info, destDir) {
  const type = info.navigator
  let innerProps
  let Nav = camelize(type)
  let custom = false
  const elems = []
  const ScreenNavigator = info.root ? camelize(info.root) + 'Screen' : 'AutoNavigation'
  navigators.push(type)
  const screens = []
  for (const { name, filePath, directoryInfo } of info.pages) {
    let component
    const key = name.includes('.') ? name.split('.').slice(0, -1).join('.') : name
    if (directoryInfo) {
      screenNavigators.push(buildNavigator(directoryInfo, destDir))
      component = camelize(directoryInfo.root) + 'Screen'
    } else {
      let path = './' + relative(destDir, filePath).split(sep).join('/')
      path = name.endsWith('.json') ? path : path.split('.').slice(0, -1).join('.')
      paths.push(path)
      component = camelize(path)
      if (name.startsWith('_navigator')) {
        Nav = component
        custom = true
        continue
      }
      if (name.startsWith('_config')) {
        innerProps = component
        continue
      }
      if (name.startsWith('_')) {
        elems.push([camelize(key, false), component])
        continue
      }
    }
    screens.push(`      <${Nav}.Screen name={'${key}'} key={'${key}'}  component={${component}}/>`)
  }
  const result = `function ${ScreenNavigator} (props){\n  return (\n    <${Nav}${
    !custom ? '.Navigator' : ''
  } {...props}${innerProps ? ' {...' + innerProps + '}' : ''}${
    elems.length ? ' ' + elems.map(([prop, elem]) => prop + '={' + elem + '}').join(' ') : ''
  }>\n${screens.join('\n')}\n    </${Nav}${!custom ? '.Navigator' : ''}>\n  )\n}`
  return result
}

function createNav(nav) {
  if (nav.endsWith('s')) nav = nav.slice(0, -1)
  return 'create' + camelize(nav) + 'Navigator'
}

/**
 * @export
 * @param {string} [pagesDir='pages']
 * @param {string} [destDir='.']
 * @param {boolean} [forceStack]
 * @param {string} [saveToFile]
 * @param {'esm' | 'cjs'} [type]
 */
export default function (pagesDir = 'pages', destDir = '.', forceStack, type = 'esm') {
  const routes = pagesForDirectory(pagesDir, '', forceStack)
  screenNavigators.push(buildNavigator(routes, destDir))
  const native = !forceStack
  const uNavigators = [...new Set(navigators)]

  function genImport(mod, path) {
    if (type === 'cjs') {
      return `const ${mod} = require('${path}')`
    } else {
      return `import ${mod} from '${path}'`
    }
  }

  function generateCode() {
    return [
      `import React from 'react'`,
      uNavigators.map((nav) => genImport(`{${createNav(nav)}}`, navsDict[nav])).join('\n'),
      paths.map((comp) => genImport(camelize(comp), comp)).join('\n'),
      native ? `${genImport('enableScreens', 'react-native-screens')};\nenableScreens();\n` : '',
      uNavigators.map((nav) => `const ${camelize(nav)} = ${createNav(nav)}()`).join('\n'),
      '\n',
      screenNavigators.join('\n\n'),
      type === 'esm' ? '\nexport default AutoNavigation\n' : '\nmodule.exports = AutoNavigation\n',
    ].join('\n')
  }
  const code = generateCode()

  return code
}
