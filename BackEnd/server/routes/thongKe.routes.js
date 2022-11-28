const express = require('express')
const router = express.Router()
const thongKeController = require('../controller/ThongKeController')

router.use('/ThongKeKh', thongKeController.xemThongKeKh)
router.use('/RaVao', thongKeController.xemThongKeRaVao)
router.use('/DoanhThu', thongKeController.xemDoanhThu)
router.use('/', thongKeController.index)


module.exports = router;