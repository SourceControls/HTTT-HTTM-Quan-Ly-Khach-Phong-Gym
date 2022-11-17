const express = require('express');
const router = express.Router();
const phieuDangKyController = require('../controller/PhieuDangKyController')

router.use('/', phieuDangKyController.index)

module.exports = router