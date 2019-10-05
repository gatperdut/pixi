'use strict';

function Critter(name, actor) {
  this.name      = name;
  this.actor     = actor;
  this.action    = 'AB';
  this.direction = 1;
  this.animation = new Animation(this);

  this.sprite    = new PIXI.Sprite(this._galleryRoot().textures[this.direction][this.animation.fnum]);
  this.sprite.anchor.set(0.5, 1.0);

  this.coord     = new PIXI.Point(0, 0);
}

Critter.prototype._galleryRoot = function() {
  return fe.crittergallery.list[this.actor][this.action];
};

Critter.prototype.place = function(x, y) {
  x = x || this.coord.x;
  y = y || this.coord.y;

  this.coord.x = x;
  this.coord.y = y;

  var globalAdjustment = this._galleryRoot().data.header.offsets[this.direction];

  var frameAdjustment = new PIXI.Point(0, 0);
  for (var i = 0; i < this.animation.fnum; i++) {
    frameAdjustment.x += this._galleryRoot().data.frames[this.direction][i].offset.x;
    frameAdjustment.y += this._galleryRoot().data.frames[this.direction][i].offset.y;
  }

  var hexpos = fe.map.pathfinding.hexmap.sprites[x][y].position;

  var newx = hexpos.x + globalAdjustment.x + frameAdjustment.x;
  var newy = hexpos.y + globalAdjustment.y + frameAdjustment.y;

  this.sprite.position.set(newx, newy);
};