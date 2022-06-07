var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var metro_transformer_exports = {};
__export(metro_transformer_exports, {
  transform: () => transform
});
module.exports = __toCommonJS(metro_transformer_exports);
var import_metro_transformer = __toESM(require("./../dist/metro-transformer"), 1);
var import_metro_react_native_babel_transformer = __toESM(require("metro-react-native-babel-transformer"), 1);
function transform({ src, filename, options }) {
  if (filename.endsWith("AutoNavigator.js")) {
    var jsCode = (0, import_metro_transformer.default)();
    return (0, import_metro_react_native_babel_transformer.default)({
      src: jsCode,
      filename,
      options
    });
  }
  return (0, import_metro_react_native_babel_transformer.default)({ src, filename, options });
}
