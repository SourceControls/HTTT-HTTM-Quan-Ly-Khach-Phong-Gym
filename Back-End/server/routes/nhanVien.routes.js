const express = require('express')
const router = express.Router()
const nhanVienController = require('../controller/NhanVienController')

router.use('/', nhanVienController.index)

module.exports = router;