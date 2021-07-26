import generateNavigator from './index.cjs'
import path from 'path'
//console.log(generateNavigator)

export default async function plugin(content) {
  var navigator = generateNavigator(undefined, undefined, true)
  //console.log(navigator)

  const callback = this.async()

  return callback(null, navigator)
}
