const json = require('../components/json')
const KhachHang = require('../modules/KhachHang')

class KhachHangControllers {
    index(req, res) {
        res.send('Khach Hang')
    }
    getList = async (req, res) => {
        const { KEY } = req.body
        let params = [{ name: 'KEY', type: 'NVarChar(20)', value: KEY }]
        if (!KEY) {
            let rs = await KhachHang.getListKhachHang()
            res.send(json(true, rs))
            return
        }
        let rs = await KhachHang.searchKhachHang(params)
        if (rs.recordset.length == 0) {
            res.send(json(false, []))
            return
        }
        console.log("rows selected: " + rs.recordset.length);
        res.send(json(true, rs.recordset))
    }

    themKh = async (req, res) => {
        const { HOTEN, GIOITINH, NAMSINH, SDT, HINHANH } = req.body
        let params = [
            { name: 'HOTEN', type: 'NvarChar(10)', value: HOTEN },
            { name: 'GIOITINH', type: 'NvarChar(5)', value: GIOITINH },
            { name: 'NAMSINH', type: 'Char(5)', value: NAMSINH },
            { name: 'SDT', type: 'Char(10)', value: SDT },
            { name: 'HINHANH', type: 'Char(200)', value: HINHANH },
        ]
        let rs = await KhachHang.insertKhachHang(params)
        if (rs.returnValue == 1) {
            // return json(true, rs)
            res.send(json(false, 'Số điện thoại không hợp lệ'))
        } else if (rs.returnValue == 2) {
            res.send(json(false, 'Năm sinh không hợp lệ'))
        }
        else {
            // return json(false, rs)
            res.send(json(true, rs))
        }
    }

    xoaKh = async (req, res) => {
        const { MAKH } = req.body
        let params = [{ name: 'MAKH', type: 'Char(10)', value: MAKH }]
        let rs = await KhachHang.deleteKhachHang(params)
        if (rs.returnValue == 1) {
            res.send(json(true, rs))
        }
        else {
            res.send(json(false, "Khách đã đăng kí dịch vụ, không thể xóa!"))
        }
    }

    capNhat = async (req, res) => {
        const { MAKH, HOTEN, GIOITINH, NAMSINH, SDT, HINHANH } = req.body

        let params = [
            { name: 'MAKH', type: 'Char(10)', value: MAKH },
            { name: 'HOTEN', type: 'NvarChar(10)', value: HOTEN },
            { name: 'GIOITINH', type: 'NvarChar(5)', value: GIOITINH },
            { name: 'NAMSINH', type: 'Char(5)', value: NAMSINH },
            { name: 'SDT', type: 'Char(10)', value: SDT },
            { name: 'HINHANH', type: 'Char(200)', value: HINHANH },
        ]
        console.log(params);
        let rs = await KhachHang.updateKhachHang(params)
        if (rs.returnValue == 1) {
            // return json(true, rs)
            res.send(json(false, 'Số điện thoại không hợp lệ'))
        } else if (rs.returnValue == 2) {
            res.send(json(false, 'Năm sinh không hợp lệ'))
        }
        else {
            // return json(false, rs)
            res.send(json(true, rs))
        }
    }

    timKiem = async (req, res) => {
        const HOTEN = req.body
        let params = [{ name: 'HOTEN', type: 'NVarChar(50)', value: 'Trườ' }]
        if (HOTEN == '') {
            let rs = await KhachHang.getListKhachHang()
            res.send(json(true, rs))
            return
        }
        let rs = await KhachHang.searchKhachHang(params)
        if (rs.recordset.length == 0) {
            res.send(json(false, 'Không có kết quả phù hợp'))
            console.log(json(false, 'Không có kết quả phù hợp'))
            return
        }
        res.send(json(true, rs.recordset))
    }

    xemKh = async (req, res) => {
        const MAKH = req.body
        let params = [{ name: 'MAKH', type: 'Char(10)', value: MAKH }]
        let rs = await KhachHang.selectKhachHang(params)
        res.send(json(true, rs.recordset))
    }

    xemCsInbody = async (req, res) => {
        const { MAKH } = req.body
        let params = [{ name: 'MAKH', type: 'Char(10)', value: MAKH }]
        let rs = await KhachHang.selectInbodyKhachHang(params)
        res.send(json(true, rs.recordset))
    }


}

module.exports = new KhachHangControllers