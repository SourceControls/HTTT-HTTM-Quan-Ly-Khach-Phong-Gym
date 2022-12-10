const json = require('../components/json')
const DB = require('../components/SqlDb')
const NhanVien = require('../modules/NhanVien')

class NhanVienControllers {
    index(req, res) {
        res.send('nhanvien')
    }

    getList = async (req, res) => {
        const { KEY } = req.body
        let params = [{name: 'KEY', type: 'Nvarchar(20)', value: KEY}]
        if(KEY == ''){
            let rs = await NhanVien.getListNhanVien()
            res.send(json(true, rs))
            return
        }
        let rs = await NhanVien.searchNhanVien(params)
        if(rs.recordset.length == 0){
            res.send(json(false, []))   
            return
        }
        res.send(json(true, rs.recordset))
    }

    themNv = async (req, res) => {
        const { HOTEN, SDT, CHUCVU } = req.body

        let params = [
            { name: 'HOTEN', type: 'Nvarchar(50)', value: HOTEN },
            { name: 'SDT', type: 'Char(20)', value: SDT },
            { name: 'CHUCVU', type: 'Char(20)', value: CHUCVU }
        ]

        let rs = await NhanVien.insertNhanVien(params)
        if (rs.returnValue == 1) {
            // return json(true, rs)
            res.send(json(true, rs))
        } else {
            // return json(false, rs)
            res.send(json(false, rs))
        }
    }

    capNhatNv = async (req, res) => {
        const { MANV, HOTEN, SDT, CHUCVU } = req.body
        let params = [
            { name: 'MANV', type: 'Char(10)', value: MANV },
            { name: 'HOTEN', type: 'Nvarchar(50)', value: HOTEN },
            { name: 'SDT', type: 'Char(20)', value: SDT },
            { name: 'CHUCVU', type: 'Char(20)', value: CHUCVU }
        ]
        let rs = await NhanVien.updateNhanVien(params)
        if (rs.rowsAffected > 0) {
            res.send(json(true, rs))
        } else {
            res.send(json(false, rs))
        }
    }

    xoaNv = async (req, res) => {
        const { MANV } = req.body
        let params = [{ name: 'MANV', type: 'Char(10)', value: MANV }]
        let rs = await NhanVien.deleteNhanVien(params)
        if (rs.returnValue == 1 ) {
            res.send(json(true, "Khóa tài khoản thành công"))
        } else if(rs.returnValue == 2){
            res.send(json(true, "Xóa nhân viên thành công"))
        } else {
            res.send(json(false, rs))
        }
    }

    timKiemNv = async (req, res) => {
        const { HOTEN } = req.body
        let params = [{ name: 'HOTEN', type: 'Nvarchar(50)', value: HOTEN }]
        let rs = await NhanVien.searchNhanVien(params)
        if (rs.recordset.length == 0) {
            res.send(json(false, 'Không có kết quả phù hợp'))
            console.log(json(false, 'Không có kết quả phù hợp'))
            return
        }
        res.send(json(true, rs.recordset))
    }

}

module.exports = new NhanVienControllers