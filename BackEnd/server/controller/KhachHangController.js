const json = require('../components/json')
const DB = require('../components/SqlDB')

class KhachHangControllers {
    index(req, res) {
        res.send('Khach Hang')
    }
    getList = async (req, res) => {
        let rs = await DB.query('select * from V_KHACHHANG')
        res.send(json(true, rs))
    }

    themKh = async (req, res) => {
        const { hoTen, gioiTinh, namSinh, sdt, hinhAnh } = req.body
        let params = [
            {name: 'HOTEN', type: 'NvarChar(10)', value: hoTen},
            {name: 'GIOITINH', type: 'NvarChar(5)', value: gioiTinh},
            {name: 'NAMSINH', type: 'Char(5)', value: namSinh},
            {name: 'SDT', type: 'Char(10)', value: sdt},
            {name: 'HINHANH', type: 'Char(200)', value: hinhAnh},
        ]
        let rs = await DB.excute('SP_THEM_KHACH_HANG', params)
        if(rs.rowsAffected > 0){
            // return json(true, rs)
            res.send(json(true, rs))
        } else {
            // return json(false, rs)
            res.send(json(false, rs))
        }
    }

    xoaKh = async (req, res) => {
        const { maKh } = req.body
        let params = [{name: 'MAKH', type: 'Char(10)', value: 'KH00000004'}]
        let rs = await DB.excute('SP_XOA_KHACH_HANG', params)
        if(rs.rowsAffected > 0){
            res.send(json(true, rs))
        } else {
            res.send(json(false, rs))
        }
    }

    capNhat = async (req, res) => {
        const { maKh, hoTen, gioiTinh, namSinh, sdt, hinhAnh } = req.body
        let params = [
            {name: 'MAKH', type: 'Char(10)', value: 'KH00000005'},
            {name: 'HOTEN', type: 'NvarChar(10)', value: 'Vũ Việt Trường 3'},
            {name: 'GIOITINH', type: 'NvarChar(5)', value: 'Nam'},
            {name: 'NAMSINH', type: 'Char(5)', value: '2001'},
            {name: 'SDT', type: 'Char(10)', value: '012345678'},
            {name: 'HINHANH', type: 'Char(200)', value: 'test'},
        ]
        let rs = await DB.excute('SP_CAP_NHAT_KHACH_HANG', params)
        if(rs.rowsAffected > 0){
            res.send(json(true, rs))
        } else {
            res.send(json(false, rs))
        }
    }

    timKiem = async (req, res) => {
        const hoTen = req.body
        let params = [{name: 'HOTEN', type: 'NVarChar(50)', value: 'Tr'}]
        let rs = await DB.excute('SP_TIM_KIEM_KHACH_HANG', params)
        if(rs.recordset.length == 0){
            res.send(json(false, rs))   
            return json(false, 'Không có kết quả phù hợp')
        }
        res.send(json(true, rs.recordset))
    }

    xemKh = async (req, res) => {
        let params = [{name: 'MAKH', type: 'Char(10)', value: 'KH00000005'}]
        let rs = await DB.excute('SP_XEM_KHACH_HANG', params)
        res.send(json(true, rs.recordset))
    }

    xemCsInbody = async (req, res) => {
        const maKh = req.body
        let params = [{name: 'MAKH', type: 'Char(10)', value: 'KH00000005'}]
        let rs = await DB.excute('XEM_CHI_SO_INBODY', params)
        res.send(json(true, rs.recordset))
    }
}

module.exports = new KhachHangControllers