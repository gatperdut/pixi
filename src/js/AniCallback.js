'use strict';

function AniCallback(callback, data, type, animation) {
  this.callback = callback;
  this.data = data;
  this.type = type;
  this.animation = animation;

  this.animation.addListener(this);
}

AniCallback.prototype.cancel = function() {
  this.animation.remListener(this)
};

AniCallback.prototype.call = function() {
  this.callback(this.data);
};