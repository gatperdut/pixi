'use strict';

function Utils() {
  this.panamount = {};
  this.panamount[PIXI.keyboard.Key.UP]    = [  0,  50];
  this.panamount[PIXI.keyboard.Key.RIGHT] = [-50,   0];
  this.panamount[PIXI.keyboard.Key.DOWN]  = [  0, -50];
  this.panamount[PIXI.keyboard.Key.LEFT]  = [ 50,   0];
}

Utils.prototype.deg2rad = function(deg) {
  return deg * (Math.PI / 180);
};
