'use strict';

function Critter(name, actor) {
  this.name       = name;
  this.actor      = actor;
  this.direction  = 4;
  this.animation  = new Animation(this);

  this.sprite     = new PIXI.Sprite(this._galleryRoot().textures[this.direction][this.animation.fnum]);
  this.sprite.anchor.set(0.5, 1.0);

  this.coord      = new PIXI.Point(0, 0);
  this.intercoord = null;

  this.walker     = new Walker(this);
}

Critter.prototype._galleryRoot = function() {
  return fe.crittergallery.list[this.actor][this.animation.action];
};

Critter.prototype.place = function(x, y) {
  x = x || this.coord.x;
  y = y || this.coord.y;

  this.coord.x = x;
  this.coord.y = y;

  var globalAdjustment = this._galleryRoot().data.header.offsets[this.direction];

  var hexpos = fe.map.pathfinding.hexmap.sprites[x][y].position;

  var newx = hexpos.x + globalAdjustment.x + this.animation.frameAdj.x;
  var newy = hexpos.y + globalAdjustment.y + this.animation.frameAdj.y;

  this.sprite.position.set(newx, newy);
};