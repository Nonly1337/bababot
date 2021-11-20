// ==UserScript==

// @name         Bababot v4
// @namespace    http://tampermonkey.net/
// @version      v3.0
// @description  Bababot 100%
// @author       Bababoy
// @include      https://pixelplace.io/*
// @icon         https://i1.sndcdn.com/artworks-000173440759-sz0xbo-t500x500.jpg
// @require      https://pixelplace.io/js/jquery.min.js?v2=1
// @require      https://pixelplace.io/js/jquery-ui.min.js?v2=1
// @require      https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.4/toastr.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/chroma-js/2.1.0/chroma.min.js
// @require      https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js
// @require      https://code.jquery.com/ui/1.12.1/jquery-ui.min.js
// @require      https://raw.githubusercontent.com/bababoyisntapopularname/bababot/main/util.js
// @require      https://raw.githubusercontent.com/bababoyisntapopularname/bababot/main/bababot_ws.js
// @require      https://raw.githubusercontent.com/bababoyisntapopularname/bababot/main/statics.js
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
// -
with (BBY) {
  var tosend = [];

  // config
  var cfg = {
    timeout: localStorage.timeout - 0 || 100,
  };

  //--BEGIN_TASKER.JS_BEGIN--
  var Tasker = {
    _tasks: [],
    _i: Number(0),
    addTask: function (callback) {
      this._tasks.push(callback);
    },
    getTask: function () {
      var task = this._tasks[this._i];
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
  };
  setInterval(function () {
    var task = Tasker.getTask();
    if (task == undefined) {
      return;
    }
    while (BababotWS.BBY_get_pixel(task.x, task.y) == task.color) {
      task = Tasker.getTask();
      if (task == undefined) {
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
    console.log("%c%s", BABABOT_CONSOLE_CSS, thing);
  }

  function stressTest() {
    var x = performance.now();
    for (var m = 0; m < 1e6; m++) {
      (function () {
        return Math.floor(Math.PI * 5);
      })();
    }
    var y = performance.now();
    return y - x;
  }
  log("Welcome to bababot!");
  generateTextDOM("Bababot configuration passed.");
  generateTextDOM(
    Math.floor(stressTest()) +
      " ms process time on performance test ( [f(x)=floor(𝜋*5)]*1e+6)"
  );

  var Menu = {
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
  $(Menu.canvas).css(BABABOT_CANVAS_CSS);
  $([Menu.x[0], Menu.y[0]]).css("width", "35%");
  $([
    Menu.start[0],
    Menu.stop[0],
    Menu.file_label[0],
    Menu.x[0],
    Menu.y[0],
    Menu.width[0],
    Menu.height[0],
  ]).css(BABABOT_MENU_ELEMENT_CSS);
  var uiMenu = $("<div>");

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
    var Tasker = TaskerFactory();
    globalThis[dictionary.get("scope")].Tasker = Tasker;
    function generateTasks() {
      for (var yAxis = 0; yAxis < image.length; yAxis++) {
        for (var xAxis = 0; xAxis < image[yAxis].length; xAxis++) {
          var pixel = image[yAxis][xAxis];
          var [x, y] = coords;
          x += xAxis;
          y += yAxis;
          var color = pixel.charCodeAt(0) - "0".charCodeAt(0);
          var canvas_color = BababotWS.BBY_get_pixel(x, y);
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
    if (Menu.intervalCode) {
      toastr.warning("You still bot somewhere. Stop it!");
      return;
    }
    generateTasks();
    Menu.intervalCode = setInterval(function () {
      var task = Tasker.getTask();
      if (task?.type == "sleep") {
        return;
      }
      if (Menu.state == true) {
        clearInterval(Menu.intervalCode);
        Menu.intervalCode = undefined;
        return;
      } else if (task == undefined) {
        Tasker.destroy();
        for (var i = 0; i < 500 / cfg.timeout; i++) {
          Tasker.addTask({ type: "sleep" });
        }
        generateTasks();
        return;
      }
      BababotWS.BBY_put_pixel(task.x, task.y, task.color);
    }, cfg.timeout);
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
    Menu.state = true;
    clearInterval(Menu.intervalCode);
    Menu.intervalCode = undefined;
  });

  function generatePixif(ctx) {
    var imageData = ctx.getImageData(
      0,
      0,
      Menu.canvas.width,
      Menu.canvas.height
    );
    var output = "";
    for (var i = 0; i < imageData.data.length; i += 4) {
      if ((i / 4) % Menu.canvas.width === 0 && i != 0) {
        output += "\n";
      }
      /**
       * @type {RGB}
       */
      var colorInfo = {
        r: imageData.data[i],
        g: imageData.data[i + 1],
        b: imageData.data[i + 2],
      };
      /**
       * @type {number}
       */
      var color;
      var colorHex = rgbToHex(colorInfo);
      if (colorHex.toUpperCase() == "#BABAB0") {
        color = 64;
      }
      for (var pixelColor of Colors) {
        if (pixelColor.hex.toLowerCase() === colorHex.toLowerCase()) {
          color = pixelColor.code;
        }
      }
      if (color == undefined) {
        color = rgbToPixelPlacePavarte(colorInfo);
      }
      output += pixelPlaceToPixif(color);
    }
    Menu.pixif = output.split("\n");
  }
  Menu.file.on("change", function () {
    generateTextDOM("Addition of a file");
    var reader = new FileReader();
    var file = Menu.file[0].files[0];
    if (file) {
      reader.onloadend = function () {
        Menu.img.src = String(reader.result);
        Menu.img.onload = function () {
          var ctx = Menu.canvas.getContext("2d");
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
  var size_callback = function () {
    var width = Number(Menu.width.val());
    var height = Number(Menu.height.val());
    if ([!!width, !!height].includes(false)) {
      return -1;
    }
    Menu.canvas.width = width;
    Menu.canvas.height = height;
    /**
     * @type {CanvasRenderingContext2D}
     */
    var ctx = Menu.canvas.getContext("2d");
    ctx.fillStyle = "#BABAB0";
    ctx.fillRect(0, 0, Menu.canvas.width, Menu.canvas.height);
    ctx.drawImage(Menu.img, 0, 0, Menu.canvas.width, Menu.canvas.height);
    generatePixif(ctx);
  };
  Menu.width.on("change", size_callback);
  Menu.height.on("change", size_callback);

  uiMenu.css(BABABOT_UI_MENU_CSS);

  $(document.body).append(uiMenu);
  var bababot = $('<a class="rainbowText">Bababot</a>').css(BABABOT_TEXT_CSS);
  $("#container").append(bababot);
  var buttons = $("#menu-buttons");
  var elem = $(
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
    var items = (event.clipboardData || event.originalEvent.clipboardData)
      .items;
    console.log(JSON.stringify(items)); // will give you the mime types
    for (var index in items) {
      var item = items[index];
      if (item.kind === "file") {
        var blob = item.getAsFile();
        var reader = new FileReader();
        reader.onload = function (event) {
          console.log("Breakpoint 2");
          Menu.img.src = String(reader.result);
          Menu.img.onload = function () {
            console.log("Breakpoint 3");
            var ctx = Menu.canvas.getContext("2d");
            Menu.original.text(
              `Original size: ${Menu.img.width}px to ${Menu.img.height}px`
            );
            ctx.fillStyle = "#BABAB0";
            ctx.fillRect(0, 0, Menu.canvas.width, Menu.canvas.height);
            ctx.drawImage(
              Menu.img,
              0,
              0,
              Menu.canvas.width,
              Menu.canvas.height
            );
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

  document.addEventListener(
    "DOMContentLoaded",
    function () {
      var buttonTabs = $("#chat > div.tabs.no-select");
      var chatParent = $("#chat");
      var bababotButton = $(
        '<a href="#"><span class="title">Bababot</span></a>'
      );
      var logParent = $('<div class="messages" style="display: none;">');

      setTimeout(function () {
        generateTextDOM = function (msg) {
          var row = $("<div>").addClass("row");
          var text = $("<span>").addClass("text");
          text.text(msg);
          text.css("color", "#FFEEFF");
          row.append(text);
          logParent.append(row);
          logParent.animate({ scrollTop: logParent.prop("scrollHeight") });
        };
        tosend.forEach(generateTextDOM);
        buttonTabs.append(bababotButton);
        chatParent.append(logParent);
      }, 5120);
      bababotButton.on("click", function () {
        $(".selected").removeClass("selected");
        $(bababotButton).addClass("selected");
        $(".messages").hide();
        console.log(logParent);
        logParent.show();
      });
      var Tasker = TaskerFactory();
      function getCoordinate() {
        var raw = $("#coordinates").text();
        var arr = raw.split(",").map((x) => parseInt(x.replace(",", "")));
        return arr;
      }
      var start_coordinate, end_coordinate;
      var code;
      interact("#canvas").on("click", function () {
        if (start_coordinate) {
          generateTextDOM(
            "START DRAWING " +
              JSON.stringify(start_coordinate) +
              " INTO " +
              JSON.stringify(end_coordinate)
          );
          end_coordinate = getCoordinate();
          var color =
            $(
              Array.from($("#pavarte-buttons").children()).find(
                (x) => $(x).hasClass("selected") == true
              )
            ).attr("data-id") - 0;
          if (!color && color != 0) {
            generateTextDOM("No selected color. Return with -1");
            return -1;
          }
          for (var y = start_coordinate[1]; y <= end_coordinate[1]; y++) {
            for (var x = start_coordinate[0]; x <= end_coordinate[0]; x++) {
              var mvpModeX = (function () {
                if ((y - start_coordinate[1]) % 2 == 0) {
                  return x;
                } else {
                  return end_coordinate[0] - x + start_coordinate[0];
                }
              })();
              var canvas_color = BababotWS.BBY_get_pixel(mvpModeX, y);
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
          code =
            code ||
            setInterval(function () {
              var task = Tasker.getTask();
              if (task == undefined) {
                Tasker.destroy();
                clearInterval(code);
                code = undefined;
                return;
              }
              while (BababotWS.BBY_get_pixel(task.x, task.y) == task.color) {
                task = Tasker.getTask();
                if (task == undefined) {
                  Tasker.destroy();
                  clearInterval(code);
                  code = undefined;
                  return;
                }
              }
              BababotWS.BBY_put_pixel(task.x, task.y, task.color);
            }, cfg.timeout);
          start_coordinate = undefined;
        } else {
          start_coordinate = getCoordinate(); //@TODO getCoordinate
          generateTextDOM(
            "START DRAWING FROM " + JSON.stringify(start_coordinate)
          );
        }
        interact('a[data-id="painting"]').on("load", function () {
          $('a[data-id="painting"]').css("display", "block");
        });
      });
      // BABABOT ANTI DOT BEGIN
      function antiDot(silentPixelFarm) {
        var trustworthy = [];
        var cfg = {
          protectedArea: undefined,
          color: undefined,
          timeout: 20,
        };
        var protectedArea = undefined;
        var color = undefined;
        var Tasker = TaskerFactory();
        var code =
          code ||
          setInterval(function () {
            var task = Tasker.getTask();
            if (task == undefined) {
              return;
            }
            while (BababotWS.BBY_get_pixel(task.x, task.y) == task.color) {
              task = Tasker.getTask();
              if (task == undefined) {
                return;
              }
            }
            BababotWS.BBY_put_pixel(task.x, task.y, task.color);
          }, cfg.timeout);
        BababotWS.addEventListener("message", function (msg) {
          var json = JSON.parse(msg.data.replace("42", ""));
          var code = json[0];
          var content = json[1];
          if (cfg.protectedArea == undefined || cfg.color == undefined) {
            return;
          }
          if (code == "p") {
            for (var colorPacket of content) {
              var x = colorPacket[0];
              var y = colorPacket[1];
              var color = colorPacket[2];
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
          }
        });
        globalThis.stuff = { config: cfg, code: code, tasker: Tasker };
      }
      globalThis.antiDot = antiDot;
      globalThis.color = function (y) {
        var color = chroma(y).rgb();
        return rgbToPixelPlacePavarte({
          r: color[0],
          g: color[1],
          b: color[2],
        });
      };
    },
    false
  );
}
globalThis.BBY = BBY
