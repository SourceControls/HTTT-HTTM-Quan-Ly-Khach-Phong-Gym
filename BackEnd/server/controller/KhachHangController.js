const json = require('../components/json')
const KhachHang = require('../modules/KhachHang')

class KhachHangControllers {
    index(req, res) {
        res.send('Khach Hang')
    }
    getList = async (req, res) => {
        const KEY = req.body
        let params = [{name: 'HOTEN', type: 'NVarChar(50)', value: 'Trườ'}]
        if(KEY == '') {
            let rs = await KhachHang.getListKhachHang()
            res.send(json(true, rs))
            return
        } 
        let rs = await KhachHang.searchKhachHang(params)
        if(rs.recordset.length == 0){
            res.send(json(false, 'Không có kết quả phù hợp'))   
            console.log(json(false, 'Không có kết quả phù hợp'))
            return
        }
        res.send(json(true, rs.recordset))
    }

    themKh = async (req, res) => {
        const { HOTEN, GIOITINH, NAMSINH, SDT, HINHANH } = req.body
        let params = [
            {name: 'HOTEN', type: 'NvarChar(10)', value: 'Vũ Việt Trường'},
            {name: 'GIOITINH', type: 'NvarChar(5)', value: 'Nam'},
            {name: 'NAMSINH', type: 'Char(5)', value: '2001'},
            {name: 'SDT', type: 'Char(10)', value: '0392395607'},
            {name: 'HINHANH', type: 'Char(200)', value: 'test'},
        ]
        let rs = await KhachHang.insertKhachHang(params)
        if(rs.returnValue == 1){
            // return json(true, rs)
            res.send(json(false, 'Số điện thoại không hợp lệ'))
        } else if(rs.returnValue == 2){
            res.send(json(false, 'Năm sinh không hợp lệ'))
        }
        else {
            // return json(false, rs)
            res.send(json(true, rs))
        }
    }

    xoaKh = async (req, res) => {
        const { MAKH } = req.body
        let params = [{name: 'MAKH', type: 'Char(10)', value: 'KH00000015'}]
        let rs = await KhachHang.deleteKhachHang(params)
        if(rs.returnValue == 1){
            res.send(json(true, rs))
        } else {
            res.send(json(false, rs))
        }
    }

    capNhat = async (req, res) => {
        const { MAKH, HOTEN, GIOITINH, NAMSINH, SDT, HINHANH } = req.body
        let params = [
            {name: 'MAKH', type: 'Char(10)', value: 'KH00000005'},
            {name: 'HOTEN', type: 'NvarChar(10)', value: 'Vũ Việt Trường 3'},
            {name: 'GIOITINH', type: 'NvarChar(5)', value: 'Nam'},
            {name: 'NAMSINH', type: 'Char(5)', value: '2001'},
            {name: 'SDT', type: 'Char(10)', value: '012345678'},
            {name: 'HINHANH', type: 'Char(200)', value: 'test'},
        ]
        let rs = await KhachHang.updateKhachHang(params)
        if(rs.returnValue == 1){
            // return json(true, rs)
            res.send(json(false, 'Số điện thoại không hợp lệ'))
        } else if(rs.returnValue == 2){
            res.send(json(false, 'Năm sinh không hợp lệ'))
        }
        else {
            // return json(false, rs)
            res.send(json(true, rs))
        }
    }

    timKiem = async (req, res) => {
        const HOTEN = req.body
        let params = [{name: 'HOTEN', type: 'NVarChar(50)', value: 'Trườ'}]
        if(HOTEN == '') {
            let rs = await KhachHang.getListKhachHang()
            res.send(json(true, rs))
            return
        } 
        let rs = await KhachHang.searchKhachHang(params)
        if(rs.recordset.length == 0){
            res.send(json(false, 'Không có kết quả phù hợp'))   
            console.log(json(false, 'Không có kết quả phù hợp'))
            return
        }
        res.send(json(true, rs.recordset))
    }

    xemKh = async (req, res) => {
        const MAKH = req.body
        let params = [{name: 'MAKH', type: 'Char(10)', value: 'KH00000005'}]
        let rs = await KhachHang.selectKhachHang(params)
        res.send(json(true, rs.recordset))
    }

    xemCsInbody = async (req, res) => {
        const MAKH = req.body
        let params = [{name: 'MAKH', type: 'Char(10)', value: 'KH00000005'}]
        let rs = await KhachHang.selectInbodyKhachHang(params)
        res.send(json(true, rs.recordset))
    }

    xemLichSu = async (req, res) => {
        const HOTEN = 'a'
        let params = [{name: 'HOTEN', type: 'NVarChar(50)', value: 'Trườ'}]
        if(HOTEN == '') {
            let rs = await KhachHang.lichSuVaoPhong()
            res.send(json(true, rs))
            return
        }
        let rs = await KhachHang.timKiemLichSu(params)
        if(rs.recordset.length == 0){
            res.send(json(false, 'Không có kết quả phù hợp'))   
            console.log(json(false, 'Không có kết quả phù hợp'))
            return
        }
        res.send(json(true, rs.recordset))

    }

    chiTietLichSu = async (req, res) => {
        const { STT } = req.body
        let params = [{name: 'STT', type: 'Int', value: 5}]
        let rs = await KhachHang.chiTietLichSu(params)
        res.send(json(true, rs.recordset))
    }

    
}

module.exports = new KhachHangControllers