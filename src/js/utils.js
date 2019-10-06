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

Utils.prototype.orientation = function(dx, dy) {

};