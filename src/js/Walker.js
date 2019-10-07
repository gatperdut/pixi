'use strict';

function Walker(critter) {
  this.critter = critter;

  this.walking = false;

  this.stepcallback    = null;
  this.midstepcallback = null;

  this.turns = [];
}

Walker.prototype.walk = function(path) {
  this.critter.animation.action = 'AB';
  this.critter.animation.fnum = 0;
  this.critter.animation.counter = 0;
  this.walking = true;

  this._fillTurns(path, null);

  this.cancelCallbacks([this.stepcallback, this.midstepcallback]);

  if (this.critter.intercoord) {
    this.critter.place(this.critter.intercoord.x, this.critter.intercoord.y);
    this.critter.animation.resetFrameAdj();
    this.critter.animation.setSprite();
    this.critter.intercoord = null;
  }

  this._step(path);
};

Walker.prototype._fillTurns = function(path, dir) {
  if (path.length === 1) {
    return;
  }
  var thishex = path[0];
  var nexthex = path[1];
  var newdir = fe.utils.dirBetween(thishex, nexthex);

  var remainingpath = path.slice(1);

  if (dir && dir !== newdir) {
    this.turns.push(thishex);
  }
  
  this._fillTurns(remainingpath, newdir);
};

Walker.prototype.cancelCallbacks = function(callbacks) {
  _.each(callbacks, function(callback) {
    if (callback) {
      callback.cancel();
      callback = null;
    }
  });
};

Walker.prototype._midstep = function(path) {
  var hex = path[0];
  this.critter.intercoord = new PIXI.Point(hex.x, hex.y);
};

Walker.prototype._step = function(path) {
  var thishex = path[0];
  var nexthex = path[1];
  
  if (thishex) {
    this.critter.place(thishex.x, thishex.y);
  }

  if (!nexthex) {
    this.cancelCallbacks([this.stepcallback, this.midstepcallback]);
    this.critter.animation.action = 'AA';
    this.critter.fnum = 0;
    this.critter.animation.resetFrameAdj();
    this.critter.intercoord = null;
    this.turns.length = 0;
    this.walking = false;
    return;
  }

  this._orient(nexthex);

  this.cancelCallbacks([this.stepcallback, this.midstepcallback]);

  if (fe.utils.pointAmong(this.turns, nexthex)) {
    path.shift();
    this.stepcallback = new AniCallback(this._step.bind(this), path, 'mid', this.critter.animation);
  }
  else {
    if (path.length > 2) {
      this.midstepcallback = new AniCallback(this._midstep.bind(this), path.slice(1), 'mid', this.critter.animation);
      path.shift();
      this.stepcallback = new AniCallback(this._step.bind(this), path, 'end', this.critter.animation);
      path.shift();
    }
    else {
      path.shift();
      this.stepcallback = new AniCallback(this._step.bind(this), path, 'mid', this.critter.animation);
    }
  }
};

Walker.prototype._orient = function(nexthex) {
  var newdir = fe.utils.dirBetween(this.critter.coord, nexthex);

  var prevdir = this.critter.direction;
  if (prevdir !== newdir) {
    this.critter.direction = newdir;
    this.critter.animation.fnum = 0;
    this.critter.animation.resetFrameAdj();
    this.critter.animation.setSprite();
    this.critter.place();
  }
};