const express = require('express');
const router = express.Router();

router.get('/player',(req,res) => {
    res.append('Set-Cookie','language=javascript');
    res.cookie('name','jayk',{
        httpOnly:true,
        secure:true,
    });
    res.send('你好');
})

module.exports = router;