'use strict';

Map.prototype._drawAxis = function() {
  var lengthx = 49.5 * this.size.x + 200;
  var lengthy = 40.0 * this.size.y + 200;

  var linex = new PIXI.Graphics();
  linex.lineStyle(3, 0x00FF00);
  linex.moveTo(0, 0);
  linex.lineTo(Math.cos(0.244346) * lengthx, -Math.sin(0.244346) * lengthx);

  var liney = new PIXI.Graphics();
  liney.lineStyle(3, 0x00FF00);
  liney.moveTo(0, 0);
  liney.lineTo(Math.sin(0.925024) * lengthy, Math.cos(0.925024) * lengthy);

  this.container.children[0].addChild(linex);
  this.container.children[0].addChild(liney);
};

Map.prototype._placeTileCoords = function(x, y, w, h) {
  var coord = new PIXI.Text(w + ', ' + h, { fontSize: 14, fill: 0xFFFFFF });
  coord.x = x + 23;
  coord.y = y - 3;

  this.container.children[0].addChild(coord);
};

Map.prototype._placeTileSeparators = function() {
  for (var w = 0; w < this.size.x + 1; w++) {
    var line = new PIXI.Graphics();

    line.lineStyle(3, 0x0000FF);
    var x0 =  48 * w;
    var y0 = -12 * w;
    line.pivot.set(0,0);
    line.moveTo(x0, y0);
    line.lineTo(x0 + 32 * this.size.y, y0 + 24 * this.size.y );

    this.container.children[0].addChild(line);  
  }

  for (var h = 0; h < this.size.y + 1; h++) {
    var line = new PIXI.Graphics();

    line.lineStyle(3, 0x0000FF);
    var x0 =  32 * h;
    var y0 =  24 * h;
    //line.pivot.set(0,0)
    line.moveTo(x0, y0);
    line.lineTo(x0 + 48 * this.size.x, y0 - 12 * this.size.x );

    this.container.children[0].addChild(line);  
  }
};

Map.prototype._placeTiles = function() {
  for (var w = 0; w < this.size.x; w++) {
    for (var h = 0; h < this.size.y; h++) {
      var sprite = new PIXI.Sprite(this.texture.floor);
      sprite.anchor.set(0.0, 0.33);
      sprite.position.set(w * 48 + 32 * h, h * 24 - 12 * w);

      this.container.children[0].addChild(sprite);
      
      //this._placeTileCoords(sprite.position.x, sprite.position.y, w, h);
    }
  }  

  //this._placeTileSeparators();
};