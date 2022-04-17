// ==UserScript==

// @name         Bababot.js
// @namespace    http://tampermonkey.net/
// @version      v3.0
// @description  Bababot
// @author       Bababoy
// @include      https://pixelplace.io/*
// @icon         https://i.imgur.com/PCn4MjQ.png
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
// @require      https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js
// @run-at       document-start
// @grant        none
// ==/UserScript==


/**
LICENSE OF HACKTIMER.JS MADE BY RUSLAN TUSHOW:

The MIT License (MIT)

Copyright (c) 2015 Ruslan Tushov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(s){var w,f={},o=window,l=console,m=Math,z='postMessage',x='HackTimer.js by turuslan: ',v='Initialisation failed',p=0,r='hasOwnProperty',y=[].slice,b=o.Worker;function d(){do{p=0x7FFFFFFF>p?p+1:0}while(f[r](p));return p}if(!/MSIE 10/i.test(navigator.userAgent)){try{s=o.URL.createObjectURL(new Blob(["var f={},p=postMessage,r='hasOwnProperty';onmessage=function(e){var d=e.data,i=d.i,t=d[r]('t')?d.t:0;switch(d.n){case'a':f[i]=setInterval(function(){p(i)},t);break;case'b':if(f[r](i)){clearInterval(f[i]);delete f[i]}break;case'c':f[i]=setTimeout(function(){p(i);if(f[r](i))delete f[i]},t);break;case'd':if(f[r](i)){clearTimeout(f[i]);delete f[i]}break}}"]))}catch(e){}}if(typeof(b)!=='undefined'){try{w=new b(s);o.setInterval=function(c,t){var i=d();f[i]={c:c,p:y.call(arguments,2)};w[z]({n:'a',i:i,t:t});return i};o.clearInterval=function(i){if(f[r](i))delete f[i],w[z]({n:'b',i:i})};o.setTimeout=function(c,t){var i=d();f[i]={c:c,p:y.call(arguments,2),t:!0};w[z]({n:'c',i:i,t:t});return i};o.clearTimeout=function(i){if(f[r](i))delete f[i],w[z]({n:'d',i:i})};w.onmessage=function(e){var i=e.data,c,n;if(f[r](i)){n=f[i];c=n.c;if(n[r]('t'))delete f[i]}if(typeof(c)=='string')try{c=new Function(c)}catch(k){l.log(x+'Error parsing callback code string: ',k)}if(typeof(c)=='function')c.apply(o,n.p)};w.onerror=function(e){l.log(e)};l.log(x+'Initialisation succeeded')}catch(e){l.log(x+v);l.error(e)}}else l.log(x+v+' - HTML5 Web Worker is not supported')})('HackTimerWorker.min.js');


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
globalThis.cfg = cfg

globalThis.extensions = []
//--BEGIN_TASKER.JS_BEGIN--

class TaskerFactory {
    static EMPTY_FUNCTION = () => true
    static PREVENT_DEFAULT = false
    constructor() {
        this._tasks = []
        this._i = 0x0
        this.onTaskAction = TaskerFactory.EMPTY_FUNCTION
        this.onShuffleGranted = TaskerFactory.EMPTY_FUNCTION
    }
    addTask(callback) {
        this._tasks.push(callback)
    }
    getTask() {
        let task = this._tasks[this._i]
        if (task != undefined)
            this._i++
        return task
    }
    reset() {
        this._i = 0
    }
    destroy() {
        this._tasks = []
        this.reset()
    }
}
let Tasker = new TaskerFactory();
globalThis.Tasker = Tasker;
/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
var shouldShuffle = false;
var intervalCode;

function restartTasker() {
    clearInterval(intervalCode)
    intervalCode = setInterval(function () {
        let task = Tasker.getTask();
        if (task == undefined) {
            return;
        }
        while (Tasker.onTaskAction(task) == TaskerFactory.PREVENT_DEFAULT || BababotWS.BBY_get_pixel(task.x, task.y) == task.color) {
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
    }, cfg.timeout)
}
globalThis.restartTakser = restartTasker

function killTasker() {
    clearInterval(intervalCode)
    intervalCode = undefined
}
globalThis.killTasker = killTasker
restartTasker()
/*
Take the possibility as:
a
- == a/b
b
*/
function TaskerFilterPixelsByCoordinate(a,b) {
    Tasker.onTaskAction = function(task) {
        return (task.x + task.y) % b < a
    }
}
var brush = 1
function increaseBrush() {
    brush++
    if (brush > 10) {
        brush = 0
    }
}
var paintmode = 0
function changePaintMode() {
    if (paintmode == 0) {
        toastr.info('UI places as UI')
        restartTasker()
        BababotWS.BBY_on_message_send = function() { return true }
    } else if (paintmode == 1) {
        toastr.info('UI places as Tasker')
        UiPlacesAsTasker()
    } else if (paintmode == 2) {
        toastr.info('UI places Tasker\'s tasks')
        UiPlacesTaskerTasks()
    }
    paintmode++
    if (paintmode > 2) {
        paintmode = 0
    }
}
function UiPlacesAsTasker() {
    restartTasker()
    BababotWS.BBY_on_message_send = function(msg) {
        if (msg == BababotWS.trusted_code) return true
        if (msg.indexOf('42') == -1) return true
        let [key,val] = JSON.parse(msg.replace('42',''))
        if (key == 'p') {
            for (let i = 0;i < brush;i++) {
                for (let j = 0;j < brush;j++) {
                    Tasker.addTask({x: val[0]+i,y: val[1]+j,color: val[2]})
                }
            }
            return false
        }
        return true
    }
}
globalThis.UiPlacesAsTasker = UiPlacesAsTasker

function UiPlacesTaskerTasks() {
    killTasker()
    BababotWS.BBY_on_message_send = function(msg) {
        if (msg == BababotWS.trusted_code) return true
        if (msg.indexOf('42') == -1) return true
        let [key,val] = JSON.parse(msg.replace('42',''))
        if (key == 'p') {
            for (let i = 0;i < brush;i++) {
                for (let j = 0;j < brush;j++) {
                    let task = Tasker._tasks.find(a => a.x == val[0] + i && a.y == val[1] + j)
                    if (task) {
                        BababotWS.BBY_put_pixel(task.x,task.y,task.color)
                        let index = Tasker._tasks.indexOf(task)
                        Tasker._tasks.splice(index,1)
                    }
                    return false
                }
            }
        }
        return true
    }
}
globalThis.UiPlacesTaskerTasks = UiPlacesTaskerTasks
globalThis.TaskerFilterPixelsByCoordinate = TaskerFilterPixelsByCoordinate
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
console.log("%cBababot.js loaded. Made by Bababoy", "font-family: system-ui");
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
    }
    Menu.state = false;
    if ([!Menu.y.val(), !Menu.x.val()].indexOf(true) != -1) {
        toastr.error("Coordinates not specified or specified wrong.");
    }
    Menu.coords = [Menu.x.val(), Menu.y.val()].map(Number);
    drawImage(Menu.coords, Menu.pixif);
    if (shouldShuffle) {
        Tasker._tasks = shuffle(Tasker._tasks)
    }
    if (intervalCode == undefined) {
        var context = canvas.getContext('2d')
        var children = $('#palette-buttons').children()
        for (let task of Tasker._tasks) {
            var color = chroma(children[task.color].title+'7F').css()
            context.fillStyle = color;
            context.fillRect( task.x, task.y, 1, 1 );
        }
    }
});
Menu.stop.on("click", function () {
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

function createGraphWindow() {
    var ctx = window.open('','','width=550,height=450')
    var interval = undefined
    ctx.onunload = function() {
        clearInterval(interval)
    }
    var canvas = $('<canvas>')
    var data = {
        labels: [],
        datasets: [{
            label: "Pixels per second botted by Bababot",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 2,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [],
        }]
    };

    var options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                stacked: true,
                grid: {
                    display: true,
                    color: "rgba(255,99,132,0.2)"
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    };
    var ctxj = $(ctx.document.body)
    ctxj.append(canvas)
    var chart = new Chart(canvas[0].getContext('2d'), {
        type: 'line',
        options: options,
        data: data
    });
    var pps = Number(Tasker._i)
    let i = 0
    interval = setInterval(function() {
        var pps_ = Number(Tasker._i)
        var math_pps = Number(pps_ - pps)
        pps = pps_
        if (math_pps < 0) {
            math_pps = 0
        }
        chart.data.labels[i] = i;
        chart.data.datasets[0].data[i++] = math_pps;
        chart.update();
    },1000)
}

globalThis.graph = createGraphWindow
/**
 * @type {Window[]}
 */
var console_contexts = []
function getSelectedColor() {
    return $(
        Array.from($('#palette-buttons').children()).find(
            (x) => $(x).hasClass('selected') == true
        )
    ).attr('data-id') - 0
}
globalThis.getSelectedColor = getSelectedColor
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
            end_coordinate = getCoordinate();
            let color = getSelectedColor();
            if (!color && color != 0) {
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
        }
        interact('a[data-id=\'painting\']').on('load', function () {
            $('a[data-id=\'painting\']').css('display', 'block');
        });
    });
}
globalThis.fill = fill
function createConsoleWindow() {
    console_contexts.forEach(x => x.close())
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

var dither = (function() {
    var i = 10
    return function decrease() {
        i -= 1
        if (i <= 0) {
            i = 10
        }
        TaskerFilterPixelsByCoordinate(i,10)
        return i * 10
    }
})()

var loadExtension = (function() {
    var i = 0
    function load() {
        if (i >= extensions.length) {
            i = 0
        }
        extensions[i][0]()
        toastr.info('Ran extension: ' + extensions[i][1])
        i++
    }
    return load
})()
$(document.body).on('keypress',function(x) {
    if (x.key == '"') {
        createConsoleWindow()
    } else if (x.key == '_') {
        window.graph()
    } else if (x.key == '=') {
        toastr.info('fill opened')
        fill()
    } else if (x.key == '%') {
        toastr.info(`Dither set to: ${dither()}%`)
    } else if (x.key == '+') {
        shouldShuffle = !shouldShuffle
        toastr.info(`Should shuffle: ${shouldShuffle}`)
    } else if (x.key == '-') {
        increaseBrush()
        toastr.info(`Brush size: ${brush}`)
    } else if (x.key == ';') {
        changePaintMode()
    } else if (x.key == '/') {
        loadExtension()
    }
})

function loadAntiDotPlugin() {
    // BABABOT ANTI DOT BEGIN
    function antiDot(globalName) {
        let trustworthy = [];
        let cfg = {
            protectedArea: undefined,
            color: undefined,
            timeout: 20,
            targetColor: undefined
        };
        let protectedArea = undefined;
        let color = undefined;
        var destroyed = false
        BababotWS.BBY_on("p", function (content) {
            if (destroyed) {
                return
            }
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
                    if (cfg.targetColor != undefined && cfg.targetColor != color) {
                        continue
                    }
                    if (color != cfg.color) {
                        Tasker.addTask({ x: x, y: y, color: cfg.color });
                    }
                }
            }
        });
        function destroy() {
            destroyed = true
        }
        function activate() {
            destroyed = false
        }
        globalThis[globalName || 'stuff'] = { config: cfg, code: 0, tasker: Tasker, destroy: destroy, activate: activate};
    }
    globalThis.antiDot = antiDot;
    globalThis.color = function (y) {
        let color = chroma(y).rgb();
        return rgbToPixelPlacePalette({ r: color[0], g: color[1], b: color[2] });
    };
}

if(document.readyState !== 'complete') {
    if (loader.style.display == 'none' && window.BababotWS == undefined) {
        toastr.warning('BababotWS could not found. Probably because low resource. Restarting')
        location.reload()
    }
    window.addEventListener('load',loadAntiDotPlugin);
} else {
    toastr.info('Low resource detected.')
    loadAntiDotPlugin();
    if (loader.style.display == 'none' && window.BababotWS == undefined) {
        toastr.warning('BababotWS could not found. Probably because low resource. Restarting')
        location.reload()
    }
}


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


