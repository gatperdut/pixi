'use strict';

var fe;

function main() {
  fe = new FE();
  fe.setup();
  fe.createDelegates();

  fe.crittergallery.initialized.promise().then(
    function() {
      fe.critterholder.addCritter('male', 'HMJMPS', 20, 20);
      //fe.critterholder.addCritter('female', 'HFMAXX', 24, 50);

      fe.app.ticker.add(delta => gameloop(delta));

      function gameloop(delta) {
        PIXI.keyboardManager.update();
      }
    }
  );
}