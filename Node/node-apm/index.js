const http = require("http");

async function task (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function computeTerm(term) {
    return computeTerm[term] || (computeTerm[term] = compute());
    function compute() {
        return Buffer.alloc(1e3);
    }
}

var theThing = null;
var replaceThing = function () {
    var originalThing = theThing;
    var unused = function () {
        if (originalThing) console.log("hi");
    };
    theThing = {
        longStr: new Array(10000).join("*"),
        someMethod: function () {
            console.log(someMessage);
        },
    };
};

const requestLogs = [];
const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/global":
      requestLogs.push({ url: req.url, array: new Array(10000).join("*") });
      res.end(JSON.stringify(requestLogs));
        break;
    case "/closures":
      replaceThing();
      res.writeHead(200);
      res.end("Hello World");
        break;
    case "/cache":
      res.end(computeTerm(Math.random()));
        break;
    case "/promise":
      task(getRndInteger(100, 20000));
      res.writeHead(200);
      res.end("Hello World");
        break;
    default:
      res.writeHead(404);
      res.end(JSON.stringify({error:"Resource not found"}));
      break
  }
});

server.listen(3000);
console.log("Server listening to port 3000. Press Ctrl+C to stop it.");