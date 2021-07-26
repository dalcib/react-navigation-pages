var __create = Object.create
var __defProp = Object.defineProperty
var __getProtoOf = Object.getPrototypeOf
var __hasOwnProp = Object.prototype.hasOwnProperty
var __getOwnPropNames = Object.getOwnPropertyNames
var __getOwnPropDesc = Object.getOwnPropertyDescriptor
var __markAsModule = (target) => __defProp(target, '__esModule', { value: true })
var __export = (target, all) => {
  for (var name in all) __defProp(target, name, { get: all[name], enumerable: true })
}
var __reExport = (target, module2, desc) => {
  if ((module2 && typeof module2 === 'object') || typeof module2 === 'function') {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== 'default')
        __defProp(target, key, {
          get: () => module2[key],
          enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable,
        })
  }
  return target
}
var __toModule = (module2) => {
  return __reExport(
    __markAsModule(
      __defProp(
        module2 != null ? __create(__getProtoOf(module2)) : {},
        'default',
        module2 && module2.__esModule && 'default' in module2
          ? { get: () => module2.default, enumerable: true }
          : { value: module2, enumerable: true }
      )
    ),
    module2
  )
}
__markAsModule(exports)
__export(exports, {
  transform: () => transform,
})
var import_metro_transformer = __toModule(require('./metro-transformer'))
var import_metro_react_native_babel_transformer = __toModule(
  require('metro-react-native-babel-transformer')
)
function transform({ src, filename, options }) {
  if (filename.endsWith('AutoNavigator.js')) {
    var jsCode = (0, import_metro_transformer.default)()
    return (0, import_metro_react_native_babel_transformer.default)({
      src: jsCode,
      filename,
      options,
    })
  }
  return (0, import_metro_react_native_babel_transformer.default)({ src, filename, options })
}
