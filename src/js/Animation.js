'use strict';

function Animation(critter) {
  this.critter = critter;
  this.tickerinstance  = null;
  this.counter = 0;
  this.fnum    = 0;
}

Animation.prototype._galleryRoot = function() {
  return fe.crittergallery.list[this.critter.actor][this.critter.action];
};

Animation.prototype.start = function() {
  this.counter = 0;
  this.tickerinstance = fe.app.ticker.add(delta => this.iterate(delta));
};

Animation.prototype.iterate = function(delta) {
  var goalfps = 60 / delta;
  var goalcounter = goalfps / this._galleryRoot().data.header.fps;
  
  this.counter++;

  if (this.counter > goalcounter) {
    this.counter = 0;
    this.fnum = ++this.fnum % this._galleryRoot().data.header.frames_per_direction;
    this.critter.sprite.texture = this._galleryRoot().textures[this.critter.direction][this.fnum];
  }
};

Animation.prototype.stop = function() {
  this.tickerinstance.stop();
  this.counter = 0;
};