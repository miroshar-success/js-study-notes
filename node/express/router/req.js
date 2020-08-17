const express = require('express');
const router = express.Router();
// request url http://localhost:5000/api/student/123?a=1&b=2
router.get('/student/:number',(req,res) => {
    console.log('req.baseUrl:',req.baseUrl);
    console.log('req.hostname:',req.hostname);
    console.log('req.ip:',req.ip);
    console.log('req.ips:',req.ips);
    console.log('req.method:',req.method);  // GET
    console.log('req.params:',req.params);  // {number:"123"}
    console.log('req.path:',req.path);  // /student/123
    console.log('req.protocol:',req.protocol);  // http
    console.log("req.query:",req.query);    // {a:1,b:2}
    console.log('req.route:',req.route);    // path /student/:number
    res.send('ok')
});

module.exports = router;