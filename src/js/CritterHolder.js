'use strict';

function CritterHolder() {
  this.critters = {};
}

CritterHolder.prototype._crittercallback = function(name, w, h, critter) {
  fe.map.container.children[2].addChild(critter.sprite);
  this.critters[name].place(w, h);
  //critter.animation.start();
};

CritterHolder.prototype.addCritter = function(name, type, w, h) {
  if (this.critters[name]) {
    console.error('A critter with name ' + name + ' already exists.');
    return;
  }

  this.critters[name] = new Critter(name, type, this._crittercallback.bind(this, name, w, h));
};