var JSRel = require('jsrel');
var fs = require("fs");

var artists = require(__dirname + '/data/artists');

var db = JSRel.use(__dirname + "/tmp/crud", {
  storage: 'file',
  schema: {
    user : {
      name: true,
      mail: true,
      age : 0,
      is_activated: "on",
      $indexes: "name",
      $uniques: [["name", "mail"]]
    },
    book : {
      title: true,
      ISBN : true,
      ASIN: true,
      price: 1,
      $indexes: "title",
      $uniques: ["ISBN", "ASIN"]
    },
    user_book: {
      u : "user",
      b : "book"
    },
    tag : {
      word: true,
      type: 1,
      is_activated: "on",
      $uniques: "word",
      $classes: ["is_activated", "type"]
    },
    book_tag : {
      b : "book",
      t : "tag"
    },
    artist: {
      name: true
    },
    song  : {
      title: true,
      rate : 1,
      artist: "artist",
      $indexes: "title"
    },

    song_tag: {
      song: "song",
      tag : "tag"
    }
  }
});


var model = {
  initFlag: false,

  init: function() {
    var tagTbl = db.table("tag");
    fs.readFileSync(__dirname + '/data/genes', 'utf8').trim().split("\n").forEach(function(wd, k) {
      tagTbl.ins({word: wd, type: (k%5) +1});
    });

    var artistTbl  = db.table("artist");
    var songTbl    = db.table("song");
    var songTagTbl = db.table("song_tag");
    Object.keys(artists).forEach(function(name) {
      var artist = artistTbl.ins({name: name});
      artists[name].forEach(function(song) {
        var song = songTbl.ins({ title: song[1], rate: song[0], artist: artist });
        songTagTbl.ins({song: song, tag_id : song.id * 2 });
        songTagTbl.ins({song: song, tag_id : song.id * 3 });
        songTagTbl.ins({song: song, tag_id : song.id * 5 });
      });
    });
    this.initFlag = true;
    return true;
  },
  
  searchArtists : function(name) {
    if (!this.initFlag) throw new Error("not initialized yet");
    return db.find("artist", {name : {like : name}});
  },

  getAristWithSongs : function(id) {
    if (!this.initFlag) throw new Error("not initialized yet");
    return db.one("artist", {id: id}, { join: { song: {as: "songs"} } });
  }
};

var standalone = require('../../standalone')(model, true);
