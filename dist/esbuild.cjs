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
var esbuild_exports = {};
__export(esbuild_exports, {
  default: () => esbuild_default
});
module.exports = __toCommonJS(esbuild_exports);
var import_index = __toESM(require("./index.cjs"), 1);
var import_path = require("path");
function esbuild_default(mainNavigator, pages, dest, forceStack) {
  return {
    name: "auto-navigation",
    setup(build) {
      build.onResolve({ filter: new RegExp(mainNavigator) }, (args) => {
        return { path: args.path, namespace: "AutoNavigation" };
      });
      build.onLoad({ filter: /.*/, namespace: "AutoNavigation" }, (args) => {
        console.log((0, import_index.default)(pages, dest, forceStack, pages, dest, forceStack));
        return {
          contents: (0, import_index.default)(pages, dest, forceStack),
          loader: "jsx",
          resolveDir: (0, import_path.parse)(args.path).dir
        };
      });
    }
  };
}
