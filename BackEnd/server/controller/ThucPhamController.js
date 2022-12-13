const json = require('../components/json')
const ThucPham = require('../modules/ThucPham')
const DB = require('../components/SqlDb')

class ThucPhamControllers {
    index(req, res) {
        res.send('Thực phẩm bổ sung')
    }

    getList = async (req, res) => {
        const { KEY } = req.body
        let params = [{ name: 'KEY', type: 'Nvarchar(20)', value: KEY }]
        if (!KEY) {
            let rs = await ThucPham.getListThucPham()
            res.send(json(true, rs))
            return
        }
        let rs = await ThucPham.searchThucPham(params)
        if (rs.recordset.length == 0) {
            res.send(json(false, []))
            return
        }
        res.send(json(true, rs.recordset))
    }

    insertTp = async (req, res) => {
        const { TENSP, MOTA, HINHANH } = req.body
        let params = [
            { name: 'TENSP', type: 'NvarChar(50)', value: TENSP },
            { name: 'MOTA', type: 'NvarChar(200)', value: MOTA },
            { name: 'HINHANH', type: 'Char(200)', value: HINHANH },
        ]
        let rs = await ThucPham.insertThucPham(params)
        if (rs.returnValue == 1) {
            res.send(json(true, rs))
            return
        }
        res.send(json(false, rs))
    }

    updateTp = async (req, res) => {
        const { MASP, TENSP, MOTA, HINHANH } = req.body
        let params = [
            { name: 'MASP', type: 'Char(10)', value: MASP },
            { name: 'TENSP', type: 'NvarChar(50)', value: TENSP },
            { name: 'MOTA', type: 'NvarChar(200)', value: MOTA },
            { name: 'HINHANH', type: 'Char(200)', value: HINHANH },
        ]
        let rs = await ThucPham.updateThucPham(params)
        if (rs.returnValue == 1) {
            res.send(json(true, rs))
            return
        }
        res.send(json(false, rs))
    }

    deleteTp = async (req, res) => {
        const { MASP } = req.body
        let masp = await DB.query(`SELECT * FROM LichSuMuaHang WHERE MASP = '${MASP}'`)
        if (masp.length > 0) {
            res.send(json(false, 'Sản phẩm đã có trong lịch sử mua hàng. Không thể xóa !!!'))
            return
        }
        let params = [{ name: 'MASP', type: 'Char(10)', value: MASP }]
        let rs = await ThucPham.deleteThucPham(params)
        if (rs.returnValue == 1) {
            res.send(json(true, rs))
            return
        }
        res.send(json(false, rs))
    }

}

module.exports = new ThucPhamControllers