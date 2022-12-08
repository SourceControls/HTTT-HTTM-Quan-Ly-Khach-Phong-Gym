const express = require('express')
const router = express.Router()
const lichSuMuaHangController = require('../controller/LichSuMuaHangController')

router.use('/GetList', lichSuMuaHangController.getList)
router.use('/Insert', lichSuMuaHangController.insert)
router.use('/', lichSuMuaHangController.index)

module.exports = router;