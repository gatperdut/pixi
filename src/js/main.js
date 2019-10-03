'use strict';

function main() {
  FEng.setup();

  function callback(critter) {
    FEng.app.stage.addChild(critter.container);
    critter.animation.start();
  }

  var male = new Critter('hmmaxxeb', callback, 96, 96);

  var female = new Critter('hfmaxxgb', callback, 196, 96);

  PIXI.keyboardManager.on('pressed', function(key) {
    if (key === PIXI.keyboard.Key.D) {
      male.direction = ++male.direction % 6;
    }
  });

  FEng.app.ticker.add(delta => gameloop(delta));

  function gameloop(delta) {
    PIXI.keyboardManager.update();
  }
}