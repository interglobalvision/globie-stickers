/* jshint browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true, esversion: 6 */
/* global $, document, Modernizr */

var app = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    app.receivedEvent('deviceready');
  },
  // Update DOM on a Received Event
  receivedEvent: function(id) {
    console.log('Received Event: ' + id);
  }
};

class Stickers {
  constructor(options) {
    this.container = options.container;

    this.fingers = [];
    this.stage = new createjs.Stage(this.container);

    createjs.Touch.enable(this.stage);

    this.drawCircle();

  }

  drawCircle() {
    let circle = new createjs.Shape();

    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
    circle.x = 100;
    circle.y = 100;

    circle.addEventListener('mousedown', event => this.onMouseDown(event));

    // Amazing ES5  magix to properly bind `this` \0/
    circle.addEventListener('pressmove', event => this.onPressMove(event));

    this.stage.addChild(circle);
    this.stage.update();

  }

  loadImage(path) {
    let that = this;
    let image = new Image();
    image.src = path;

    image.onload = function(event) {
      let loadedImage = event.target;
      that.addImage(loadedImage);
    }

  }

  addImage(image) {
    let that = this;
    let bitmap = new createjs.Bitmap(image);

    // Add listeners
    bitmap.addEventListener('mousedown', event => this.onMouseDown(event));

    // Amazing ES5  magix to properly bind `this` \0/
    bitmap.addEventListener('pressmove', event => this.onPressMove(event));

    this.stage.addChild(bitmap);
    this.stage.update();
  }

  onPressMove(event) {
    console.log(event.pointerID);

    event.currentTarget.x = event.stageX - event.currentTarget.localX;
    event.currentTarget.y = event.stageY - event.currentTarget.localY;

    /* 
     * idk what this is for
     if (! event.pointerID) {
     event.pointerID = -1;
     }
     */

    console.log(event.pointerID);

    // Update fingers position
    this.fingers[event.pointerID].current.x = event.stageX;
    this.fingers[event.pointerID].current.y = event.stageY;

    this.stage.update();
  }

  onMouseDown(event) {
    // Put current object position
    event.currentTarget.localX = event.localX;
    event.currentTarget.localY = event.localY;

    // Save fingers position

    /* 
     * idk what this is for
     if ( ! event.pointerID ) {
     event.pointerID = -1;
     }
     */

    this.fingers[event.pointerID] = {
      start: {x: event.stageX, y: event.stageY},
      current: {x: event.stageX, y: event.stageY},
      old: {x: event.stageX, y: event.stageY}
    };
  }

};

var stickers = new Stickers({
  'container': 'demoCanvas'
});

stickers.loadImage('../img/busan.jpg');

app.initialize();

