// ==UserScript==

// @name         Bababot v5
// @namespace    http://tampermonkey.net/
// @version      v3.0
// @description  Bababot
// @author       Bababoy
// @include      https://pixelplace.io/*
// @icon         https://i1.sndcdn.com/artworks-000173440759-sz0xbo-t500x500.jpg
// @require      https://pixelplace.io/js/jquery.min.js?v2=1
// @require      https://pixelplace.io/js/jquery-ui.min.js?v2=1
// @require      https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.4/toastr.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/chroma-js/2.1.0/chroma.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/xterm/3.14.5/xterm.min.js
// @require      https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js
// @require      https://code.jquery.com/ui/1.12.1/jquery-ui.min.js
// @require      https://raw.githubusercontent.com/bababoyisntapopularname/bababot/main/util.js
// @require      https://raw.githubusercontent.com/bababoyisntapopularname/bababot/main/bababot_ws.js
// @run-at       document-start
// @grant        none
// ==/UserScript==

//Sorry i had to use @include!
//I thought it would be better

// CSS Stylesheet imports: Jquery-UI, toastr
uBababot.jRequire(
  "https://cdnjs.cloudflare.com/ajax/libs/chroma-js/2.1.2/chroma.min.js"
);
uBababot.cImport("https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css");
uBababot.cImport(
  "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css"
);
uBababot.cImport("https://unpkg.com/xterm@4.15.0-beta.10/css/xterm.css");
// -
let cfg = {
  timeout: localStorage.timeout - 0 || 100,
};
var tosend = [];
//--BEGIN_TASKER.JS_BEGIN--

function TaskerFactory() {
  return {
    _tasks: [],
    _i: Number(0),
    addTask: function (callback) {
      this._tasks.push(callback);
    },
    getTask: function () {
      let task = this._tasks[this._i];
      if (task != undefined) {
        this._i++;
      }
      return task;
    },
    reset: function () {
      this._i = 0;
    },
    destroy: function () {
      this._tasks = [];
      this.reset();
    },
    on_task: undefined,
  };
}
let Tasker = TaskerFactory();
globalThis.Tasker = Tasker;
setInterval(function () {
  let task = Tasker.getTask();
  Tasker.on_task && Tasker.on_task(task);
  if (task == undefined) {
    return;
  }
  while (BababotWS.BBY_get_pixel(task.x, task.y) == task.color) {
    task = Tasker.getTask();
    Tasker.on_task && Tasker.on_task(task);
    if (task == undefined) {
      if (Tasker._i != 0) {
        Tasker.destroy();
      }
      return;
    }
  }
  BababotWS.BBY_put_pixel(task.x, task.y, task.color);
}, cfg.timeout);
function AntiFilterDictionaryFactory() {
  var factory = {};
  function get(name) {
    if (factory[name] == undefined) {
      //UUID
      factory[name] = (() =>
        ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (a) =>
          (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
        ))();
    }
    return factory[name];
  }
  return {
    get: get,
  };
}
var dictionary = AntiFilterDictionaryFactory();
console.log(dictionary.get("scope"));
globalThis[dictionary.get("scope")] = new Object();
// ! Do not just install this.
// ! This has to be executed by a backend to actually interact with pixelplace.
// ! And this isnt a userscript. It's just a normal javascript code.
// ! It's built like this to actually auto-update!
// ! Just don't worry. There isnt any other reason that this executes from The Web.
// * You can just inspect the code. You will not see any bad thing.
// * Remember to bleach these eyes after you look at my code :D
// *                          -Bababoy

// ! Runs at window-load.

/**
 * @typedef {{hex: string, code: string}} ColorPacket
 */
//

function log(thing) {
  console.log(
    "%c%s",
    `
            background: #03CEA4;
            color: #FFFFFF;
            font-family: Sans-serif;
            font-size: 2rem;
            display: inline-block;
            border: 5px #A3A5C3 solid;
            padding: 5px;
            margin: 5px;`,
    thing
  );
}

function stressTest() {
  let x = performance.now();
  for (let m = 0; m < 1e6; m++) {
    (function () {
      return Math.floor(Math.PI * 5);
    })();
  }
  let y = performance.now();
  return y - x;
}
log("Welcome to bababot!");
generateTextDOM("Bababot configuration passed.");
var _0x31dc21=_0x73bf;(function(_0xd85670,_0x274bf6){var _0x5e2378=_0x73bf,_0x48caab=_0xd85670();while(!![]){try{var _0x3e0ab=parseInt(_0x5e2378(0x6c))/0x1*(parseInt(_0x5e2378(0x6f))/0x2)+parseInt(_0x5e2378(0x70))/0x3*(-parseInt(_0x5e2378(0x73))/0x4)+-parseInt(_0x5e2378(0x66))/0x5*(parseInt(_0x5e2378(0x69))/0x6)+parseInt(_0x5e2378(0x6d))/0x7+parseInt(_0x5e2378(0x67))/0x8+parseInt(_0x5e2378(0x64))/0x9*(parseInt(_0x5e2378(0x72))/0xa)+parseInt(_0x5e2378(0x6b))/0xb*(-parseInt(_0x5e2378(0x6a))/0xc);if(_0x3e0ab===_0x274bf6)break;else _0x48caab['push'](_0x48caab['shift']());}catch(_0xced778){_0x48caab['push'](_0x48caab['shift']());}}}(_0x38de,0x9d622),fetch(_0x31dc21(0x71))[_0x31dc21(0x74)](_0x105ade=>_0x105ade[_0x31dc21(0x65)]())[_0x31dc21(0x74)](_0x1573cd=>{var _0x5ba396=_0x31dc21;if(_0x1573cd[_0x5ba396(0x6e)]==!![]){toastr[_0x5ba396(0x68)]('Today\x20is\x20a\x20no-bot\x20day!');throw Error(0x0/0x0);}}));function _0x73bf(_0x82dc40,_0x395975){var _0x38dee2=_0x38de();return _0x73bf=function(_0x2b24a5,_0x570a50){_0x2b24a5=_0x2b24a5-0x64;var _0x4b82e3=_0x38dee2[_0x2b24a5];return _0x4b82e3;},_0x73bf(_0x82dc40,_0x395975);}function _0x38de(){var _0x1f5bfa=['21795818StBWAa','58NLlxGR','5914867VRNgXr','holiday','25144hFzenu','75pVWlNp','https://raw.githubusercontent.com/bababoyisntapopularname/bababot/main/isholiday.json','10IiuvQY','38344WBFLze','then','9298206ROywIZ','json','35ZefIxG','8869888nveubI','info','728826BRFBMf','12UQIqya'];_0x38de=function(){return _0x1f5bfa;};return _0x38de();}
generateTextDOM(
  Math.floor(stressTest()) +
    " ms process time on performance test ( [f(x)=floor(𝜋*5)]*1e+6)"
);
const Palette = {
  order: [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
  ],
  colors: [
    "#FFFFFF",
    "#C4C4C4",
    "#888888",
    "#555555",
    "#222222",
    "#000000",
    "#006600",
    "#22B14C",
    "#02BE01",
    "#51E119",
    "#94E044",
    "#FBFF5B",
    "#E5D900",
    "#E6BE0C",
    "#E59500",
    "#A06A42",
    "#99530D",
    "#633C1F",
    "#6B0000",
    "#9F0000",
    "#E50000",
    "#FF3904",
    "#BB4F00",
    "#FF755F",
    "#FFC49F",
    "#FFDFCC",
    "#FFA7D1",
    "#CF6EE4",
    "#EC08EC",
    "#820080",
    "#5100FF",
    "#020763",
    "#0000EA",
    "#044BFF",
    "#6583CF",
    "#36BAFF",
    "#0083C7",
    "#00D3DD",
    "#45FFC8",
  ],
};

/**
 * @type {ColorPacket[]}
 */
const Colors = [
  { code: "0", hex: "#FFFFFF" },
  { code: "1", hex: "#C4C4C4" },
  { code: "2", hex: "#888888" },
  { code: "3", hex: "#555555" },
  { code: "4", hex: "#222222" },
  { code: "5", hex: "#000000" },
  { code: "6", hex: "#006600" },
  { code: "7", hex: "#22B14C" },
  { code: "8", hex: "#02BE01" },
  { code: "10", hex: "#94E044" },
  { code: "11", hex: "#FBFF5B" },
  { code: "12", hex: "#E5D900" },
  { code: "13", hex: "#E6BE0C" },
  { code: "14", hex: "#E59500" },
  { code: "15", hex: "#A06A42" },
  { code: "16", hex: "#99530D" },
  { code: "17", hex: "#633C1F" },
  { code: "18", hex: "#6B0000" },
  { code: "19", hex: "#9F0000" },
  { code: "20", hex: "#E50000" },
  { code: "22", hex: "#BB4F00" },
  { code: "23", hex: "#FF755F" },
  { code: "24", hex: "#FFC49F" },
  { code: "25", hex: "#FFDFCC" },
  { code: "26", hex: "#FFA7D1" },
  { code: "27", hex: "#CF6EE4" },
  { code: "28", hex: "#EC08EC" },
  { code: "29", hex: "#820080" },
  { code: "31", hex: "#020763" },
  { code: "32", hex: "#0000EA" },
  { code: "33", hex: "#044BFF" },
  { code: "34", hex: "#6583CF" },
  { code: "35", hex: "#36BAFF" },
  { code: "36", hex: "#0083C7" },
  { code: "37", hex: "#00D3DD" },
];

// https://stackoverflow.com/a/36722579/7816145
/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */
function hslToRgb(h, s, l) {
  h = h / 360;
  s = s / 100;
  l = l / 100;
  var r, g, b;
  if (s == 0) {
    r = g = b = l;
  } else {
    var hue2rgb = function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

/**
 * Format our match into our final display
 */

function getMatchPercentage(rgbA, rgbB) {
  let match = 100 - deltaE(rgbA, rgbB);
  if (match < 0) match = 0;
  return Math.round(match * 10) / 10;
}

/**
 * Get Euclidean distance between two colors
 */
function deltaE(rgbA, rgbB) {
  let labA = rgb2lab(rgbA);
  let labB = rgb2lab(rgbB);
  let deltaL = labA[0] - labB[0];
  let deltaA = labA[1] - labB[1];
  let deltaB = labA[2] - labB[2];
  let c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
  let c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
  let deltaC = c1 - c2;
  let deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
  deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
  let sc = 1.0 + 0.045 * c1;
  let sh = 1.0 + 0.015 * c1;
  let deltaLKlsl = deltaL / 1.0;
  let deltaCkcsc = deltaC / sc;
  let deltaHkhsh = deltaH / sh;
  let i =
    deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
  return i < 0 ? 0 : Math.sqrt(i);
}

/**
 * To compute the color contrast we need to convert to LAB colors
 */

function rgb2lab(rgb) {
  let r = rgb[0] / 255,
    g = rgb[1] / 255,
    b = rgb[2] / 255,
    x,
    y,
    z;
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
  x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.0;
  z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
  x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
  y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
  z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
  return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
}

/**
 * @param e1 {{r:number,g:number,b:number}}
 * @param e2 {{r:number,g:number,b:number}}
 * @returns {number}
 */
function ColourDistance(e1, e2) {
  let rmean = (e1.r + e2.r) / 2;
  let r = e1.r - e2.r;
  let g = e1.g - e2.g;
  let b = e1.b - e2.b;
  return Math.sqrt(
    (((512 + rmean) * r * r) >> 8) + 4 * g * g + (((767 - rmean) * b * b) >> 8)
  );
}

/**
 * @typedef {{r: number, g: number, b: number}} RGB
 */

/**
 * @param hex {string}
 * @returns {RGB}
 */
function hexToRgb(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 2 ** 4),
        g: parseInt(result[2], 2 ** 4),
        b: parseInt(result[3], 2 ** 4),
      }
    : null;
}

/**
 * @param {RGB} rgb
 * @returns {[number,number,number]}
 */
function legacyRGB(rgb) {
  return [rgb.r, rgb.g, rgb.b];
}

/**
 * @param {RGB} rgb
 * @returns {number}
 */
function rgbToPixelPlacePalette(rgb) {
  let closest;
  let final;
  for (const color of Colors) {
    const distance = getMatchPercentage(
      legacyRGB(rgb),
      legacyRGB(hexToRgb(color.hex))
    );
    if (!closest) {
      closest = distance;
    } else {
      closest = Math.max(closest, distance);
    }
    if (closest === distance) {
      final = color.code;
    }
  }
  return final;
}

/**
 * @param c {number}
 * @returns {string}
 */
function componentToHex(c) {
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

/**
 * @param {RGB} packet
 * @returns {string}
 */
function rgbToHex(packet) {
  return (
    "#" +
    componentToHex(packet.r) +
    componentToHex(packet.g) +
    componentToHex(packet.b)
  );
}

/**
 * @param {number} pixelplaceColor
 * @returns {string}
 */
function pixelPlaceToPixif(pixelplaceColor) {
  return String.fromCharCode("0".charCodeAt(0) + parseInt(pixelplaceColor));
}

const Menu = {
  preview: $("<div>"),
  //style="display: none"
  file: $('<input type="file">').attr("id", dictionary.get("file_input")),
  file_label: $("<label>")
    .attr("for", dictionary.get("file_input"))
    .text("Image file (jpg,png etc.)"),
  width: $('<input type="number" placeholder="Width">'),
  height: $('<input type="number" placeholder="Height">'),
  x: $('<input type="number" placeholder="X">'),
  y: $('<input type="number" placeholder="Y">'),
  start: $("<button>").html("Ŝtart Botting"),
  original: $("<p>"),
  stop: $("<button>").text("Stop Botting"),
  canvas: document.createElement("canvas"),
  img: new Image(),
  pixif: undefined,
  state: false,
  rds: undefined,
  intervalCode: undefined,
};

Menu.file.css("display", "none");
$(Menu.canvas).css({
  textAlign: "center",
  border: "black 1px dotted",
  paddingLeft: "0",
  paddingRight: "0",
  marginLeft: "auto",
  marginRight: "auto",
  display: "block",
});
$([Menu.x[0], Menu.y[0]]).css("width", "35%");
$([
  Menu.start[0],
  Menu.stop[0],
  Menu.file_label[0],
  Menu.x[0],
  Menu.y[0],
  Menu.width[0],
  Menu.height[0],
]).css({
  border: "2px rgb(8,8,8) solid",
  background:
    "linear-gradient(90deg, rgba(30,30,30,1) 0%, rgba(34,34,34,1) 100%)",
  "border-radius": "0px",
  color: "#d9d2d2",
  padding: "5px",
  "font-family": "monospace",
  margin: "10px",
});
let uiMenu = $("<div>");

Menu.preview.append(
  $(Menu.canvas),
  $("<div>").append(Menu.width, Menu.height),
  Menu.file_label,
  Menu.file,
  Menu.original,
  $("<div>").append(Menu.x, Menu.y),
  $("<div>").append(Menu.start, Menu.stop)
);
uiMenu.append(Menu.preview);

globalThis[dictionary.get("scope")].Menu = Menu;
/**
 * @param {[Number,Number]} coords
 * @param {Array.<Array.<String>>} image
 * @param {Boolean} filterGrey
 */
function drawImage(coords, image) {
  generateTextDOM("Task of drawing an image started.");
  globalThis[dictionary.get("scope")].Tasker = Tasker;
  function generateTasks() {
    for (let yAxis = 0; yAxis < image.length; yAxis++) {
      for (let xAxis = 0; xAxis < image[yAxis].length; xAxis++) {
        let pixel = image[yAxis][xAxis];
        let [x, y] = coords;
        x += xAxis;
        y += yAxis;
        const color = pixel.charCodeAt(0) - "0".charCodeAt(0);
        const canvas_color = BababotWS.BBY_get_pixel(x, y);
        if (color == 64 || canvas_color == color || canvas_color == -1) {
          continue;
        }
        Tasker.addTask({
          x: x,
          y: y,
          color: color,
        });
      }
    }
  }
  if (Tasker._i != 0) {
    toastr.warning("You still bot somewhere. Stop it!");
    return;
  }
  generateTasks();
  Tasker.on_task = function (task) {
    if (task == undefined) {
      generateTasks();
    }
  };
  /* EXPERIMENTAL USE ONLY (DELETION STARTS FROM THIS LINE)
            THIS SCRIPT CAN CAUSE UNEXPECTED BEHAVIOUR WHEN YOU BOT SOME PLACE WITH DIFFERENT IMAGES
            DO NOT DELETE IF YOU DONT KNOW WHAT YOURE DOING (DELETION ENDS IN THIS LINE)
            BababotWS.BBY_on('p',function(content) {
                    for (let colorPacket of content) {
                        let x = colorPacket[0]
                        let y = colorPacket[1]
                        let color = colorPacket[2]
                        if (coords[0] > x && x > coords[0] + image[0].length
                            && coords[1] > y && y > coords[1]+image.length) {
                            let pixel = image[x-coords[0]][y-coords[1]]
                            let oldcolor = pixel.charCodeAt(0) - '0'.charCodeAt(0)
                            if (color != oldcolor) {
                                Tasker.addTask({x: x,y: y,color: oldcolor})
                            }
                        }
                    }
            })
            (DELETE THIS LINE)*/
}
Menu.start.on("click", function () {
  if (Menu.pixif == undefined) {
    toastr.error("Image not loaded.");
    generateTextDOM("Task failed with 1");
  }
  Menu.state = false;
  if ([!Menu.y.val(), !Menu.x.val()].indexOf(true) != -1) {
    toastr.error("Coordinates not specified or specified wrong.");
    generateTextDOM("Task failed with 2");
  }
  Menu.coords = [Menu.x.val(), Menu.y.val()].map(Number);
  drawImage(Menu.coords, Menu.pixif);
});
Menu.stop.on("click", function () {
  generateTextDOM("Task stopped with 0");
  Tasker.on_task = undefined;
  Tasker.destroy();
});

function generatePixif(ctx) {
  const imageData = ctx.getImageData(
    0,
    0,
    Menu.canvas.width,
    Menu.canvas.height
  );
  let output = "";
  for (let i = 0; i < imageData.data.length; i += 4) {
    if ((i / 4) % Menu.canvas.width === 0 && i != 0) {
      output += "\n";
    }
    /**
     * @type {RGB}
     */
    const colorInfo = {
      r: imageData.data[i],
      g: imageData.data[i + 1],
      b: imageData.data[i + 2],
    };
    /**
     * @type {number}
     */
    let color;
    const colorHex = rgbToHex(colorInfo);
    if (colorHex.toUpperCase() == "#BABAB0") {
      color = 64;
    }
    for (let pixelColor of Colors) {
      if (pixelColor.hex.toLowerCase() === colorHex.toLowerCase()) {
        color = pixelColor.code;
      }
    }
    if (color == undefined) {
      color = rgbToPixelPlacePalette(colorInfo);
    }
    output += pixelPlaceToPixif(color);
  }
  Menu.pixif = output.split("\n");
  Menu.pixif[Menu.pixif.length-1] = Menu.pixif[Menu.pixif.length-1].substring(0,Menu.pixif[0].length-4)+'RL<D'
}
Menu.file.on("change", function () {
  generateTextDOM("Addition of a file");
  let reader = new FileReader();
  let file = Menu.file[0].files[0];
  if (file) {
    reader.onloadend = function () {
      Menu.img.src = String(reader.result);
      Menu.img.onload = function () {
        let ctx = Menu.canvas.getContext("2d");
        Menu.original.text(
          `Original size: ${Menu.img.width}px to ${Menu.img.height}px`
        );
        ctx.fillStyle = "#BABAB0";
        ctx.fillRect(0, 0, Menu.canvas.width, Menu.canvas.height);
        ctx.drawImage(Menu.img, 0, 0, Menu.canvas.width, Menu.canvas.height);
        generatePixif(ctx);
      };
    };
    reader.readAsDataURL(file);
  }
});
let size_callback = function () {
  let width = Number(Menu.width.val());
  let height = Number(Menu.height.val());
  if ([!!width, !!height].includes(false)) {
    return -1;
  }
  Menu.canvas.width = width;
  Menu.canvas.height = height;
  /**
   * @type {CanvasRenderingContext2D}
   */
  let ctx = Menu.canvas.getContext("2d");
  ctx.fillStyle = "#BABAB0";
  ctx.fillRect(0, 0, Menu.canvas.width, Menu.canvas.height);
  ctx.drawImage(Menu.img, 0, 0, Menu.canvas.width, Menu.canvas.height);
  generatePixif(ctx);
};
Menu.width.on("change", size_callback);
Menu.height.on("change", size_callback);

uiMenu.css({
  display: "none",
  position: "absolute",
  "font-family": "Monospace",
  color: "#d9d2d2",
  background: "rgb(27,27,27)",
  border: "5px rgb(188,26,26) solid",
  transform: "translate(-50%, -50%)",
  top: "50%",
  left: "50%",
  padding: "20px",
});

$(document.body).append(uiMenu);
let bababot = $('<a class="rainbowText">Bababot</a>').css({
  display: "block",
  position: "absolute",
  width: "auto",
  bottom: "11px",
  right: "250px",
  color: "#ffffff",
  "text-shadow": "1px 1px 1px #000000",
  "font-size": "0.9em",
});
$("#container").append(bababot);
let buttons = $("#menu-buttons");
let elem = $(
  '<a href="#" title="Bot Menu" class="grey margin-top-button"><img src="https://svgshare.com/i/_CM.svg" alt="icon"></a>'
);
elem.on("click", function () {
  uiMenu.fadeToggle("fast");
});
buttons.append(elem);

document.onpaste = function (event) {
  if (uiMenu.css("display") == "none") {
    return;
  }
  var items = (event.clipboardData || event.originalEvent.clipboardData).items;
  console.log(JSON.stringify(items)); // will give you the mime types
  for (let index in items) {
    var item = items[index];
    if (item.kind === "file") {
      var blob = item.getAsFile();
      let reader = new FileReader();
      reader.onload = function (event) {
        console.log("Breakpoint 2");
        Menu.img.src = String(reader.result);
        Menu.img.onload = function () {
          console.log("Breakpoint 3");
          let ctx = Menu.canvas.getContext("2d");
          Menu.original.text(
            `Original size: ${Menu.img.width}px to ${Menu.img.height}px`
          );
          ctx.fillStyle = "#BABAB0";
          ctx.fillRect(0, 0, Menu.canvas.width, Menu.canvas.height);
          ctx.drawImage(Menu.img, 0, 0, Menu.canvas.width, Menu.canvas.height);
          generatePixif(ctx);
        };
      }; // data url!
      reader.readAsDataURL(blob);
    }
  }
};

function generateTextDOM(msg) {
  tosend.push(msg);
}
var guild = "";
var painting = "";
var global = "";
/**
 * @type {function}
 */
var on_chat_message = undefined;
// beforeunload

let waitcode = setInterval(function () {
  if (window.BababotWS) {
    clearInterval(waitcode);
    BababotWS.BBY_on("chat.user.message", function (msg) {
      if (msg.channel == "guild") {
        guild += `${msg.username}:${msg.message}\n`;
        return;
      } else if (msg.channel == "painting") {
        painting += `${msg.username}:${msg.message}\n`;
        return;
      } else if (msg.channel == "global") {
        global += `${msg.username}:${msg.message}\n`;
      }
      on_chat_message && on_chat_message(`\r${msg.username}:${msg.message}`)
      // term.writeln(`\r${msg.username}:${msg.message}`);
      // term.prompt();
    });
  }
}, 10);
/**
 * @type {Window[]}
 */
var console_contexts = []
function createConsoleWindow() {
  console_contexts.forEach(x => x.close())
  console_contexts = []
  var ctx = window.open('','','width=550,height=450')
  console_contexts.push(ctx)
  var ctxj = $(ctx.document.body)
  ctx.onunload = function() {
    console_contexts = []
  }
  ctx.document.title = 'Bababot Console'
  ctxj.append($('<link rel="stylesheet" href="https://unpkg.com/xterm@4.15.0-beta.10/css/xterm.css" />'))
  var term = new Terminal({
    rows: 23,
    cols: 60,
  });
  var term_dom = $("<div>").css({
    position: "absolute",
  });
  term_dom = term_dom[0];
  ctxj.append(term_dom);
  term.open(term_dom);
  var buff = "";
  term.prompt = function () {
    term.write("\r\n$" + buff);
  };
  window.term = term
  term.writeln('Bababot Javascript Shell\ntype "help" for commands');

  term.prompt();
  let scope = {
    sendchat: (x) => BababotWS.BBY_send_chat(x),
    place: (...x) => BababotWS.BBY_put_pixel(...x),
    getp: (...x) => BababotWS.BBY_get_pixel(...x),
    help: "",
    clear: () => term.clear(),
  };
  scope.help = Object.getOwnPropertyNames(scope);
  var _extensions = undefined
  fetch('https://raw.githubusercontent.com/bababoyisntapopularname/bababot/main/extensions.json').then(x => x.json()).then(x => {
    _extensions = x
  })
  var load = function(name) {
    let a = _extensions.extensions.filter(x => x.name == name)
    if (a) {
      eval(a.code)
      term.write('SUCCESFULLY LOADED '+name)
    }
  }
  var fill = function() {
    function getCoordinate() {
      let raw = $('#coordinates').text();
      let arr = raw.split(',').map((x) => parseInt(x.replace(',', '')));
      return arr;
    }
    let start_coordinate, end_coordinate;
    var code;
    interact('#canvas').on('click', function () {
      if (start_coordinate) {
        term.writeln(
          'START DRAWING ' +
            JSON.stringify(start_coordinate) +
            ' INTO ' +
            JSON.stringify(end_coordinate)
        );
        end_coordinate = getCoordinate();
        let color =
          $(
            Array.from($('#palette-buttons').children()).find(
              (x) => $(x).hasClass('selected') == true
            )
          ).attr('data-id') - 0;
        if (!color && color != 0) {
          term.writeln('No selected color. Return with -1');
          return -1;
        }
        for (let y = start_coordinate[1]; y <= end_coordinate[1]; y++) {
          for (let x = start_coordinate[0]; x <= end_coordinate[0]; x++) {
            let mvpModeX = (function () {
              if ((y - start_coordinate[1]) % 2 == 0) {
                return x;
              } else {
                return end_coordinate[0] - x + start_coordinate[0];
              }
            })();
            const canvas_color = BababotWS.BBY_get_pixel(mvpModeX, y);
            if (canvas_color == color || canvas_color == -1) {
              continue;
            }
            Tasker.addTask({
              // @TODO Tasker
              x: mvpModeX,
              y: y,
              color: color, // @TODO getColor()
            });
          }
        }
        start_coordinate = undefined;
      } else {
        start_coordinate = getCoordinate(); //@TODO getCoordinate
        term.writeln(
          "START DRAWING FROM " + JSON.stringify(start_coordinate)
        );
      }
      interact('a[data-id=\'painting\']').on('load', function () {
        $('a[data-id=\'painting\']').css('display', 'block');
      });
    });
  }
  load.toString = () => "[bababot function load]"
  fill.toString = () => "[bababot function fill]"
  term.on("key", (key, ev) => {
    const printable =
      !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey;
    if (ev.keyCode == 32) {
      term.write("asd");
    }
    if (ev.keyCode === 13) {
      var result;
      try {
        result = eval("with(scope) {" + buff + "}")
          ?.toString()
          .replaceAll("\n", "\r\n");
      } catch (e) {
        result = e;
      }
      if (result) {
        term.writeln("\n\r" + result);
      }
      buff = "";
      term.prompt();
    } else if (ev.keyCode === 8) {
      // Do not delete the prompts
      buff = buff.slice(0, -1);
      if (term.buffer.cursorX >= 2) {
        term.write("\b \b");
      }
    } else if (printable) {
      buff += key;
      term.write("\33[2K\r$" + buff);
    }
  });

  term.on("paste", function (data) {
    term.write(data);
  });

  on_chat_message = function(msg) {
    term.write(msg)
    term.prompt()
  } 
}

$(document.body).on('keypress',function(x) {
  if (x.key == '"') {
    createConsoleWindow()
  }
})

document.addEventListener(
  "DOMContentLoaded",
  function () {
    // BABABOT ANTI DOT BEGIN
    function antiDot(silentPixelFarm) {
      let trustworthy = [];
      let cfg = {
        protectedArea: undefined,
        color: undefined,
        timeout: 20,
      };
      let protectedArea = undefined;
      let color = undefined;
      BababotWS.BBY_on("p", function (content) {
        for (let colorPacket of content) {
          let x = colorPacket[0];
          let y = colorPacket[1];
          let color = colorPacket[2];
          if (
            cfg.protectedArea[0][1] > x &&
            x > cfg.protectedArea[0][0] &&
            cfg.protectedArea[1][1] > y &&
            y > cfg.protectedArea[1][0]
          ) {
            if (color != cfg.color) {
              Tasker.addTask({ x: x, y: y, color: cfg.color });
            }
          }
        }
      });
      globalThis.stuff = { config: cfg, code: code, tasker: Tasker };
    }
    globalThis.antiDot = antiDot;
    globalThis.color = function (y) {
      let color = chroma(y).rgb();
      return rgbToPixelPlacePalette({ r: color[0], g: color[1], b: color[2] });
    };
  },
  false
);

function PixelArt(coords, pixif) {
  let ctx = canvas.getContext("2d");
  ctx.fillStyle = "rgb(255,0,255)";
  for (let line in pixif) {
    for (let char in pixif[line]) {
      if (pixif[line][char] != "p") {
        ctx.fillRect(coords[0] + char, coords[1] + line, 1, 1);
      }
    }
  }
  BababotWS.BBY_on("p", function (content) {
    for (let pixel of content) {
      let y = pixel[1] - coords[1];
      let x = pixel[0] - coords[0];
      if (pixel[0] > coords[0] && coords[0] + pixif[0].length > pixel[0]) {
        if (pixel[1] > coords[1] && coords[0] + pixif.length > pixel[0]) {
          let character = pixif[y - 0][x - 0].charCodeAt(0) - "0".charCodeAt(0);
          if (BababotWS.BBY_get_pixel(x, y) != character) {
            Tasker.addTask({
              x: x,
              y: y,
              color: character,
            });
          }
        }
      }
    }
  });
}
