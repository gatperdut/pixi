'use strict';

function PathFinding(map) {
  this.map = map;
  this.hexmap = {
    obstacles: [],
    sprites:   []
  };
  this.easystar = new EasyStar.js();

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
    this.hexmap.sprites[w]   = []
  }
  this.hexmap.obstacles[w][h] = value;
  this.hexmap.sprites[w][h]   = sprite;

  this.easystar.setDirectionalCondition(w, h, this.dirConditions);
};

PathFinding.prototype._drawPath = function(path) {
  var self = this;
  if (path === null) {
    console.log("Path was not found.");
  } else {
    _.each(path, function(step) {
      self.hexmap.sprites[step.x][step.y].texture = self.map.texture.hexagonpath;
    });
  }
};

PathFinding.prototype.findPath = function(data) {
  this.easystar.setGrid(this.hexmap.obstacles);
  this.easystar.setAcceptableTiles([0]);
  this.easystar.enableDiagonals();
  //this.easystar.disableCornerCutting();
  this.easystar.findPath(20, 20, data.target.coord.w, data.target.coord.h, this._drawPath.bind(this));
  this.easystar.calculate();
};