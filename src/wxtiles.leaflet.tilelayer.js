// Generated by CoffeeScript 1.8.0
L.WXTileLayer = L.TileLayer.extend({
  options: {
    minZoom: 0,
    maxZoom: 17,
    tms: true,
    subdomains: 'abc',
    zoomOffset: 0
  },
  setUrl: void 0,
  initialize: function(config, options) {
    var initialkey, key, now, _i, _len, _ref;
    this._config = config;
    this.setField(this._config.fields[0], false);
    if (this._config.key != null) {
      this.setKey(this._config.key);
    } else if (this._config.keyistime) {
      now = new Date();
      initialkey = null;
      _ref = this._config.keys;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        initialkey = key;
        if (key.time > now) {
          break;
        }
      }
      this.setKey(initialkey, false);
    } else {
      this.setKey(this._config.keys[0], false);
    }
    return L.TileLayer.prototype.initialize.call(this, '[wxtiles]/{z}/{x}/{y}.png', options);
  },
  getConfig: function() {
    return this._config;
  },
  setKey: function(key, noRedraw) {
    this._key = key;
    this._config.key = key;
    if ((noRedraw == null) || !noRedraw) {
      this.redraw();
    }
    return this;
  },
  getKey: function() {
    return this._key;
  },
  setField: function(field, noRedraw) {
    this._field = field;
    this.setOpacity(field.defaultalpha);
    if ((noRedraw == null) || !noRedraw) {
      this.redraw();
    }
    return this;
  },
  getField: function() {
    return this._field;
  },
  back: function(noRedraw) {
    var index;
    index = this._config.keys.indexOf(this._key);
    index--;
    index %= this._config.keys.length;
    return this.setKey(this._config.keys[index], noRedraw);
  },
  forward: function(noRedraw) {
    var index;
    index = this._config.keys.indexOf(this._key);
    index++;
    index %= this._config.keys.length;
    return this.setKey(this._config.keys[index], noRedraw);
  },
  getTileUrl: function(coords) {
    return L.TileLayer.prototype.getTileUrl.call(this, coords).replace(/\[wxtiles\]/, "" + this._config.url + "tile/" + this._config.cycle + "/" + this._field.name + "/" + this._key.name);
  }
});

L.wxTileLayer = function(config, options) {
  return new L.WXTileLayer(config, options);
};
