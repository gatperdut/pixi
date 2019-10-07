'use strict';

function Map(callback) {
  this.callback    = callback;
  this.loader      = new PIXI.Loader();
  this.texture     = {};
  this.offset      = new PIXI.Point(0, 0);
  this.size        = new PIXI.Point(20, 25);
  this.pathfinding = new PathFinding(this);
  this._setContainers();

  this.panTo(100, 400);

  this._drawAxis();

  this.loader
  .add('plk1000',     'assets/tiles/' + 'PLK1000.FRM' + '/0_0.png')
  .add('hexagon',     'assets/iface/' + 'msef003.frm' + '/0_0.png')
  .add('hexagonsel',  'assets/iface/' + 'MSEF002.FRM' + '/0_0.png')
  .add('hexagonpath', 'assets/iface/' + 'MSEF001.FRM' + '/0_0.png')
  .load(this._textureLoaded.bind(this));
}

Map.prototype._setContainers = function() {
  this.container = new PIXI.Container();

  var tiles = new PIXI.Container();
  this.container.addChild(tiles);

  var hexagons = new PIXI.Container();
  var hexsprites = new PIXI.Container();
  var hexcoords = new PIXI.Container();
  hexagons.addChild(hexsprites);
  hexagons.addChild(hexcoords)
  this.container.addChild(hexagons);

  var critters = new PIXI.Container();
  this.container.addChild(critters);
};

Map.prototype._setContainerPos = function() {
  this.container.position.set(this.offset.x, this.offset.y);
};

Map.prototype.panTo = function(x, y) {
  this.offset.x = x;
  this.offset.y = y;
  this._setContainerPos();
};

Map.prototype.panDir = function(key) {
  var panamount = fe.utils.panamount[key];
  this.offset.x += panamount[0];
  this.offset.y += panamount[1];
  this._setContainerPos();
};

Map.prototype._mouseover = function(data) {
  this.pathfinding.findPath(fe.critterholder.critters.male, data.target.coord, false);
};

Map.prototype._mouseout = function(data) {
  this.pathfinding.clearPath();
};

Map.prototype._mousedown = function(data) {
  this.pathfinding.clearPath();
  this.pathfinding.findPath(fe.critterholder.critters.male, data.target.coord, true);
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
