const express = require('express')
const router = express.Router()
const dichVuController = require('../controller/DichVuController')

router.use('/GetList', dichVuController.getList)
router.use('/Insert', dichVuController.themDv)
router.use('/Update', dichVuController.capNhatDv)
router.use('/Delete', dichVuController.xoaDv)
router.use('/Search', dichVuController.timKiemDv)
router.use('/', dichVuController.index)

module.exports = router;