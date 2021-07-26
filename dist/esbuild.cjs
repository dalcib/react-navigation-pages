var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};
__markAsModule(exports);
__export(exports, {
  default: () => esbuild_default
});
var import_index = __toModule(require("./index.cjs"));
var import_path = __toModule(require("path"));
function esbuild_default(mainNavigator, pages, dest, forceStack) {
  return {
    name: "auto-navigation",
    setup(build) {
      build.onResolve({filter: new RegExp(mainNavigator)}, (args) => {
        return {path: args.path, namespace: "AutoNavigation"};
      });
      build.onLoad({filter: /.*/, namespace: "AutoNavigation"}, (args) => {
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
