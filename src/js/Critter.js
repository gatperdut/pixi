'use strict';

function Critter(name, callback, x, y) {
  var self = this;

  this.name      = name;
  this.data      = null;
  this.container = new PIXI.Container();
  this.textures  = [];
  this.sprite    = null
  this.direction = 0;

  this.animation = new Animation(this);

  var loader = new PIXI.Loader();

  loader
  .add('data', 'assets/critters/' + name + '/data.json')
  .load(_dataLoaded);

  function _dataLoaded(loader, resources) {
    self.data = resources.data.data;
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < self.data.frames_per_direction; j++) {
        loader
        .add(name + '_' + i + '_' + j, 'assets/critters/' + name + '/' + i + '_' + j + '.png');
      }
    }

    loader
    .load(_texturesLoaded);
  }

  function _texturesLoaded(loader, resources) {
    for (var i = 0; i < 6; i++) {
      self.textures[i] = [];
      for (var j = 0; j < self.data.frames_per_direction; j++) {
        self.textures[i][j] = resources[self.name + '_' + i + '_' + j].texture
      }
    }

    self.sprite = new PIXI.Sprite(self.textures[self.direction][self.animation.fnum]);
    self.sprite.anchor.set(0.5, 1.0);

    self.container.addChild(self.sprite);

    self.container.position.set(x, y);

    callback(self);
  }
}

Critter.prototype.texture = function(fnum) {
  this.sprite.texture = this.textures[this.direction][fnum];
};