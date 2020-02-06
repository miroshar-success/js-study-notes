standalone
==========

description
------------
Creates an isolated thread / process in JavaScript (Node.js and modern browsers).

API at a glance
----------------

master.js

    standalone("worker.js", function(obj) {

      obj.getXXXByYYY("YYY", function(err, XXX) {
        console.log(XXX); // "XXX by YYY"
      });
    });


worker.js
    
    var obj = {
      getXXXByYYY : function(YYY) {
        return "XXX" + " by " + YYY;
      }
    };

    standalone(obj);

In master.js, we can use "getXXXByYYY" asynchronously, while the originally defined API is synchronous.

In Node.js, **standalone** spawns a child process.

In browsers, **standalone** creates a WebWorker instance.

Installation
------------

    $ npm install standalone

In browsers, 

    <script type="text/javascript" src="/path/to/standalone.js"></script>

Then the variable "standalone" is set to global.

In worker.js (when running in Web Worker),

    importScripts('/path/to/standalone.js');

can import the variable.


In Node.js,

    var standalone = require('standalone');


API documentation
------------------

### standalone(filename, callback, debugMode) ###
Creates a worker from **filename**.
**callback** is called after the target object is created.

**callback** is passed one argument. The target object which has asynchronous APIs.

master.js

    var master = standalone("worker.js", function(obj) {
      obj.add(123, 456, function(e, v) {
        // e: null if no error, error object if error occurred.
        // v: result
      });
    })

if **debugMode** is true, verbose logs appear in console.

Returns master object.

### standalone(obj, debugMode) ###

Set an object **obj** to create asynchronous APIs from.


worker.js

    var worker = standalone({
      add : function(a, b) { return a + b },
      sub : function(a, b) { return a - b }
    });

if **debugMode** is true, verbose logs appear in console.

Returns worker object.

### master.closeWorker(callback) ###
Closes the worker instance.

**callback** is called after **worker.onClose** is executed.

    master.closeWorker(function(e, msg) {
      // e: null if no error, error object if error occurred.
      // v: the value worker.onClose() returned.
    });


### worker.onClose ###
Function to be called before closing.

    worker.onClose = function() {
      db.save();
      return 1;
    };

The returned value is passed to the callback function in **master.closeWorker(callback)**


LICENSE
-------
(The MIT License)

Copyright (c) 2012 SHIN Suzuki <shinout310@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
