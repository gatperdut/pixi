'use strict';

function Animation(critter) {
  var self = this;

  this.critter = critter;
  this.ticker  = new PIXI.Ticker();
  this.counter = 0;
  this.fnum    = 0;
}

Animation.prototype.start = function() {
  this.counter = 0;
  FEng.app.ticker.add(delta => this.iterate(delta));
};

Animation.prototype.iterate = function(delta) {
  this.counter = ++this.counter % this.critter.data.fps;

  if (!this.counter) {
    this.fnum = ++this.fnum % this.critter.data.frames_per_direction;
    this.critter.texture(this.fnum);
  }
};

Animation.prototype.stop = function() {
  this.ticker.stop();
};