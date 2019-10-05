'use strict';

function Critter(name, type, callback) {
  this.name      = name;
  this.type      = type;
  this._callback = callback;
  this.data      = null;
  this.textures  = [];
  this.sprite    = null
  this.direction = 0;
  this.coord     = new PIXI.Point(0, 0);

  this.animation = new Animation(this);

  this.loader = new PIXI.Loader();

  $.getJSON('assets/critters/' + this.type + '/data.json', this._dataLoaded.bind(this));
}

Critter.prototype._dataLoaded = function(response) {
  this.data = response;
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < this.data.header.frames_per_direction; j++) {
      this.loader
      .add(this.type + '_' + i + '_' + j, 'assets/critters/' + this.type + '/' + i + '_' + j + '.png');
    }
  }

  this.loader
  .load(this._texturesLoaded.bind(this));
};

Critter.prototype._texturesLoaded = function(loader, resources) {
  for (var i = 0; i < 6; i++) {
    this.textures[i] = [];
    for (var j = 0; j < this.data.header.frames_per_direction; j++) {
      this.textures[i][j] = resources[this.type + '_' + i + '_' + j].texture
    }
  }

  this.sprite = new PIXI.Sprite(this.textures[this.direction][this.animation.fnum]);
  this.sprite.anchor.set(0.5, 1.0);

  this._callback(this);
};

Critter.prototype.texture = function(fnum) {
  this.sprite.texture = this.textures[this.direction][fnum];
};

Critter.prototype.place = function(x, y) {
  this.coord.x = x;
  this.coord.y = y;

  var hexpos = fe.map.pathfinding.hexmap.sprites[x][y].position;
  this.sprite.position.set(hexpos.x, hexpos.y);
};