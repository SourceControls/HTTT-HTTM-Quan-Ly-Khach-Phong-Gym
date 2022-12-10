const express = require('express')
const router = express.Router()
const nhanVienController = require('../controller/NhanVienController')

router.use('/GetList', nhanVienController.getList)
router.use('/Insert', nhanVienController.themNv)
router.use('/Update', nhanVienController.capNhatNv)
router.use('/Search', nhanVienController.timKiemNv)
router.use('/Delete', nhanVienController.xoaNv)
router.use('/', nhanVienController.index)

module.exports = router;