'use strict';

function main() {
  FEng.setup();

  function crittercallback(critter) {
    FEng.app.stage.addChild(critter.sprite);
    critter.animation.start();
  }

  var male = new Critter('hmmaxxeb', crittercallback, 96, 96);

  var female = new Critter('hfmaxxgb', crittercallback, 196, 96);

  function mapcallback(map) {
    FEng.app.stage.addChild(map.container);
  }

  var map = new Map(mapcallback);

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