const json = require('../components/json')
const NhanVien = require('../modules/NhanVien')

class NhanVienControllers {
    index(req, res){
        res.send('nhanvien')
    }

    getList = async (req, res) => {
        let rs = await NhanVien.getListNhanVien()
        res.send(json(true, rs))
    }

    themNv = async (req, res) => {
        const { hoTen, sdt, chucVu } = req.body
        let params = [
            {name: 'HOTEN', type: 'Nvarchar(50)', value: 'Lê Lâm Tuấn'},
            {name: 'SDT', type: 'Char(10)', value: '039239560'},
            {name: 'CHUCVU', type: 'Char(20)', value: 'QUANLY'}
        ]

        let rs = await NhanVien.insertNhanVien(params)
        if(rs.returnValue == 1){
            // return json(true, rs)
            res.send(json(true, rs))
        } else {
            // return json(false, rs)
            res.send(json(false, 'Số điện thoại không hợp lệ'))
        }
    }

    capNhatNv = async (req, res) => {
        const { maNv, hoTen, sdt, chucVu } = req.body
        let params = [
            {name: 'MANV', type: 'Char(10)', value: 'NV00000001'},
            {name: 'HOTEN', type: 'Nvarchar(50)', value: 'Nguyễn Thị Yến Vy'},
            {name: 'SDT', type: 'Char(10)', value: '0392395607'},
            {name: 'CHUCVU', type: 'Char(20)', value: 'QUANLY'}
        ]
        let rs = await NhanVien.updateNhanVien(params)
        if(rs.rowsAffected > 0){
            res.send(json(true, rs))
        } else {
            res.send(json(false, rs))
        }
    }
}

module.exports = new NhanVienControllers