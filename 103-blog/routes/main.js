const express = require("express");
const router = express.Router();
// 渲染首页
router.get("/",(req,res)=>{
    res.render("main/index");
});

module.exports = router;