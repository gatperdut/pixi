'use strict';

function Utils() {
  this._setpanamount();
  this._setorientation();
}

Utils.prototype._setpanamount = function() {
  this.panamount = {};
  this.panamount[PIXI.keyboard.Key.UP]    = [  0,  50];
  this.panamount[PIXI.keyboard.Key.RIGHT] = [-50,   0];
  this.panamount[PIXI.keyboard.Key.DOWN]  = [  0, -50];
  this.panamount[PIXI.keyboard.Key.LEFT]  = [ 50,   0];
};

Utils.prototype._setorientation = function() {
  this.orientation = {};
  this.orientation['10']   = 0;
  this.orientation['11']   = 1;
  this.orientation['01']   = 2;
  this.orientation['-10']  = 3;
  this.orientation['-1-1'] = 4;
  this.orientation['0-1']  = 5;
};

Utils.prototype.deg2rad = function(deg) {
  return deg * (Math.PI / 180);
};

Utils.prototype.samePoint = function(p1, p2) {
  return p1.x === p2.x && p1.y === p2.y;
};

Utils.prototype.pointAmong = function(points, point) {
  var self = this;
  var result = false;
  _.each(points, function(somepoint) {
    if (self.samePoint(somepoint, point)) {
      result = true;
    }
  });

  return result;
};

Utils.prototype.dirBetween = function(hex1, hex2) {
  var dx = hex2.x - hex1.x;
  var dy = hex2.y - hex1.y;
  return this.orientation['' + dx + dy];
};

Utils.prototype.reverseM = function(m) {
  var result = []

  for (var i = 0; i < m.length; i++) {
    for (var j = 0; j < m[0].length; j++) {
      if (!result[j]) {
        result[j] = [];
      }
      result[j][i] = m[i][j];
    }
  }
  return result;
};

Utils.prototype.reverseP = function(path) {
  var result = [];
  _.each(path, function(step) {
    result.shift({
      x: step.y,
      y: step.x
    });
  });

  return result;
};