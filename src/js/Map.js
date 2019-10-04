'use strict';

function Map(callback) {
  this.callback  = callback;
  this.loader    = new PIXI.Loader();
  this.texture   = {};
  this.container = new PIXI.Container();

  this.container.position.set(100, 400);

  this.loader
  .add('plk1000', 'assets/tiles/' + 'plk1000' + '/0_0.png')
  .add('hexagon', 'assets/iface/' + 'msef003' + '/0_0.png')
  .load(this._textureLoaded.bind(this));
}

Map.prototype._placeTileCoords = function(x, y, w, h) {
  var coord = new PIXI.Text(w + ', ' + h, { fontSize: 14, fill: 0xFFFFFF });
  coord.x = x + 25;
  coord.y = y + 10;

  this.container.addChild(coord);
};

Map.prototype._placeTileSeparators = function() {
  for (var w = 0; w < 25 + 1; w++) {
    var line = new PIXI.Graphics();

    line.lineStyle(3, 0x0000FF);
    var x0 =  48 * w;
    var y0 = -12 * w + 12;
    line.pivot.set(0,0)
    line.moveTo(x0, y0);
    line.lineTo(x0 + 32 * 15, y0 + 24 * 15 );

    this.container.addChild(line);  
  }

  for (var h = 0; h < 15 + 1; h++) {
    var line = new PIXI.Graphics();

    line.lineStyle(3, 0x0000FF);
    var x0 =  32 * h;
    var y0 =  24 * h + 12;
    //line.pivot.set(0,0)
    line.moveTo(x0, y0);
    line.lineTo(x0 + 48 * 25, y0 - 12 * 25 );

    this.container.addChild(line);  
  }
};

Map.prototype._placeTiles = function() {
  for (var w = 0; w < 25; w++) {
    for (var h = 0; h < 15; h++) {
      var sprite = new PIXI.Sprite(this.texture.floor);
      sprite.anchor.set(0.0, 0.0);
      sprite.position.set(w * 48 + 32 * h, h * 24 - 12 * w);

      this.container.addChild(sprite);
      
      //this._placeTileCoords(sprite.position.x, sprite.position.y, w, h);
    }
  }  

  //this._placeTileSeparators();
}

Map.prototype._placeHexagonGrid = function() {
  for (var h = 0; h < 25; h++) {
    for (var w = 0; w < 15; w++) {
      var sprite = new PIXI.Sprite(this.texture.hexagon);
      sprite.anchor.set(0.0, 0.0);
      sprite.position.set(w * 48 + 32 * h, h * 24 - 12 * w);

      this.container.addChild(sprite);
    }
  }  
}

Map.prototype._textureLoaded = function(loader, resources) {
  this.texture.floor   = resources['plk1000'].texture;
  this.texture.hexagon = resources['hexagon'].texture;

  this._placeTiles();

  this._placeHexagonGrid();

  this.callback(this);
};
