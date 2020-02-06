var standalone = (function() {

  var isNode = typeof exports == "object" && exports === this;

  function standalone(v, fn, de) {
    if (typeof v == "string" && typeof fn == "function") {
      De = !!de;
      return new Mastr(v, fn, de);
    }
    else if (typeof v == "object"){
      de = !!fn;
      De = de;
      return new Workr(v, de);
    }
    else {
      mand(null, "unexpected arguments", v, fn);
    }
  }

  function Mastr(filename, callback, debug) {
    var De = !!debug;
    var worker = Itf.getWorker(filename);
    // mand(require('path').existsSync(filename), filename, "not found");
    De&&bug("filename", filename);
    var proxy = {};
    var methods = {};
    var curId = 1;

    this._worker = worker;
    this._methods = methods;

    Itf.onMessage(worker, function(msg) {
      try {
        De&&bug("worker => master", msg)
        De&&mand(msg && msg.id, "invalid message from worker", msg);
        switch (msg.id) {
        case "init": // get method names
          De&&mand(Array.isArray(msg.props), "invalid props from child in 'init'", msg);
          msg.props.forEach(function(prop) {
            proxy[prop] = function() {
              var args = Array.prototype.slice.call(arguments);
              if (args.length  && typeof args[args.length-1] == "function") {
                var cb = args.pop();
              }
              else {
                cb = noop;
              }
              methods[curId] = cb;
              Itf.send(worker, {id: curId, prop: prop, args: args });
              curId++;
            };
          });
          De&&bug("master: initialized", proxy);
          callback(proxy);
          return;

        case "error": // get primitive error
          De&&bug("error", msg.results[0]);
          return

        case "debug": // if console is undefined
          console.log(msg.args);
          return;

        default:
          De&&mand(msg.id in methods, "unknown id", msg.id);
          De&&mand(Array.isArray(msg.results), "results must be an array");
          if (msg.results[0] != null) {
            msg.results[0] = new Error(msg.results[0]);
          }
          methods[msg.id].apply(null, msg.results);
          delete methods[msg.id];
        }
      }
      catch (e) {
        De&&bug("error", e.stack);
      }
    });
    Itf.send(worker, {id: "init"});
  }


  Mastr.prototype.closeWorker = function(fn) {
    var worker = this._worker;
    var self = this;
    var cb = function(e, r) {
      if (typeof fn == "function") {
        fn.call(self, e, r);
      }
      else if (e) {
        bug(e.stack);
        return;
      }
      Itf.terminateWorker(worker);
    };
    this._methods.close = cb;

    Itf.send(worker, {id: "close"});
  };


  function Workr(obj, de) {
    this.onClose = null;
    var De = !!de;
    var props = [];
    Object.keys(obj).forEach(function(prop) {
      if (prop.charAt(0) == "_") return;
      props.push(prop);
      var val = obj[prop];
    });

    var self = this;

    Itf.workerOnMessage(function(msg) {
      De&&bug("master => worker", msg)
      var id = "error";
      try {
        De&&mand(msg && msg.id, "invalid message from master", msg);
        id = msg.id;
        switch (id) {
        case "init": // get method names
          return Itf.sendToMaster({id: "init", props: props});

        case "close":
          var err = null, result = null;
          try {
            var result = (typeof self.onClose == "function") ? self.onClose() : null;
          }
          catch (e) {
            err = e;
          }
          return Itf.sendToMaster({id: "close", results: [err, result]});

        default:
          De&&mand(typeof msg.id == "number" && msg.id > 0, "invalid message id", msg.id);
          De&&mand(typeof msg.prop == "string" && msg.prop in obj, "invalid prop", msg.prop);
          De&&mand(Array.isArray(msg.args), "invalid args", msg.args);
          var fn, val = obj[msg.prop]
          if (typeof val != "function") fn = function() { return val };
          else fn = val;
          var result = fn.apply(obj, msg.args);
          Itf.sendToMaster({id: id, results: [null, result]});
        }
      }
      catch (e) {
        return Itf.sendToMaster({id: id, results: [e.stack]});
      }
    });
  };

  var bug = (typeof console != "undefined") 
   ? (isNode) ? console.log : function() { console.log(Array.prototype.slice.call(arguments)) }
   : function() {
    var args = Array.prototype.slice.call(arguments);
    postMessage({id: "debug", args: args});
  };

  var noop = function() {};

  var mand = function() {
    var args = Array.prototype.slice.call(arguments);
    var torf = args.shift();
    if (torf) return;
    args.unshift('[standalone]');
    var err = args.join(" ");
    if (!err) err = "(undocumented error)";
    throw new Error(err);
  };


  /**
   * absorb the difference between Node.js and browsers
   *
   * getWorker
   * onMessage
   * send
   * terminateWorker
   * workerOnMessage
   * sendToMaster
   *
   **/
  var Itf = {};

  if (isNode) {
    var child_process  = require('child_process');
    Itf.getWorker = child_process.fork.bind(child_process);
    Itf.onMessage = function(worker, fn) {
      worker.on("message", fn);
    };

    Itf.send = function(worker, msg) {
      worker.send(msg);
    };
    Itf.terminateWorker = function(worker) {
      worker.kill(); 
    };

    Itf.workerOnMessage = function(fn) {
      process.on("message", fn);
    };

    Itf.sendToMaster = process.send ? process.send.bind(process) : null;
  }
  else {
    Itf.getWorker = function(filename) {
      return new Worker(filename);
    };

    Itf.onMessage = function(worker, fn) {
      worker.onmessage = function(evt) {
        fn(evt.data);
      }
    };

    Itf.send = function(worker, msg) {
      worker.postMessage(msg);
    };

    Itf.terminateWorker = function(worker) {
      worker.terminate(); 
    };

    Itf.workerOnMessage = function(fn) {
      onmessage = function(evt) {
        fn(evt.data);
      }
    };

    Itf.sendToMaster = function(msg) {
      postMessage(msg);
    };
  }

  if (isNode) module.exports = standalone;
  return standalone;
}).call(this);
