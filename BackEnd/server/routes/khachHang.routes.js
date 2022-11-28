const express = require('express')
const router = express.Router()
const khachHangController = require('../controller/KhachHangController')

router.use('/GetList', khachHangController.getList)
router.use('/Search', khachHangController.timKiem)
router.use('/Update', khachHangController.capNhat)
router.use('/Insert', khachHangController.themKh)
router.use('/Delete', khachHangController.xoaKh)
router.use('/Infor', khachHangController.xemKh)
router.use('/Inbody', khachHangController.xemCsInbody)
router.use('/', khachHangController.index)


module.exports = router;