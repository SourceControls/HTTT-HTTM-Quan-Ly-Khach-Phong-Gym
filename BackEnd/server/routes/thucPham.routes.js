const express = require('express')
const router = express.Router()
const thucPhamController = require('../controller/ThucPhamController')

router.use('/GetList', thucPhamController.getList)
router.use('/Insert', thucPhamController.insertTp)
router.use('/Update', thucPhamController.updateTp)
router.use('/Delete', thucPhamController.deleteTp)
router.use('/GetListMachineLearning', thucPhamController.getListMachineLearning)
router.use('/', thucPhamController.index)

module.exports = router;