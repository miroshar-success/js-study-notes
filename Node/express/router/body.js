const express = require('express');
const router = express.Router();

router.post('/login',(req,res) => {
    console.log(req.body);
    res.send('上传成功');
})

module.exports = router;