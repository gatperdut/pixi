'use strict';

function Critter(name, callback, x, y) {
  this.name      = name;
  this._callback = callback;
  this._x        = x;
  this._y        = y;
  this.data      = null;
  this.textures  = [];
  this.sprite    = null
  this.direction = 0;

  this.animation = new Animation(this);

  this.loader = new PIXI.Loader();

  $.getJSON('assets/critters/' + this.name + '/data.json', this._dataLoaded.bind(this));
}

Critter.prototype._dataLoaded = function(response) {
  this.data = response;
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < this.data.header.frames_per_direction; j++) {
      this.loader
      .add(this.name + '_' + i + '_' + j, 'assets/critters/' + this.name + '/' + i + '_' + j + '.png');
    }
  }

  this.loader
  .load(this._texturesLoaded.bind(this));
};

Critter.prototype._texturesLoaded = function(loader, resources) {
  for (var i = 0; i < 6; i++) {
    this.textures[i] = [];
    for (var j = 0; j < this.data.header.frames_per_direction; j++) {
      this.textures[i][j] = resources[this.name + '_' + i + '_' + j].texture
    }
  }

  this.sprite = new PIXI.Sprite(this.textures[this.direction][this.animation.fnum]);
  this.sprite.anchor.set(0.5, 1.0);
  this.xy(this._x, this._y);

  this._callback(this);
};

Critter.prototype.texture = function(fnum) {
  this.sprite.texture = this.textures[this.direction][fnum];
};

Critter.prototype.xy = function(x, y) {
  this.sprite.position.set(x, y);
};