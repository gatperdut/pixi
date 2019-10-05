'use strict';

function FE() {
  this.app = new PIXI.Application({
    width:  1200,
    height: 1024,
    backgroundColor: 0xFFFFFF,
    resolution: 1
  });

  this.container = new PIXI.Container();
}

FE.prototype._resize = function() {
  this.app.renderer.resize(window.innerWidth, window.innerHeight);
};

FE.prototype.setup = function() {
  this.app.view.addEventListener('contextmenu', function(event) {
    event.preventDefault();
  });

  document.body.appendChild(this.app.view);

  this.app.stage.addChild(this.container);

  this.app.renderer.view.style.position = 'absolute';
  this.app.renderer.view.style.display = 'block';
  this.app.renderer.autoDensity = true;

  $(window).resize(this._resize.bind(this));

  this._resize();
};

FE.prototype.createDelegates = function() {
  this.critterholder = new CritterHolder();
  this.map = new Map(this._mapcallback.bind(this));
  this.utils = new Utils();
  this.kb = new Keyboard();
};

FE.prototype._mapcallback = function() {
  this.container.addChild(this.map.container);
};