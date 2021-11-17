// @author @Bababoy#1524
// Licensed as idk
function addCss(cssCode) {
  var styleElement = document.createElement("style");
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = cssCode;
  } else {
    styleElement.appendChild(document.createTextNode(cssCode));
  }
  document.getElementsByTagName("head")[0].appendChild(styleElement);
}

/**
 * @param {string} url
 */
async function $import(url) {
  let css = await fetch(url).then((x) => x.text());
  addCss(css);
}

/**
 * @param {string} url
 */
async function $require(url) {
  let js = await fetch(url).then((x) => x.text());
  Function(js)();
}

let uBababot = {
  cImport: $import,
  jRequire: $require,
};
window["uBababot"] = uBababot;
