const express = require('express');
const router = express.Router();
const calculator = require('../controller/calculator.js');
router.get('/:number',calculator);

module.exports = router;