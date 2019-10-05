'use strict';

var fe;

function main() {
  fe = new FE();
  fe.setup();
  fe.createDelegates();

  fe.critterholder.addCritter('male', 'hmmaxxeb', 20, 20);
  //fe.critterholder.addCritter('female', 'hfmaxxgb', 24, 50);

  fe.app.ticker.add(delta => gameloop(delta));

  function gameloop(delta) {
    PIXI.keyboardManager.update();
  }
}