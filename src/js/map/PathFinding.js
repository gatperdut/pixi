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

  if (fe.critterholder.critters.male.walker.walking) {
    return;
  }

  this.clearPath();
  
  if (!this._pathValid(path)) {
    return;
  }

  this.path = path;

  _.each(path, function(step) {
    var sprite = self.hexmap.sprites[step.x][step.y];
    if (fe.states.hexGrid) {
      sprite.texture = fe.map.texture.hexagonsel;
    }
    else {
      sprite.alpha = 1.0;
    }
  });
};

PathFinding.prototype._performWalk = function(critter, path) {
  if (!this._pathValid(path)) {
    return;
  }

  this.clearPath();

  critter.walker.walk(path);
};

PathFinding.prototype.findPath = function(critter, coord, perform) {
  if (!critter || fe.utils.samePoint(critter.coord, coord)) {
    return;
  }

  this.easystar.setGrid(fe.utils.reverseM(this.hexmap.obstacles));
  this.easystar.setAcceptableTiles([0]);
  this.easystar.enableDiagonals();

  var callback = perform ? this._performWalk.bind(this, critter) : this._drawPath.bind(this);

  var origin = critter.intercoord ? critter.intercoord : critter.coord;

  this.easystar.findPath(origin.x, origin.y, coord.x, coord.y, callback);
  this.easystar.calculate();
};

PathFinding.prototype.clearPath = function() {
  var self = this;

  if (!this.path) {
    return;
  }

  _.each(this.path, function(step) {
    var sprite = self.hexmap.sprites[step.x][step.y];
    if (fe.states.hexGrid) {
      sprite.texture = fe.map.texture.hexagon;
    }
    else {
      sprite.texture = fe.map.texture.hexagon;
      sprite.alpha = 0.0;
    }
  });
};