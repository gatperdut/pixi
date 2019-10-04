'use strict';

function Map(callback) {
  this.callback  = callback;
  this.loader    = new PIXI.Loader();
  this.texture   = {};
  this.container = new PIXI.Container();
  this.offset    = new PIXI.Point(-100, 400);
  this.size      = new PIXI.Point(20, 20);

  this.container.position.set(this.offset.x, this.offset.y);

  this._drawAxis();

  this.loader
  .add('plk1000', 'assets/tiles/' + 'plk1000' + '/0_0.png')
  .add('hexagon', 'assets/iface/' + 'msef003' + '/0_0.png')
  .load(this._textureLoaded.bind(this));
}

Map.prototype._drawAxis = function() {
  var linex = new PIXI.Graphics();
  linex.lineStyle(3, 0x00FF00);
  linex.moveTo(0, 0);
  linex.lineTo(2000, -500);

  var liney = new PIXI.Graphics();
  liney.lineStyle(3, 0x00FF00);
  liney.moveTo(0, 0);
  liney.lineTo(2000, 1500);

  this.container.addChild(linex);
  this.container.addChild(liney);
};

Map.prototype._placeTileCoords = function(x, y, w, h) {
  var coord = new PIXI.Text(w + ', ' + h, { fontSize: 14, fill: 0xFFFFFF });
  coord.x = x + 23;
  coord.y = y - 3;

  this.container.addChild(coord);
};

Map.prototype._placeTileSeparators = function() {
  for (var w = 0; w < this.size.x + 1; w++) {
    var line = new PIXI.Graphics();

    line.lineStyle(3, 0x0000FF);
    var x0 =  48 * w;
    var y0 = -12 * w;
    line.pivot.set(0,0)
    line.moveTo(x0, y0);
    line.lineTo(x0 + 32 * this.size.y, y0 + 24 * this.size.y );

    this.container.addChild(line);  
  }

  for (var h = 0; h < this.size.y + 1; h++) {
    var line = new PIXI.Graphics();

    line.lineStyle(3, 0x0000FF);
    var x0 =  32 * h;
    var y0 =  24 * h;
    //line.pivot.set(0,0)
    line.moveTo(x0, y0);
    line.lineTo(x0 + 48 * this.size.x, y0 - 12 * this.size.x );

    this.container.addChild(line);  
  }
};

Map.prototype._placeTiles = function() {
  for (var w = 0; w < this.size.x; w++) {
    for (var h = 0; h < this.size.y; h++) {
      var sprite = new PIXI.Sprite(this.texture.floor);
      sprite.anchor.set(0.0, 0.33);
      sprite.position.set(w * 48 + 32 * h, h * 24 - 12 * w);

      this.container.addChild(sprite);
      
      //this._placeTileCoords(sprite.position.x, sprite.position.y, w, h);
    }
  }  

  this._placeTileSeparators();
};

Map.prototype._placeHexagonCoords = function(x, y, w, h) {
  var coord = new PIXI.Text(w + ', ' + h, { fontSize: 9, fill: 0xFFFFFF });
  coord.x = x - 12;
  coord.y = y - 7;

  this.container.addChild(coord);
};

Map.prototype._hexagonWithinMap = function(position) {
  var tan14 = Math.tan(FEng.utils.deg2rad(14));
  var tan53 = Math.tan(FEng.utils.deg2rad(53))
  //north
  if (position.y < -tan14 * position.x) {
    return false;
  }
  // east
  if (position.x + 0 > tan53 * position.y + tan53 * this.size.x * 48) {
    return false;
  }
  // south
  if (position.y + 15 > tan53 * this.size.y * 24 + 12 - tan14 * position.x) {
    return false;
  }
  // west
  if (position.x - 10 < tan53 * position.y) {
    return false;
  }
   return true;
};

Map.prototype._placeHexagonGrid = function() {
  var top = Math.max(this.size.x, this.size.y) * 3 + 1;
  for (var w = 0; w < top; w++) {
    for (var h = 0; h < top; h++) {
      var position = new PIXI.Point(w * 16 + 16 * h, h * 12 - 12 * w);
      if (!this._hexagonWithinMap(position)) {
        continue;
      }
      var sprite = new PIXI.Sprite(this.texture.hexagon);
      sprite.anchor.set(0.5, 0.5);
      sprite.position.set(position.x, position.y);

      this.container.addChild(sprite);

      //this._placeHexagonCoords(position.x, position.y, w, h);
    }
  }  
};

Map.prototype._textureLoaded = function(loader, resources) {
  this.texture.floor   = resources['plk1000'].texture;
  this.texture.hexagon = resources['hexagon'].texture;

  this._placeTiles();

  this._placeHexagonGrid();

  this.callback(this);
};
