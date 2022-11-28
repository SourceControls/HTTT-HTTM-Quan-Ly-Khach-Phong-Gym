const json = require("../components/json")
const PhieuDangKy = require('../modules/PhieuDangKy')

class PhieuDangKyControllers {
    index(req, res) {
        res.send("Phiếu đăng ký")
    }

    getList = async (req, res) => {
        const KEY = req.body
        let params = [{name: 'MAPDK', type: 'Char(10)', value: '0005'}]
        if(KEY == ''){
            let rs = await PhieuDangKy.getListPhieuDangKy()
            res.send(json(true, rs))
            return
        }
        let rs = await DB.excute('SP_TIM_KIEM_PHIEU_DANG_KY', params)
        if(rs.recordset.length == 0){
            res.send(json(false, rs))   
            return json(false, 'Không có kết quả phù hợp')
        }
        res.send(json(true, rs.recordset))
    }

    themPhieu = async (req, res) => {
        const { TILEKM, TONGTIEN, MAKH, MANV, MADV} = req.body
        let params = [
        {name: 'TILEKM', type: 'Int', value: 10},
        {name: 'TONGTIEN', type: 'Money', value: '300000'},
        {name: 'MAKH', type: 'Char(10)', value: 'KH00000014'},
        {name: 'MANVLAP', type: 'Char(10)', value: 'NV00000002'},
        {name: 'MADV', type: 'Char(10)', value: 'DV00000003'}
        ]
        let rs = await PhieuDangKy.insertPhieuDangKy(params)
        if(rs.returnValue == 0) {
            res.send(json(false, 'Khách hàng đã đăng ký dịch vụ !!!'))
        } else {
            res.send(json(true, rs))
        }
    }

    huyPhieu = async (req, res) => {
        const { MAPDK, MANVHUY } = req.body
        let params = [
            {name: 'MAPDK', type: 'Char(10)', value: 'PDK0000006'},
            {name: 'MANVHUY', type: 'Char(10)', value: 'NV00000002'}
        ]

        let rs = await PhieuDangKy.cancelPhieuDangKy(params)
        if(rs.returnValue == 1){
            res.send(json(true, rs))
        } else {
            res.send(json(false, 'Phiếu đã kích hoạt hoặc đã hủy !!!'))
        }
    }

    timKiem = async (req, res) => {
        const MAPDK = req.body
        let params = [{name: 'MAPDK', type: 'Char(10)', value: '0005'}]
        let rs = await DB.excute('SP_TIM_KIEM_PHIEU_DANG_KY', params)
        if(rs.recordset.length == 0){
            res.send(json(false, rs))   
            return json(false, 'Không có kết quả phù hợp')
        }
        res.send(json(true, rs.recordset))
    }

    xemPhieu = async (req, res) => {
        const MAPDK = req.body
        let params = [{name: 'MAPDK', type: 'Char(10)', value: 'PDK0000001'}]
        let rs = await PhieuDangKy.selectPhieuDangKy(params)
        res.send(json(true, rs.recordset))
    }
}

module.exports = new PhieuDangKyControllers