'use strict';

function CritterGallery() {
  this.initialized = $.Deferred();

  this.actors = [
    'HFMAXX',
    'HMMAXX'
  ];

  this.actions = [
    'AA',
    'AB'
  ];

  this.list = {};

  this.loader = new PIXI.Loader();

  this._setup();
}

CritterGallery.prototype._setup = function() {
  var self = this;

  var promises = [];

  _.each(self.actors, function(actor) {
    self.list[actor] = {};
    _.each(self.actions, function(action) {
      self.list[actor][action] = {
        data: null,
        textures: []
      };
      promises.push(
        $.getJSON('assets/critters/' + actor + action + '.FRM/data.json').promise()
      );
    });
  });

  $.when.apply($, promises).done(this._loadTextures.bind(this));
};

CritterGallery.prototype._loadTextures = function() {
  var self = this;

  var responses = arguments;

  _.each(responses, function(response) {
    var json = response[0];

    self.list[json.actor][json.action].data = json;

    for (var direction = 0; direction < 6; direction++) {
      for (var j = 0; j < json.header.frames_per_direction; j++) {
        self.loader
        .add(json.name + '_' + direction + '_' + j, 'assets/critters/' + json.name + '/' + direction + '_' + j + '.png');
      }
    }
  });

  this.loader
  .load(this._texturesLoaded.bind(this));
};

CritterGallery.prototype._texturesLoaded = function(loader, resources) {
  var self = this;

  _.each(self.actors, function(actor) {
    _.each(self.actions, function(action) {
      for (var direction = 0; direction < 6; direction++) {
        self.list[actor][action].textures[direction] = [];
        for (var fnum = 0; fnum < self.list[actor][action].data.header.frames_per_direction; fnum++) {
          self.list[actor][action].textures[direction].push(
            resources[actor + action + '.FRM_' + direction + '_' + fnum].texture
          );
        }
      }
    });
  });

  console.log("CritterGallery - initialized.");
  this.initialized.resolve();
};