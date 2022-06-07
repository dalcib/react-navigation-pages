var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);
var import_fs = require("fs");
var import_path = require("path");
function camelize(text, upperFirst = true) {
  text = text.replace(/[-_\s./\\]+(.)?/g, (_, c) => c ? c.toUpperCase() : "");
  const firstLetter = upperFirst ? text.substr(0, 1).toUpperCase() : text.substr(0, 1).toLowerCase();
  return firstLetter + text.substr(1);
}
function pagesForDirectory(dir = "pages", root = "", forceStack = false) {
  const files = (0, import_fs.readdirSync)(dir);
  if (!files.length)
    return null;
  const results = { pages: [], root };
  for (const fileName of files) {
    if (fileName.match(/node_modules/) || fileName.match(/^\./)) {
      continue;
    }
    const filePath = (0, import_path.join)(dir, fileName).split(import_path.sep).join("/");
    const page = { name: fileName, filePath };
    const stats = (0, import_fs.statSync)(filePath);
    if (stats.isDirectory()) {
      const info = pagesForDirectory(filePath, (0, import_path.join)(root || "", fileName), forceStack);
      if (!info) {
        continue;
      }
      page.directoryInfo = info;
    }
    if (fileName.match(/^_config\.[j|t]s(x|on)?$/)) {
      const configContent = (0, import_fs.readFileSync)((0, import_path.resolve)(filePath), { encoding: "utf8" });
      const navigator = configContent.match(/['"]?navigator['"]?\s*:\s*['"](.*)['"]/);
      if (navigator)
        results.navigator = navigator[1];
      if (forceStack && results.navigator === "native-stack") {
        results.navigator = "stack";
      }
    }
    results.pages.push(page);
  }
  if (!results.navigator)
    results.navigator = "stack";
  return results;
}
const navsDict = {
  "bottom-tabs": "@react-navigation/bottom-tabs",
  drawer: "@react-navigation/drawer",
  stack: "@react-navigation/stack",
  "native-stack": "react-native-screens/native-stack",
  "material-top-tabs": "@react-navigation/material-top-tabs",
  "material-bottom-tabs": "@react-navigation/material-bottom-tabs"
};
const navigators = [];
const screenNavigators = [];
const paths = [];
function buildNavigator(info, destDir) {
  const type = info.navigator;
  let innerProps;
  let Nav = camelize(type);
  let custom = false;
  const elems = [];
  const ScreenNavigator = info.root ? camelize(info.root) + "Screen" : "AutoNavigation";
  navigators.push(type);
  const screens = [];
  for (const { name, filePath, directoryInfo } of info.pages) {
    let component;
    const key = name.includes(".") ? name.split(".").slice(0, -1).join(".") : name;
    if (directoryInfo) {
      screenNavigators.push(buildNavigator(directoryInfo, destDir));
      component = camelize(directoryInfo.root) + "Screen";
    } else {
      let path = "./" + (0, import_path.relative)(destDir, filePath).split(import_path.sep).join("/");
      path = name.endsWith(".json") ? path : path.split(".").slice(0, -1).join(".");
      paths.push(path);
      component = camelize(path);
      if (name.startsWith("_navigator")) {
        Nav = component;
        custom = true;
        continue;
      }
      if (name.startsWith("_config")) {
        innerProps = component;
        continue;
      }
      if (name.startsWith("_")) {
        elems.push([camelize(key, false), component]);
        continue;
      }
    }
    screens.push(`      <${Nav}.Screen name={'${key}'} key={'${key}'}  component={${component}}/>`);
  }
  const result = `function ${ScreenNavigator} (props){
  return (
    <${Nav}${!custom ? ".Navigator" : ""} {...props}${innerProps ? " {..." + innerProps + "}" : ""}${elems.length ? " " + elems.map(([prop, elem]) => prop + "={" + elem + "}").join(" ") : ""}>
${screens.join("\n")}
    </${Nav}${!custom ? ".Navigator" : ""}>
  )
}`;
  return result;
}
function createNav(nav) {
  if (nav.endsWith("s"))
    nav = nav.slice(0, -1);
  return "create" + camelize(nav) + "Navigator";
}
function src_default(pagesDir = "pages", destDir = ".", forceStack, type = "esm") {
  const routes = pagesForDirectory(pagesDir, "", forceStack);
  screenNavigators.push(buildNavigator(routes, destDir));
  const native = !forceStack;
  const uNavigators = [...new Set(navigators)];
  function genImport(mod, path) {
    if (type === "cjs") {
      return `const ${mod} = require('${path}')`;
    } else {
      return `import ${mod} from '${path}'`;
    }
  }
  function generateCode() {
    return [
      `import React from 'react'`,
      uNavigators.map((nav) => genImport(`{${createNav(nav)}}`, navsDict[nav])).join("\n"),
      paths.map((comp) => genImport(camelize(comp), comp)).join("\n"),
      native ? `${genImport("enableScreens", "react-native-screens")};
enableScreens();
` : "",
      uNavigators.map((nav) => `const ${camelize(nav)} = ${createNav(nav)}()`).join("\n"),
      "\n",
      screenNavigators.join("\n\n"),
      type === "esm" ? "\nexport default AutoNavigation\n" : "\nmodule.exports = AutoNavigation\n"
    ].join("\n");
  }
  const code = generateCode();
  return code;
}
