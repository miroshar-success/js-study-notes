const express = require('express');
const router = express.Router();

router.get('/blob',function(req,res){
	res.send('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568648526420&di=2d0002fecf04c971dd8f40709263e0c8&imgtype=0&src=http%3A%2F%2Fp5.qhimg.com%2Ft01ab365a613a630448.jpg')
})

module.exports = router;