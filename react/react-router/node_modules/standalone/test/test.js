var standalone = require('../standalone');
require('termcolor').define;
var assert = require('assert');
var vows = require('vows');
// vows.describe('== TESTING CRUD ==').addBatch({
//   "init" : {
//     topic: function() {
//       console.log("init")
//       standalone(__dirname + "/model/no1.js", this.callback, true);
//     },
// 
//     "is proxy": function(proxy, a) {
//       console.log(proxy)
//     },
// 
//     "add3" : {
//       topic : function(proxy, a) {
//         console.log("fa");
//         console.log(proxy)
//         proxy.add3(4, this.callback);
//       },
// 
//       "is 7": function(e, v) {
//         assert.isNull(e);
//         assert.equal(v, 7);
//       }
//     }
//   }
// }).export(module);
//

var master = standalone(__dirname + "/model/no1.js", function(obj) {
  obj.add3(5, function(e, v) {
    assert.equal(v, 8);
    console.green("add3 OK", v)
  });

  obj.add(5, 13, function(e, v) {
    assert.equal(v, 18);
    console.green("add OK", v)
  });

  obj.add(5, function(e, v) {
    assert.match(e.message, /v2 is null/);
    assert.isUndefined(v);
    console.green("invalid arg OK")
    master.closeWorker(function(e, msg) {
    assert.isNull(e);
    assert.equal(msg, "CLOSING");
    console.green("closeWorker OK")
    });
  });
}, true);

var master2 = standalone(__dirname + "/model/rel.js", function(obj) {
  obj.initFlag(function(e, v) {
    assert.isFalse(v)
    console.green("initFlag is false");
  });
  obj.init();

  obj.initFlag(function(e, v) {
    assert.isTrue(v)
    console.green("initFlag is true after initialization");
  });

  obj.searchArtists("mat", function(e, artists) {
    assert.lengthOf(artists, 1);
    console.green("search artists : OK");
  });

  obj.getAristWithSongs(3, function(e, artist) {
    assert.lengthOf(artist.songs, 12);
    console.green("get artist with songs: OK");
    master2.closeWorker();
  });
}, true);
