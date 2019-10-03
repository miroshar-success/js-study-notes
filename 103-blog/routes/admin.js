const express = require("express");
const router = express.Router();

router.get("/user",(req,res) => {
    res.send("你好");
})

module.exports = router;