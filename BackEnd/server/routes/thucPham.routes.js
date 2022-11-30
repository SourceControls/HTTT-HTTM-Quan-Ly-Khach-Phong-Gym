const express = require('express')
const router = express.Router()
const thucPhamController = require('../controller/ThucPhamController')

router.use('/GetList', thucPhamController.getList)
router.use('/', thucPhamController.index)

module.exports = router;