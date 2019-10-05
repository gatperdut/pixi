'use strict';

function Critter(name, actor) {
  this.name      = name;
  this.actor     = actor;
  this.action    = 'AA';
  this.direction = 0;
  this.animation = new Animation(this);

  this.sprite    = new PIXI.Sprite(this._galleryRoot().textures[this.direction][this.animation.fnum]);
  this.sprite.anchor.set(0.5, 1.0);

  this.coord     = new PIXI.Point(0, 0);
}

Critter.prototype._galleryRoot = function() {
  return fe.crittergallery.list[this.actor][this.action];
};

Critter.prototype.place = function(x, y) {
  this.coord.x = x;
  this.coord.y = y;

  var globalAdjustment = this._galleryRoot().data.header.offsets[this.direction];
  var frameAdjustment  = this._galleryRoot().data.frames[this.direction][this.animation.fnum].offset;
  
  var hexpos = fe.map.pathfinding.hexmap.sprites[x][y].position;

  var newx = hexpos.x + globalAdjustment.x + frameAdjustment.x;
  var newy = hexpos.y + globalAdjustment.y + frameAdjustment.y;

  this.sprite.position.set(newx, newy);
};