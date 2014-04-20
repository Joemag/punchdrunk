// Generated by CoffeeScript 1.7.1
(function() {
  var Canvas, Color, EventQueue, FileSystem, Font, Graphics, Image, ImageData, Keyboard, Quad, Timer, Window,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __slice = [].slice;

  Color = (function() {
    function Color(r, g, b, a) {
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a != null ? a : 255;
      this.html_code = "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
    }

    return Color;

  })();

  Canvas = (function() {
    function Canvas(width, height) {
      this.element = document.createElement('canvas');
      this.setDimensions(this.width, this.height);
      this.context = this.element.getContext('2d');
    }

    Canvas.prototype.clear = function(self, r, g, b, a) {
      var color;
      if (r === null || r === void 0) {
        color = Canvas.transparent;
      } else {
        color = new Color(r, g, b, a);
      }
      self.context.save();
      self.context.setTransform(1, 0, 0, 1, 0, 0);
      self.context.fillStyle = color.html_code;
      self.context.globalAlpha = color.a / 255;
      self.context.fillRect(0, 0, self.canvas.width, self.canvas.height);
      return self.context.restore();
    };

    Canvas.prototype.getDimensions = function(self) {
      return [self.width, self.height];
    };

    Canvas.prototype.getHeight = function(self) {
      return self.height;
    };

    Canvas.prototype.getImageData = function(self) {
      var image_data;
      image_data = self.context.getImageData(0, 0, self.width, self.height);
      return new ImageData(image_data);
    };

    Canvas.prototype.getPixel = function(self, x, y) {
      var data;
      data = self.context.getImageData(x, y, 1, 1).data;
      return [data[0], data[1], data[2], data[3]];
    };

    Canvas.prototype.getWidth = function(self) {
      return self.width;
    };

    Canvas.prototype.getWrap = function(self) {};

    Canvas.prototype.setWrap = function(self) {};

    Canvas.prototype.copyContext = function(context) {
      this.context.fillStyle = context.fillStyle;
      this.context.font = context.font;
      this.context.globalAlpha = context.globalAlpha;
      this.context.globalCompositeOperation = context.globalCompositeOperation;
      this.context.lineCap = context.lineCap;
      this.context.lineDashOffset = context.lineDashOffset;
      this.context.lineJoin = context.lineJoin;
      this.context.lineWidth = context.lineWidth;
      this.context.miterLimit = context.miterLimit;
      this.context.shadowBlur = context.shadowBlur;
      this.context.shadowColor = context.shadowColor;
      this.context.shadowOffsetX = context.shadowOffsetX;
      this.context.shadowOffsetY = context.shadowOffsetY;
      this.context.strokeStyle = context.strokeStyle;
      this.context.textAlign = context.textAlign;
      return this.context.textBaseline = context.textBaseline;
    };

    Canvas.prototype.setDimensions = function(width, height) {
      this.width = width;
      this.height = height;
      this.element.setAttribute('width', this.width);
      return this.element.setAttribute('height', this.height);
    };

    return Canvas;

  })();

  Canvas.transparent = new Color(0, 0, 0, 0);

  Image = (function() {
    function Image(path) {
      this.element = document.createElement("img");
      this.element.setAttribute("src", "lua/" + path);
    }

    Image.prototype.getData = function(self) {};

    Image.prototype.getDimensions = function(self) {
      return [self.element.width, self.element.height];
    };

    Image.prototype.getFilter = function(self) {};

    Image.prototype.getHeight = function(self) {
      return self.element.height;
    };

    Image.prototype.getMipmapFilter = function(self) {};

    Image.prototype.getWidth = function(self) {
      return self.element.width;
    };

    Image.prototype.getWrap = function(self) {};

    Image.prototype.isCompressed = function(self) {};

    Image.prototype.refresh = function(self) {};

    Image.prototype.setFilter = function(self) {};

    Image.prototype.setMipmapFilter = function(self) {};

    Image.prototype.setWrap = function(self) {};

    return Image;

  })();

  ImageData = (function() {
    function ImageData() {}

    return ImageData;

  })();

  Quad = (function() {
    function Quad(x, y, width, height, sw, sh) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.sw = sw;
      this.sh = sh;
    }

    Quad.prototype.getViewport = function(self) {
      return [self.x, self.y, self.width, self.height];
    };

    Quad.prototype.setViewport = function(self, x, y, width, height) {
      self.x = x;
      self.y = y;
      self.width = width;
      return self.height = height;
    };

    return Quad;

  })();

  Graphics = (function() {
    var drawDrawable, drawWithQuad;

    function Graphics(width, height) {
      this.width = width != null ? width : 800;
      this.height = height != null ? height : 600;
      this.getWidth = __bind(this.getWidth, this);
      this.getWidth = __bind(this.getWidth, this);
      this.translate = __bind(this.translate, this);
      this.shear = __bind(this.shear, this);
      this.scale = __bind(this.scale, this);
      this.rotate = __bind(this.rotate, this);
      this.push = __bind(this.push, this);
      this.pop = __bind(this.pop, this);
      this.origin = __bind(this.origin, this);
      this.setFont = __bind(this.setFont, this);
      this.setCanvas = __bind(this.setCanvas, this);
      this.setBackgroundColor = __bind(this.setBackgroundColor, this);
      this.setColor = __bind(this.setColor, this);
      this.newQuad = __bind(this.newQuad, this);
      this.newImage = __bind(this.newImage, this);
      this.newFont = __bind(this.newFont, this);
      this.newCanvas = __bind(this.newCanvas, this);
      this.rectangle = __bind(this.rectangle, this);
      this.printf = __bind(this.printf, this);
      this.print = __bind(this.print, this);
      this.polygon = __bind(this.polygon, this);
      this.point = __bind(this.point, this);
      this.line = __bind(this.line, this);
      this.draw = __bind(this.draw, this);
      this.clear = __bind(this.clear, this);
      this.circle = __bind(this.circle, this);
      this.arc = __bind(this.arc, this);
      this.canvas = new Canvas(this.width, this.height);
      document.body.appendChild(this.canvas.element);
      this.context = this.canvas.context;
      this.default_canvas = this.canvas;
      this.default_context = this.context;
      this.default_font = new Font("Vera", 12);
      this.setColor(255, 255, 255);
      this.setBackgroundColor(0, 0, 0);
      this.setFont(this.default_font);
      this.context.textBaseline = "top";
    }

    Graphics.prototype.arc = function(mode, x, y, radius, startAngle, endAngle, segments) {
      this.context.beginPath();
      this.context.moveTo(x, y);
      this.context.arc(x, y, radius, startAngle, endAngle);
      this.context.closePath();
      switch (mode) {
        case "fill":
          return this.context.fill();
        case "line":
          return this.context.stroke();
      }
    };

    Graphics.prototype.circle = function(mode, x, y, radius, segments) {
      this.context.beginPath();
      this.context.arc(x, y, radius, 0, 2 * Math.PI);
      this.context.closePath();
      switch (mode) {
        case "fill":
          return this.context.fill();
        case "line":
          return this.context.stroke();
      }
    };

    Graphics.prototype.clear = function() {
      this.context.save();
      this.context.setTransform(1, 0, 0, 1, 0, 0);
      this.context.fillStyle = this.background_color.html_code;
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      return this.context.restore();
    };

    Graphics.prototype.draw = function(drawable, quad) {
      switch (true) {
        case !(quad instanceof Quad):
          return drawDrawable.apply(this, arguments);
        case quad instanceof Quad:
          return drawWithQuad.apply(this, arguments);
      }
    };

    Graphics.prototype.line = function() {
      var i, points, x, y, _i, _ref, _ref1;
      points = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      this.context.beginPath();
      this.context.moveTo(points[0], points[1]);
      for (i = _i = 2, _ref = points.length; _i < _ref; i = _i += 2) {
        _ref1 = [points[i], points[i + 1]], x = _ref1[0], y = _ref1[1];
        this.context.lineTo(x, y);
      }
      return this.context.stroke();
    };

    Graphics.prototype.point = function(x, y) {
      return this.context.fillRect(x, y, 1, 1);
    };

    Graphics.prototype.polygon = function() {
      var i, mode, points, x, y, _i, _ref, _ref1;
      mode = arguments[0], points = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      this.context.beginPath();
      this.context.moveTo(points[0], points[1]);
      for (i = _i = 2, _ref = points.length; _i < _ref; i = _i += 2) {
        _ref1 = [points[i], points[i + 1]], x = _ref1[0], y = _ref1[1];
        this.context.lineTo(x, y);
      }
      this.context.closePath();
      switch (mode) {
        case "fill":
          return this.context.fill();
        case "line":
          return this.context.stroke();
      }
    };

    Graphics.prototype.print = function(str, x, y) {
      return this.context.fillText(str, x, y);
    };

    Graphics.prototype.printf = function() {};

    Graphics.prototype.rectangle = function(mode, x, y, width, height) {
      switch (mode) {
        case "fill":
          return this.context.fillRect(x, y, width, height);
        case "line":
          return this.context.strokeRect(x, y, width, height);
      }
    };

    Graphics.prototype.newCanvas = function(width, height) {
      return new Canvas(width, height);
    };

    Graphics.prototype.newFont = function(filename, size) {
      if (size == null) {
        size = 12;
      }
      return new Font(filename, size);
    };

    Graphics.prototype.newImage = function(path) {
      return new Image(path);
    };

    Graphics.prototype.newQuad = function(x, y, width, height, sw, sh) {
      return new Quad(x, y, width, height, sw, sh);
    };

    Graphics.prototype.setColor = function(r, g, b, a) {
      if (a == null) {
        a = 255;
      }
      if (typeof r === "number") {
        this.current_color = new Color(r, g, b, a);
      } else {
        this.current_color = new Color(r.getMember(1), r.getMember(2), r.getMember(3), r.getMember(4));
      }
      this.context.fillStyle = this.current_color.html_code;
      this.context.strokeStyle = this.current_color.html_code;
      return this.context.globalAlpha = this.current_color.a / 255;
    };

    Graphics.prototype.setBackgroundColor = function(r, g, b, a) {
      if (a == null) {
        a = 255;
      }
      if (typeof r === "number") {
        return this.background_color = new Color(r, g, b, a);
      } else {
        return this.background_color = new Color(r.getMember(1), r.getMember(2), r.getMember(3), r.getMember(4));
      }
    };

    Graphics.prototype.setCanvas = function(canvas) {
      if (canvas === void 0 || canvas === null) {
        this.default_canvas.copyContext(this.canvas.context);
        this.canvas = this.default_canvas;
        return this.context = this.default_context;
      } else {
        canvas.copyContext(this.canvas.context);
        this.canvas = canvas;
        return this.context = canvas.context;
      }
    };

    Graphics.prototype.setFont = function(font) {
      if (font) {
        return this.context.font = font.html_code;
      } else {
        return this.context.font = this.default_font.html_code;
      }
    };

    Graphics.prototype.origin = function() {
      return this.context.setTransform(1, 0, 0, 1, 0, 0);
    };

    Graphics.prototype.pop = function() {
      return this.context.restore();
    };

    Graphics.prototype.push = function() {
      return this.context.save();
    };

    Graphics.prototype.rotate = function(r) {
      return this.context.rotate(r);
    };

    Graphics.prototype.scale = function(sx, sy) {
      if (sy == null) {
        sy = sx;
      }
      return this.context.scale(sx, sy);
    };

    Graphics.prototype.shear = function(kx, ky) {
      return this.context.transform(1, ky, kx, 1, 0, 0);
    };

    Graphics.prototype.translate = function(dx, dy) {
      return this.context.translate(dx, dy);
    };

    Graphics.prototype.getWidth = function() {
      return this.default_canvas.width;
    };

    Graphics.prototype.getWidth = function() {
      return this.default_canvas.height;
    };

    drawDrawable = function(drawable, x, y, r, sx, sy, ox, oy, kx, ky) {
      var halfHeight, halfWidth;
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      if (r == null) {
        r = 0;
      }
      if (sx == null) {
        sx = 1;
      }
      if (sy == null) {
        sy = sx;
      }
      if (ox == null) {
        ox = 0;
      }
      if (oy == null) {
        oy = 0;
      }
      if (kx == null) {
        kx = 0;
      }
      if (ky == null) {
        ky = 0;
      }
      halfWidth = drawable.element.width / 2;
      halfHeight = drawable.element.height / 2;
      this.context.save();
      this.context.translate(x, y);
      this.context.rotate(r);
      this.context.scale(sx, sy);
      this.context.transform(1, ky, kx, 1, 0, 0);
      this.context.translate(-ox, -oy);
      this.context.drawImage(drawable.element, 0, 0);
      return this.context.restore();
    };

    drawWithQuad = function(drawable, quad, x, y, r, sx, sy, ox, oy, kx, ky) {
      var halfHeight, halfWidth;
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      if (r == null) {
        r = 0;
      }
      if (sx == null) {
        sx = 1;
      }
      if (sy == null) {
        sy = sx;
      }
      if (ox == null) {
        ox = 0;
      }
      if (oy == null) {
        oy = 0;
      }
      if (kx == null) {
        kx = 0;
      }
      if (ky == null) {
        ky = 0;
      }
      halfWidth = drawable.element.width / 2;
      halfHeight = drawable.element.height / 2;
      this.context.save();
      this.context.translate(x, y);
      this.context.rotate(r);
      this.context.scale(sx, sy);
      this.context.transform(1, ky, kx, 1, 0, 0);
      this.context.translate(-ox, -oy);
      this.context.drawImage(drawable.element, quad.x, quad.y, quad.width, quad.height, 0, 0, quad.width, quad.height);
      return this.context.restore();
    };

    return Graphics;

  })();

  this.Love = (function() {
    function Love(window_conf) {
      this.run = __bind(this.run, this);
      this.graphics = new Graphics(window_conf.width, window_conf.height);
      this.window = new Window(this.graphics);
      this.timer = new Timer();
      this.event = new EventQueue();
      this.keyboard = new Keyboard(this.event);
      this.filesystem = new FileSystem();
    }

    Love.prototype.run = function() {
      var game_loop;
      this.timer.step();
      this.load.call();
      game_loop = (function(_this) {
        return function() {
          var e, _i, _len, _ref;
          _ref = _this.event.internalQueue;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            e = _ref[_i];
            _this[e.eventType].call(null, e.arg1, e.arg2, e.arg3, e.arg4);
          }
          _this.event.clear();
          _this.timer.step();
          _this.update.call(null, _this.timer.getDelta());
          _this.graphics.origin();
          _this.graphics.clear();
          _this.draw.call();
          return _this.timer.nextFrame(game_loop);
        };
      })(this);
      return this.timer.nextFrame(game_loop);
    };

    Love.prototype.load = function(args) {};

    Love.prototype.update = function(dt) {};

    Love.prototype.mousepressed = function(x, y, button) {};

    Love.prototype.mousereleased = function(x, y, button) {};

    Love.prototype.keypressed = function(key, unicode) {};

    Love.prototype.keyreleased = function(key, unicode) {};

    Love.prototype.joystickpressed = function(joystick, button) {};

    Love.prototype.joystickreleased = function(joystick, button) {};

    Love.prototype.textinput = function(text) {};

    Love.prototype.draw = function() {};

    Love.prototype.focus = function(has_focus) {};

    Love.prototype.quit = function() {};

    return Love;

  })();

  Timer = (function() {
    var lastTime, performance, requestAnimationFrame;

    function Timer() {
      this.step = __bind(this.step, this);
      this.sleep = __bind(this.sleep, this);
      this.getTime = __bind(this.getTime, this);
      this.getFPS = __bind(this.getFPS, this);
      this.getDelta = __bind(this.getDelta, this);
      this.nextFrame = __bind(this.nextFrame, this);
      this.microTime = performance.now();
      this.deltaTime = 0;
      this.deltaTimeLimit = 0.25;
      this.events = {};
      this.maxEventId = 0;
    }

    Timer.prototype.nextFrame = function(callback) {
      return requestAnimationFrame(callback);
    };

    Timer.prototype.getDelta = function() {
      return this.deltaTime;
    };

    Timer.prototype.getFPS = function() {
      if (this.deltaTime === 0) {
        return 0;
      } else {
        return 1 / this.deltaTime;
      }
    };

    Timer.prototype.getTime = function() {
      return this.microTime;
    };

    Timer.prototype.sleep = function() {};

    Timer.prototype.step = function() {
      var dt;
      dt = (performance.now() - this.microTime) / 1000;
      this.deltaTime = Math.max(0, Math.min(this.deltaTimeLimit, dt));
      return this.microTime += dt * 1000;
    };

    performance = window.performance || Date;

    performance.now = performance.now || performance.msNow || performance.mozNow || performance.webkitNow || Date.now;

    lastTime = 0;

    requestAnimationFrame = window.requestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame || function(callback) {
      var currTime, delay, timeToCall;
      currTime = performance.now();
      timeToCall = Math.max(0, 16 - (currTime - lastTime));
      delay = function() {
        return callback(currTime + timeToCall);
      };
      lastTime = currTime + timeToCall;
      return setTimeout(delay, timeToCall);
    };

    return Timer;

  })();

  EventQueue = (function() {
    var Event;

    function EventQueue() {
      this.wait = __bind(this.wait, this);
      this.quit = __bind(this.quit, this);
      this.push = __bind(this.push, this);
      this.pump = __bind(this.pump, this);
      this.poll = __bind(this.poll, this);
      this.clear = __bind(this.clear, this);
      this.internalQueue = [];
    }

    EventQueue.prototype.clear = function() {
      return this.internalQueue = [];
    };

    EventQueue.prototype.poll = function() {};

    EventQueue.prototype.pump = function() {};

    EventQueue.prototype.push = function() {
      var args, eventType, newEvent;
      eventType = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      newEvent = (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return Object(result) === result ? result : child;
      })(Event, [eventType].concat(__slice.call(args)), function(){});
      return this.internalQueue.push(newEvent);
    };

    EventQueue.prototype.quit = function() {};

    EventQueue.prototype.wait = function() {};

    Event = (function() {
      function Event(eventType, arg1, arg2, arg3, arg4) {
        this.eventType = eventType;
        this.arg1 = arg1;
        this.arg2 = arg2;
        this.arg3 = arg3;
        this.arg4 = arg4;
      }

      return Event;

    })();

    return EventQueue;

  })();

  Keyboard = (function() {
    var getKeyFromEvent, keys, rightKeys, shiftedKeys;

    function Keyboard(eventQueue) {
      this.isDown = __bind(this.isDown, this);
      this.keysDown = {};
      document.addEventListener("keydown", (function(_this) {
        return function(evt) {
          var key;
          evt.preventDefault();
          evt.stopPropagation();
          key = getKeyFromEvent(evt);
          _this.keysDown[key] = true;
          return eventQueue.push("keypressed", key, evt.which);
        };
      })(this));
      document.addEventListener("keyup", (function(_this) {
        return function(evt) {
          var key;
          evt.preventDefault();
          evt.stopPropagation();
          key = getKeyFromEvent(evt);
          _this.keysDown[key] = false;
          return eventQueue.push("keyreleased", key, evt.which);
        };
      })(this));
    }

    Keyboard.prototype.isDown = function() {
      var key, others;
      key = arguments[0], others = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (this.keysDown[key]) {
        return true;
      } else {
        if (others.length === 0) {
          return false;
        } else {
          return this.isDown.apply(this, others);
        }
      }
    };

    keys = {
      8: "backspace",
      9: "tab",
      13: "return",
      16: "shift",
      17: "ctrl",
      18: "alt",
      19: "pause",
      20: "capslock",
      27: "escape",
      33: "pageup",
      34: "pagedown",
      35: "end",
      36: "home",
      45: "insert",
      46: "delete",
      37: "left",
      38: "up",
      39: "right",
      40: "down",
      91: "lmeta",
      92: "rmeta",
      93: "mode",
      96: "kp0",
      97: "kp1",
      98: "kp2",
      99: "kp3",
      100: "kp4",
      101: "kp5",
      102: "kp6",
      103: "kp7",
      104: "kp8",
      105: "kp9",
      106: "kp*",
      107: "kp+",
      109: "kp-",
      110: "kp.",
      111: "kp/",
      112: "f1",
      113: "f2",
      114: "f3",
      115: "f4",
      116: "f5",
      117: "f6",
      118: "f7",
      119: "f8",
      120: "f9",
      121: "f10",
      122: "f11",
      123: "f12",
      144: "numlock",
      145: "scrolllock",
      186: ",",
      187: "=",
      188: ",",
      189: "-",
      190: ".",
      191: "/",
      192: "`",
      219: "[",
      220: "\\",
      221: "]",
      222: "'"
    };

    shiftedKeys = {
      192: "~",
      48: ")",
      49: "!",
      50: "@",
      51: "#",
      52: "$",
      53: "%",
      54: "^",
      55: "&",
      56: "*",
      57: "(",
      109: "_",
      61: "+",
      219: "{",
      221: "}",
      220: "|",
      59: ":",
      222: "\"",
      188: "<",
      189: ">",
      191: "?",
      96: "insert",
      97: "end",
      98: "down",
      99: "pagedown",
      100: "left",
      102: "right",
      103: "home",
      104: "up",
      105: "pageup"
    };

    rightKeys = {
      16: "rshift",
      17: "rctrl",
      18: "ralt"
    };

    getKeyFromEvent = function(event) {
      var code, key;
      code = event.which;
      if (event.location && event.location > 1) {
        key = rightKeys[code];
      } else if (event.shiftKey) {
        key = shiftedKeys[code] || keys[code];
      } else {
        key = keys[code];
      }
      if (typeof key === "undefined") {
        key = String.fromCharCode(code);
        if (event.shiftKey) {
          key = key.toUpperCase();
        }
      }
      return key;
    };

    return Keyboard;

  })();

  Font = (function() {
    function Font(filename, size) {
      this.filename = filename;
      this.size = size;
      this.html_code = "" + this.size + "px " + this.filename;
    }

    Font.prototype.getAscent = function(self) {};

    Font.prototype.getBaseline = function(self) {};

    Font.prototype.getDescent = function(self) {};

    Font.prototype.getFilter = function(self) {};

    Font.prototype.getHeight = function(self) {};

    Font.prototype.getLineHeight = function(self) {};

    Font.prototype.getWidth = function(self) {};

    Font.prototype.getWrap = function(self) {};

    Font.prototype.hasGlyphs = function(self) {};

    Font.prototype.setFilter = function(self) {};

    Font.prototype.setLineHeight = function(self) {};

    return Font;

  })();

  FileSystem = (function() {
    function FileSystem() {
      this.write = __bind(this.write, this);
      this.unmount = __bind(this.unmount, this);
      this.setSource = __bind(this.setSource, this);
      this.setIdentity = __bind(this.setIdentity, this);
      this.remove = __bind(this.remove, this);
      this.read = __bind(this.read, this);
      this.newFileData = __bind(this.newFileData, this);
      this.newFile = __bind(this.newFile, this);
      this.mount = __bind(this.mount, this);
      this.load = __bind(this.load, this);
      this.lines = __bind(this.lines, this);
      this.isFused = __bind(this.isFused, this);
      this.isFile = __bind(this.isFile, this);
      this.isDirectory = __bind(this.isDirectory, this);
      this.init = __bind(this.init, this);
      this.getWorkingDirectory = __bind(this.getWorkingDirectory, this);
      this.getUserDirectory = __bind(this.getUserDirectory, this);
      this.getSize = __bind(this.getSize, this);
      this.getSaveDirectory = __bind(this.getSaveDirectory, this);
      this.getLastModified = __bind(this.getLastModified, this);
      this.getIdentity = __bind(this.getIdentity, this);
      this.getDirectoryItems = __bind(this.getDirectoryItems, this);
      this.getAppdataDirectory = __bind(this.getAppdataDirectory, this);
      this.exists = __bind(this.exists, this);
      this.createDirectory = __bind(this.createDirectory, this);
      this.append = __bind(this.append, this);
    }

    FileSystem.prototype.append = function() {};

    FileSystem.prototype.createDirectory = function() {};

    FileSystem.prototype.exists = function(filename) {
      return localStorage.getItem(filename) !== null;
    };

    FileSystem.prototype.getAppdataDirectory = function() {};

    FileSystem.prototype.getDirectoryItems = function() {};

    FileSystem.prototype.getIdentity = function() {};

    FileSystem.prototype.getLastModified = function() {};

    FileSystem.prototype.getSaveDirectory = function() {};

    FileSystem.prototype.getSize = function() {};

    FileSystem.prototype.getUserDirectory = function() {};

    FileSystem.prototype.getWorkingDirectory = function() {};

    FileSystem.prototype.init = function() {};

    FileSystem.prototype.isDirectory = function() {};

    FileSystem.prototype.isFile = function() {};

    FileSystem.prototype.isFused = function() {};

    FileSystem.prototype.lines = function() {};

    FileSystem.prototype.load = function() {};

    FileSystem.prototype.mount = function() {};

    FileSystem.prototype.newFile = function() {};

    FileSystem.prototype.newFileData = function() {};

    FileSystem.prototype.read = function(filename) {
      return localStorage.getItem(filename);
    };

    FileSystem.prototype.remove = function(filename) {
      return localStorage.removeItem(filename);
    };

    FileSystem.prototype.setIdentity = function() {};

    FileSystem.prototype.setSource = function() {};

    FileSystem.prototype.unmount = function() {};

    FileSystem.prototype.write = function(filename, data) {
      return localStorage.setItem(filename, data);
    };

    return FileSystem;

  })();

  Window = (function() {
    function Window(graphics) {
      this.graphics = graphics;
      this.setTitle = __bind(this.setTitle, this);
      this.setMode = __bind(this.setMode, this);
      this.setIcon = __bind(this.setIcon, this);
      this.setFullscreen = __bind(this.setFullscreen, this);
      this.isVisible = __bind(this.isVisible, this);
      this.isCreated = __bind(this.isCreated, this);
      this.hasMouseFocus = __bind(this.hasMouseFocus, this);
      this.hasFocus = __bind(this.hasFocus, this);
      this.getWidth = __bind(this.getWidth, this);
      this.getTitle = __bind(this.getTitle, this);
      this.getPixelScale = __bind(this.getPixelScale, this);
      this.getMode = __bind(this.getMode, this);
      this.getIcon = __bind(this.getIcon, this);
      this.getHeight = __bind(this.getHeight, this);
      this.getFullscreenModes = __bind(this.getFullscreenModes, this);
      this.getFullscreen = __bind(this.getFullscreen, this);
      this.getDisplayCount = __bind(this.getDisplayCount, this);
      this.getDimensions = __bind(this.getDimensions, this);
      this.getDesktopDimensions = __bind(this.getDesktopDimensions, this);
    }

    Window.prototype.getDesktopDimensions = function() {};

    Window.prototype.getDimensions = function() {};

    Window.prototype.getDisplayCount = function() {};

    Window.prototype.getFullscreen = function() {};

    Window.prototype.getFullscreenModes = function() {};

    Window.prototype.getHeight = function() {};

    Window.prototype.getIcon = function() {};

    Window.prototype.getMode = function() {};

    Window.prototype.getPixelScale = function() {};

    Window.prototype.getTitle = function() {};

    Window.prototype.getWidth = function() {};

    Window.prototype.hasFocus = function() {};

    Window.prototype.hasMouseFocus = function() {};

    Window.prototype.isCreated = function() {};

    Window.prototype.isVisible = function() {};

    Window.prototype.setFullscreen = function() {};

    Window.prototype.setIcon = function() {};

    Window.prototype.setMode = function(width, height, flags) {
      return this.graphics.canvas.setDimensions(width, height);
    };

    Window.prototype.setTitle = function() {};

    return Window;

  })();

}).call(this);

//# sourceMappingURL=love.map
