const express = require('express')
const router = express.Router()
const lichSuController = require('../controller/LichSuVaoPhongController')

router.use('/GetList', lichSuController.xemLichSu)
router.use('/Detail', lichSuController.chiTietLichSu)
router.use('/', lichSuController.index)


module.exports = router;