'use strict';

function States() {
  this.hexGrid = true;

  this.tileSep = false;
};

States.prototype.toggleHexGrid = function() {
  this.hexGrid = !this.hexGrid;

  var alpha = this.hexGrid ? 1.0 : 0.0;

  _.each(fe.map.container.children[1].children[0].children, function(hex) {
    hex.alpha = alpha;
  });
  _.each(fe.map.container.children[1].children[1].children, function(hex) {
    hex.alpha = alpha;
  });
};