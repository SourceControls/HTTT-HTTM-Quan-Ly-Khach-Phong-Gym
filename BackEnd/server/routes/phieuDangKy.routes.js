const express = require('express');
const router = express.Router();
const phieuDangKyController = require('../controller/PhieuDangKyController')


router.use('/Create', phieuDangKyController.themPhieu)
router.use('/GetList', phieuDangKyController.getList)
router.use('/', phieuDangKyController.index)

module.exports = router