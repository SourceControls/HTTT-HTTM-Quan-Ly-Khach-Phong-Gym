const express = require('express');
const router = express.Router();
const thanhToanController = require('../controller/ThanhToanController')


router.use('/Insert', thanhToanController.themPtt)
router.use('/Detail', thanhToanController.xemPtt)
router.use('/', thanhToanController.index)

module.exports = router