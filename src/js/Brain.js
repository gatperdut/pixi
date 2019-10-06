'use strict';

function Brain() {
  this.timer = PIXI.timerManager.createTimer(1000);
  this.timer.loop = true;

  this.timer.on('repeat', this.waltz.bind(this));

  this.timer.start();
}

Brain.prototype.waltz = function() {
  //fe.critterholder.critters.female
};