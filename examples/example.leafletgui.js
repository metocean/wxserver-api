// Generated by CoffeeScript 1.8.0
var domain, serverurl;

serverurl = 'http://wx.wxtiles.com/';

domain = 'metoceanview.com';

wxtiles.loadConfiguration(serverurl, domain, function(config) {
  var baselayer, emptyOverlay, field, layer, layers, layersControl, map, _i, _len, _ref;
  map = new L.Map('map', {
    center: new L.LatLng(-37.7772, 175.2756),
    zoom: 6,
    attributionControl: false
  });
  emptyOverlay = L.layerGroup();
  layers = {
    'Base map': emptyOverlay
  };
  _ref = config.fields;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    field = _ref[_i];
    layer = L.wxTileLayer(config, {
      maxZoom: 7,
      maxNativeZoom: 8,
      reuseTiles: true
    });
    layer.setField(field);
    layers[field.description] = layer;
  }
  baselayer = L.tileLayer('http://map{s}.nzapstrike.net/aqua3/{z}/{x}/{y}.png', {
    maxZoom: 8,
    reuseTiles: true
  });
  layersControl = L.control.layers.wxTilesMinimap(layers, {
    collapsed: true,
    backgroundLayer: baselayer
  }).addTo(map);
  baselayer.addTo(map);
  return emptyOverlay.addTo(map);
});
