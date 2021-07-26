import generateNavigation from './../dist/metro-transformer'
import upstreamTransformer from 'metro-react-native-babel-transformer'

export function transform({ src, filename, options }) {
  if (filename.endsWith('AutoNavigator.js')) {
    var jsCode = generateNavigation()
    return upstreamTransformer({
      src: jsCode,
      filename,
      options,
    })
  }
  return upstreamTransformer({ src, filename, options })
}
