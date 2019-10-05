'use strict';

function Keyboard() {
  this.dirKeys = [
    PIXI.keyboard.Key.UP,
    PIXI.keyboard.Key.RIGHT,
    PIXI.keyboard.Key.DOWN,
    PIXI.keyboard.Key.LEFT
  ];

  this.setup();
}

Keyboard.prototype.setup = function() {
  var self = this;
  PIXI.keyboardManager.on('pressed', function(key) {
    if (key === PIXI.keyboard.Key.D) {
      fe.critterholder.critters['male'].direction = ++fe.critterholder.critters['male'].direction % 6;
    }
    if (_.include(self.dirKeys, key)) {
      fe.map.pandir(key);
    }
  });
};