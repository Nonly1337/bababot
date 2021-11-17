// @author Bababoy
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

async function $import(url) {
  let css = await fetch(url).then((x) => x.text());
  addCss(css);
}
async function $require(url) {
  let js = await fetch(url).then((x) => x.text());
  Function(js)();
}
window.uBababot = {
  loadJS: $import,
  loadCSS: $require,
};
