'use strict';

function Map(callback) {
  this.callback  = callback;
  this.loader    = new PIXI.Loader();
  this.texture   = null;
  this.container = new PIXI.Container();

  this.loader
  .add('plk1000', 'assets/tiles/' + 'plk1000' + '/0_0.png')
  .load(this._textureLoaded.bind(this));
}

Map.prototype._textureLoaded = function(loader, resources) {
  this.texture = resources['plk1000'].texture;

  for (var h = 0; h < 20; h++) {
    for (var w = 0; w < 20; w++) {
      var sprite = new PIXI.Sprite(this.texture);
      sprite.anchor.set(0.0, 0.0);
      sprite.position.set(w * 48 + 32 * h, h * 24 - 12 * w);

      this.container.addChild(sprite);
    }
  }

  this.callback(this);
};
