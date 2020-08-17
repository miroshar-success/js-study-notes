var model = {
  add3: function(v) { return v + 3 },
  add : function(v1, v2) { if (v2 == null) {throw new Error("v2 is null")} return v1 + v2 },
  _priv: function() { throw new Error("priv") }
};


var worker = require('../../standalone')(model, true);
worker.onClose = function() {
  return "CLOSING";
};
