'use strict';

Map.prototype._placeHexagonCoords = function(x, y, w, h) {
  var coord = new PIXI.Text(w + ', ' + h, { fontSize: 9, fill: 0xFFFFFF });
  coord.alpha = fe.states.hexGrid ? 1.0 : 0.0;
  coord.x = x - 12;
  coord.y = y - 7;

  this.container.children[1].children[1].addChild(coord);
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

Map.prototype._placeHexagonGrid = function() {
  var top = Math.max(this.size.x, this.size.y) * 3 + 1;
  for (var x = 0; x < top; x++) {
    for (var y = 0; y < top; y++) {
      var hexpos = new PIXI.Point(x * 16 + 16 * y, y * 12 - 12 * x);
      if (!this._hexagonWithinMap(hexpos)) {
        this.pathfinding.fillPathMap(x, y, 1, null);
        continue;
      }

      var sprite = new PIXI.Sprite(this.texture.hexagon);
      sprite.alpha = fe.states.hexGrid ? 1.0 : 0.0;
      sprite.anchor.set(0.5, 0.5);
      sprite.position.set(hexpos.x, hexpos.y);
      sprite.coord = {
        x: x,
        y: y
      };

      sprite.interactive = true;
      sprite.mouseover = this._mouseover.bind(this);
      sprite.mouseout  = this._mouseout.bind(this);
      sprite.mousedown = this._mousedown.bind(this);

      this.container.children[1].children[0].addChild(sprite);

      this._placeHexagonCoords(hexpos.x, hexpos.y, x, y);

      this.pathfinding.fillPathMap(x, y, 0, sprite);
    }
  }  
};