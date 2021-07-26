#!/usr/bin/env node

import { writeFileSync, readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { Command } from 'commander/esm.mjs'
import generateNavigator from '../src/index.js'

import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const program = new Command()

const pkg = readFileSync(resolve(__dirname, '../package.json'), { encoding: 'utf8' })
//console.log(__dirname)

program
  .version(JSON.parse(pkg).version, '-v')
  .option('-p, --pages-dir <directory>', 'Directory with the Pages', './pages')
  .option('-d, --dest-dir <directory>', 'Directory of the root navigator', '.')
  .option('-w, --web', 'Replaces Native-stack for Stack and disable react-screens')
  .option('-s, --save-file <File>', 'Save to the specified file')
  .action((options) => {
    const code = generateNavigator(options.pagesDir, options.destDir, options.web)

    if (options.saveFile) {
      writeFileSync(options.saveFile, code)
      console.log('Saved to ', options.saveFile)
    } else {
      console.log(code)
    }
  })
  .parse(process.argv)
