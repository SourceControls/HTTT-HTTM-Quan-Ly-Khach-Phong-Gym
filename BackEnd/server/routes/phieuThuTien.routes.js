const express = require('express');
const router = express.Router();
const phieuThuTienController = require('../controller/PhieuThuTienController')


router.use('/Insert', phieuThuTienController.themPtt)
router.use('/Detail', phieuThuTienController.xemPtt)
router.use('/', phieuThuTienController.index)

module.exports = router