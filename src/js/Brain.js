'use strict';

function Brain() {
  this.timer = PIXI.timerManager.createTimer(6000);
  this.timer.loop = true;

  this.timer.on('repeat', this.waltz.bind(this));

  this.timer.start();
}

Brain.prototype.waltz = function() {
  var coord = new PIXI.Point(
    fe.critterholder.critters.female.coord.x + Math.floor(Math.random() * 10 - 5),
    fe.critterholder.critters.female.coord.y + Math.floor(Math.random() * 10 - 5)
  );

  var result = _.find(fe.map.container.children[1].children[0].children, function(hex) {
    return fe.utils.samePoint(coord, hex.coord)
  });
  if (!result) {
    console.log('goto ' + coord.x + ' ' + coord.y + ' but out of bounds.');
  }
  else {
    console.log('goto ' + coord.x + ' ' + coord.y);
    fe.map.pathfinding.findPath(fe.critterholder.critters.female, coord, true);
  }
};