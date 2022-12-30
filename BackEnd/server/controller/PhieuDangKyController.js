const json = require("../components/json")
const PhieuDangKy = require('../modules/PhieuDangKy')

class PhieuDangKyControllers {
    index(req, res) {
        res.send("Phiếu đăng ký")
    }

    getList = async (req, res) => {
        const { KEY } = req.body
        let params = [{ name: 'KEY', type: 'Nvarchar(20)', value: KEY }]
        if (KEY == '') {
            let rs = await PhieuDangKy.getListPhieuDangKy()
            res.send(json(true, rs))
            return
        }
        let rs = await PhieuDangKy.searchPhieuDangKy(params)
        if (rs.recordset.length == 0) {
            res.send(json(false, rs))
            return json(false, [])
        }
        res.send(json(true, rs.recordset))
    }

    themPhieu = async (req, res) => {
        let { TILEKM, TONGTIEN, MAKH, MANV, MADV } = req.body

        let params = [
            { name: 'TILEKM', type: 'Int', value: TILEKM },
            { name: 'TONGTIEN', type: 'Money', value: TONGTIEN },
            { name: 'MAKH', type: 'Char(10)', value: MAKH },
            { name: 'MANVLAP', type: 'Char(10)', value: MANV },
            { name: 'MADV', type: 'Char(10)', value: MADV }
        ]
        console.log(params);
        let rs = await PhieuDangKy.insertPhieuDangKy(params)
        if (rs.returnValue == 0) {
            res.send(json(false, 'Khách hàng đã đăng ký dịch vụ !!!'))
        } else {
            res.send(json(true, rs))
        }
    }

    huyPhieu = async (req, res) => {
        const { MAPDK, MANVHUY } = req.body
        let params = [
            { name: 'MAPDK', type: 'Char(10)', value: MAPDK },
            { name: 'MANVHUY', type: 'Char(10)', value: MANVHUY }
        ]

        let rs = await PhieuDangKy.cancelPhieuDangKy(params)
        if (rs.returnValue == 1) {
            res.send(json(true, rs))
        } else {
            res.send(json(false, 'Phiếu đã kích hoạt hoặc đã hủy !!!'))
        }
    }

    timKiem = async (req, res) => {
        const MAPDK = req.body
        let params = [{ name: 'MAPDK', type: 'Char(10)', value: MAPDK }]
        let rs = await DB.excute('SP_TIM_KIEM_PHIEU_DANG_KY', params)
        if (rs.recordset.length == 0) {
            res.send(json(false, rs))
            return json(false, 'Không có kết quả phù hợp')
        }
        res.send(json(true, rs.recordset))
    }

    xemPhieu = async (req, res) => {
        const MAPDK = req.body
        let params = [{
            name: 'MAPDK', type: 'Char(10)', value: MAPDK
        }]
        let rs = await PhieuDangKy.selectPhieuDangKy(params)
        res.send(json(true, rs.recordset))
    }
}

module.exports = new PhieuDangKyControllers