'use strict';

function PathFinding() {
  this.hexmap = {
    obstacles: [],
    sprites:   []
  };
  this.easystar = new EasyStar.js();

  this.path     = null;

  this.dirConditions = [
    EasyStar.TOP,
    EasyStar.RIGHT,
    EasyStar.BOTTOM_RIGHT,
    EasyStar.BOTTOM,
    EasyStar.LEFT,
    EasyStar.TOP_LEFT
  ];
}

PathFinding.prototype.fillPathMap = function(w, h, value, sprite) {
  if (!this.hexmap.obstacles[w]) {
    this.hexmap.obstacles[w] = [];
    this.hexmap.sprites[w]   = [];
  }
  this.hexmap.obstacles[w][h] = value;
  this.hexmap.sprites[w][h]   = sprite;

  this.easystar.setDirectionalCondition(w, h, this.dirConditions);
};

PathFinding.prototype._pathValid = function(path) {
  if (!path) {
    console.log('Path was not found');
    return false;
  }

  return true;
};

PathFinding.prototype._drawPath = function(path) {
  var self = this;

  if (this.path) {
    this.clearPath();
  }

  if (!this._pathValid(path)) {
    return;
  }

  this.path = path;

  _.each(path, function(step) {
    self.hexmap.sprites[step.x][step.y].texture = fe.map.texture.hexagonpath;
  });
};

PathFinding.prototype._performWalk = function(critter, path) {
  if (!this._pathValid(path)) {
    return;
  }

  critter.walker.walk(path);
};

PathFinding.prototype.findPath = function(critter, coord, perform) {
  if (!critter || fe.utils.samePoint(critter.coord, coord)) {
    return;
  }

  this.easystar.setGrid(this.hexmap.obstacles);
  this.easystar.setAcceptableTiles([0]);
  this.easystar.enableDiagonals();
  //this.easystar.disableCornerCutting();

  var callback = perform ? this._performWalk.bind(this, critter) : this._drawPath.bind(this);

  var origin = critter.intercoord ? critter.intercoord : critter.coord;

  this.easystar.findPath(origin.x, origin.y, coord.x, coord.y, callback);
  this.easystar.calculate();
};

PathFinding.prototype.clearPath = function() {
  var self = this;

  _.each(this.path, function(step) {
    self.hexmap.sprites[step.x][step.y].texture = fe.map.texture.hexagon;
  });
};