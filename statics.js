var storeVars = function (target) {
  return new Proxy(target, {
    has(target, prop) {
      return true;
    },
    get(target, prop) {
      return (prop in target ? target : window)[prop];
    },
  });
};
BBY = {};
with (storeVars(BBY)) {
  /**
   * @description Statics of Bababot
   */
  var BABABOT_CONSOLE_CSS = `background: #03CEA4;
color: #FFFFFF;
font-family: Sans-serif;
font-size: 2rem;
display: inline-block;
border: 5px #A3A5C3 solid;
padding: 5px;
margin: 5px;`,
    BABABOT_CANVAS_CSS = {
      textAlign: "center",
      border: "black 1px dotted",
      paddingLeft: "0",
      paddingRight: "0",
      marginLeft: "auto",
      marginRight: "auto",
      display: "block",
    },
    BABABOT_MENU_ELEMENT_CSS = {
      border: "2px rgb(8,8,8) solid",
      background:
        "linear-gradient(90deg, rgba(30,30,30,1) 0%, rgba(34,34,34,1) 100%)",
      "border-radius": "0px",
      color: "#d9d2d2",
      padding: "5px",
      "font-family": "monospace",
      margin: "10px",
    },
    BABABOT_UI_MENU_CSS = {
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
    },
    BABABOT_TEXT_CSS = {
      display: "block",
      position: "absolute",
      width: "auto",
      bottom: "11px",
      right: "250px",
      color: "#ffffff",
      "text-shadow": "1px 1px 1px #000000",
      "font-size": "0.9em",
    };
  /**
   * @type {ColorPacket[]}
   */
  var Colors = [
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
  var hslToRgb = function (h, s, l) {
    h = h / 360;
    s = s / 100;
    l = l / 100;
    var r, g, b;
    if (s == 0) {
      r = g = b = l;
    } else {
      var hue2rgb = function (p, q, t) {
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
  };

  /**
   * Format our match into our final display
   */

  var getMatchPercentage = function (rgbA, rgbB) {
    let match = 100 - deltaE(rgbA, rgbB);
    if (match < 0) match = 0;
    return Math.round(match * 10) / 10;
  };

  /**
   * Get Euclidean distance between two colors
   */
  var deltaE = function (rgbA, rgbB) {
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
      deltaLKlsl * deltaLKlsl +
      deltaCkcsc * deltaCkcsc +
      deltaHkhsh * deltaHkhsh;
    return i < 0 ? 0 : Math.sqrt(i);
  };

  /**
   * To compute the color contrast we need to convert to LAB colors
   */

  var rgb2lab = function (rgb) {
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
  };

  /**
   * @param e1 {{r:number,g:number,b:number}}
   * @param e2 {{r:number,g:number,b:number}}
   * @returns {number}
   */
  var ColourDistance = function (e1, e2) {
    let rmean = (e1.r + e2.r) / 2;
    let r = e1.r - e2.r;
    let g = e1.g - e2.g;
    let b = e1.b - e2.b;
    return Math.sqrt(
      (((512 + rmean) * r * r) >> 8) +
        4 * g * g +
        (((767 - rmean) * b * b) >> 8)
    );
  };

  /**
   * @typedef {{r: number, g: number, b: number}} RGB
   */

  /**
   * @param hex {string}
   * @returns {RGB}
   */
  var hexToRgb = function (hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 2 ** 4),
          g: parseInt(result[2], 2 ** 4),
          b: parseInt(result[3], 2 ** 4),
        }
      : null;
  };

  /**
   * @param {RGB} rgb
   * @returns {[number,number,number]}
   */
  var legacyRGB = function (rgb) {
    return [rgb.r, rgb.g, rgb.b];
  };

  /**
   * @param {RGB} rgb
   * @returns {number}
   */
  var rgbToPixelPlacePalette = function (rgb) {
    let closest;
    let final;
    for (var color of Colors) {
      var distance = getMatchPercentage(
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
  };

  /**
   * @param c {number}
   * @returns {string}
   */
  var componentToHex = function (c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  };

  /**
   * @param {RGB} packet
   * @returns {string}
   */
  var rgbToHex = function (packet) {
    return (
      "#" +
      componentToHex(packet.r) +
      componentToHex(packet.g) +
      componentToHex(packet.b)
    );
  };

  /**
   * @param {number} pixelplaceColor
   * @returns {string}
   */
  var pixelPlaceToPixif = function (pixelplaceColor) {
    return String.fromCharCode("0".charCodeAt(0) + parseInt(pixelplaceColor));
  };
}
