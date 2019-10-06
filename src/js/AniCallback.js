'use strict';

function AniCallback(callback) {
  this.callback = callback;
}

AniCallback.prototype.call = function() {
  this.callback();
};