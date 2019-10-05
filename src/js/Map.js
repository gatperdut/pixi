'use strict';

function Map(callback) {
  this.callback    = callback;
  this.loader      = new PIXI.Loader();
  this.texture     = {};
  this.offset      = new PIXI.Point(0, 0);
  this.size        = new PIXI.Point(20, 25);
  this.pathfinding = new PathFinding(this);
  this._setContainers();

  this.panto(100, 400);

  this._drawAxis();

  this.loader
  .add('plk1000',     'assets/tiles/' + 'plk1000' + '/0_0.png')
  .add('hexagon',     'assets/iface/' + 'msef003' + '/0_0.png')
  .add('hexagonsel',  'assets/iface/' + 'msef002' + '/0_0.png')
  .add('hexagonpath', 'assets/iface/' + 'msef001' + '/0_0.png')
  .load(this._textureLoaded.bind(this));
}

Map.prototype._setContainers = function() {
  this.container = new PIXI.Container();

  var tiles = new PIXI.Container();
  this.container.addChild(tiles);

  var hexagons = new PIXI.Container();
  this.container.addChild(hexagons);

  var critters = new PIXI.Container();
  this.container.addChild(critters);
};

Map.prototype.setContainerPos = function() {
  this.container.position.set(this.offset.x, this.offset.y);
};

Map.prototype.panto = function(x, y) {
  this.offset.x = x;
  this.offset.y = y;
  this.setContainerPos();
};

Map.prototype.pandir = function(key) {
  var panamount = fe.utils.panamount[key];
  this.offset.x += panamount[0];
  this.offset.y += panamount[1];
  this.setContainerPos();
};

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

  this._placeTileSeparators();
};

Map.prototype._placeHexagonCoords = function(x, y, w, h) {
  var coord = new PIXI.Text(w + ', ' + h, { fontSize: 9, fill: 0xFFFFFF });
  coord.x = x - 12;
  coord.y = y - 7;

  this.container.children[1].addChild(coord);
};

Map.prototype._hexagonWithinMap = function(position) {
  var tan14 = Math.tan(fe.utils.deg2rad(14));
  var tan53 = Math.tan(fe.utils.deg2rad(53));
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

Map.prototype._mouseover = function(data) {
  data.target.texture = this.texture.hexagonsel;
};

Map.prototype._mouseout = function(data) {
  data.currentTarget.texture = this.texture.hexagon;
};


Map.prototype._mousedown = function(data) {
  this.pathfinding.findPath(data);
};

Map.prototype._placeHexagonGrid = function() {
  var top = Math.max(this.size.x, this.size.y) * 3 + 1;
  for (var w = 0; w < top; w++) {
    for (var h = 1; h < top; h++) {
      var hexpos = new PIXI.Point(w * 16 + 16 * h, h * 12 - 12 * w);
      if (!this._hexagonWithinMap(hexpos)) {
        this.pathfinding.fillPathMap(w, h, 1, null);
        continue;
      }

      var sprite = new PIXI.Sprite(this.texture.hexagon);
      sprite.anchor.set(0.5, 0.5);
      sprite.position.set(hexpos.x, hexpos.y);
      sprite.coord = {
        w: w,
        h: h
      };

      sprite.interactive = true;
      sprite.mouseover = this._mouseover.bind(this);
      sprite.mouseout  = this._mouseout.bind(this);
      sprite.mousedown = this._mousedown.bind(this);

      this.container.children[1].addChild(sprite);

      this._placeHexagonCoords(hexpos.x, hexpos.y, w, h);

      this.pathfinding.fillPathMap(w, h, 0, sprite);
    }
  }  
};

Map.prototype._textureLoaded = function(loader, resources) {
  this.texture.floor       = resources['plk1000'].texture;
  this.texture.hexagon     = resources['hexagon'].texture;
  this.texture.hexagonsel  = resources['hexagonsel'].texture;
  this.texture.hexagonpath = resources['hexagonsel'].texture;

  this._placeTiles();

  this._placeHexagonGrid();

  this.callback(this);
};
