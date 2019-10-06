'use strict';

function Animation(critter) {
  this.critter = critter;
  this.ticker  = new PIXI.Ticker();
  this.ticker.autoStart = true;
  this.action  = 'AA';
  this.counter = 0;
  this.fnum    = 0;

  this.frameAdj = new PIXI.Point(0, 0);

  this.listeners = {
    act: [],
    mid: [],
    end: []
  };
}

Animation.prototype.addListener = function(anicallback) {
  if (_.include(this.listeners[anicallback.type], anicallback)) {
    console.error('Tried to add the same AniCallback (' + anicallback.type + ') twice for ' + this.critter.name + '.');
    return;
  }
  this.listeners[anicallback.type].push(anicallback);
};

Animation.prototype.remListener = function(anicallback) {
  var initiallength = this.listeners[anicallback.type].length;
  this.listeners[anicallback.type] = _.without(this.listeners[anicallback.type], anicallback);
  if (initiallength === this.listeners[anicallback.type]) {
    console.error('Tried to remove a non-existing AniCallback (' + anicallback.type + ') for ' + this.critter.name + '.');
  }
};

Animation.prototype.callListeners = function(type) {
  _.each(this.listeners[type], function(listener) {
    listener.call();
  });
};

Animation.prototype._galleryRoot = function() {
  return fe.crittergallery.list[this.critter.actor][this.action];
};

Animation.prototype.start = function() {
  if (this.ticker.started) {
    console.error('Animation ticker for ' + this.critter.name + ' is already started.');
  }
  this.counter = 0;
  this.ticker.add(delta => this.iterate(delta));
};

Animation.prototype.setSprite = function() {
  this.critter.sprite.texture = this._galleryRoot().textures[this.critter.direction][this.fnum];
};

Animation.prototype._frameOffset = function(whichfnum) {
  return this._galleryRoot().data.frames[this.critter.direction][whichfnum].offset
};

Animation.prototype._invalidFNum = function() {
  return this.fnum === this._galleryRoot().data.header.frames_per_direction;
};

Animation.prototype._midFNum = function() {
  return this.fnum === Math.floor(this._galleryRoot().data.header.frames_per_direction / 2);
};

Animation.prototype._actFNum = function() {
  return this.fnum === this._galleryRoot().data.header.action_frame
};

Animation.prototype.resetFrameAdj = function() {
  this.frameAdj.x = 0;
  this.frameAdj.y = 0;
};

Animation.prototype.updateFrameAdj = function() {
  this.frameAdj.x += this._frameOffset(this.fnum).x;
  this.frameAdj.y += this._frameOffset(this.fnum).y;
};

Animation.prototype.iterate = function(delta) {
  var goalfps = 60 / delta;
  var goalcounter = goalfps / this._galleryRoot().data.header.fps;
  
  this.counter++;

  if (this.counter > goalcounter) {
    this.counter = 0;

    if (this._actFNum()) {
      this.callListeners('act');
    }

    if (this._midFNum()) {
      this.callListeners('mid');
    }
    
    this.updateFrameAdj();

    this.setSprite();
    this.critter.place(this.critter.coord.x, this.critter.coord.y);

    this.fnum++;
    if (this._invalidFNum()) {
      this.fnum = 0;
      this.resetFrameAdj();
      this.callListeners('end');
    }
  }
};

Animation.prototype.stop = function() {
  if (!this.ticker.started) {
    console.error('Animation ticker for ' + this.critter.name + ' is not started.');
    return;
  }
  this.ticker.stop();
  this.resetFrameAdj();
  this.counter = 0;
  this.fnum = 0;
  this.action = 'AA';
  this.setSprite();
};