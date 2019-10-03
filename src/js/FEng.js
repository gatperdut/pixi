'use strict';

var FEng = {
  app: new PIXI.Application({
    width:  1200,
    height: 1024,
    backgroundColor: 0x1099bb,
    resolution: 1
  }),
  container: new PIXI.Container(),
  _resize: function() {
    FEng.app.renderer.resize(window.innerWidth, window.innerHeight);
  },
  setup: function() {
    document.body.appendChild(FEng.app.view);

    FEng.app.stage.addChild(FEng.container);

    FEng.app.renderer.view.style.position = "absolute";
    FEng.app.renderer.view.style.display = "block";
    FEng.app.renderer.autoDensity = true;

    $(window).resize(FEng._resize);

    FEng._resize();
  }
}