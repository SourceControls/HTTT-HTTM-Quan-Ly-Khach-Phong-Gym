const express = require('express')
const router = express.Router()
const khachHangController = require('../controller/KhachHangController')

router.use('/GetList', khachHangController.getList)
router.use('/', khachHangController.index)


module.exports = router;