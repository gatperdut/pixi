'use strict';

var fe;

function main() {
  fe = new FE();
  fe.setup();
  fe.createDelegates();

  fe.crittergallery.initialized.promise().then(
    function() {
      fe.critterholder.addCritter('male', 'HMJMPS', 20, 20);
//      fe.critterholder.addCritter('female', 'HFMAXX', 35, 18);

      fe.critterholder.critters.male.animation.start();
//      fe.critterholder.critters.female.animation.start();

      fe.app.ticker.add(delta => gameloop(delta));

      function gameloop(delta) {
        PIXI.keyboardManager.update();
        PIXI.timerManager.update();
      }
    }
  );
}