'use strict';

function Walker(critter) {
  this.critter = critter;
  this.walking = false;
}

Walker.prototype.walk = function(path) {
  if (this.walking) {
    this.critter.animation.stop();
  }

  this._step(path);
};

Walker.prototype._step = function(path) {
  path.shift();
  var nexthex = path.shift();
  
  this._orient(nexthex);
};

Walker.prototype._orient = function(nexthex) {
  var dx = nexthex.x - this.critter.coord.x;
  var dy = nexthex.y - this.critter.coord.y;

  this.critter.direction = fe.utils.orientation['' + dx + dy];
  this.critter.animation.resetFrameAdj();
  this.critter.animation.setSprite();
};