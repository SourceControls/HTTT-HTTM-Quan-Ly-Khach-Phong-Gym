const json = require("../components/json")
const DB = require("../components/SqlDB")

class PhieuDangKyControllers {
    index(req, res) {
        res.send("Phiếu đăng ký")
    }

    getList = async (req, res) => {
        let rs = await DB.query('select * from V_PHIEUDK')
        res.send(json(true, rs))
    }

    themPhieu = async (req, res) => {
        const { tiLe, tongTien, maKh, maNv, maDv} = req.body
        let params = [
        {name: 'TILEKM', type: 'Int', value: 10},
        {name: 'TONGTIEN', type: 'Money', value: '300000'},
        {name: 'MAKH', type: 'Char(10)', value: 'KH00000005'},
        {name: 'MANVLAP', type: 'Char(10)', value: 'NV01'},
        {name: 'MADV', type: 'Char(10)', value: 'DV01'}
    ]
    let rs = await DB.excute('SP_DANG_KY_DICH_VU', params)
    res.send(json(true, rs))
    }
}

module.exports = new PhieuDangKyControllers