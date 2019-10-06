'use strict';

function CritterHolder() {
  this.critters = {};
}

CritterHolder.prototype.addCritter = function(name, actor, w, h) {
  if (this.critters[name]) {
    console.error('A critter with name ' + name + ' already exists.');
    return;
  }

  this.critters[name] = new Critter(name, actor);
  this.critters[name].place(w, h);
  fe.map.container.children[2].addChild(this.critters[name].sprite);
};