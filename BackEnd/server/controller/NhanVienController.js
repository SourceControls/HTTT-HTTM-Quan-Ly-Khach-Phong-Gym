const json = require('../components/json')
const DB = require('../components/SqlDb')
const NhanVien = require('../modules/NhanVien')

class NhanVienControllers {
    index(req, res){
        res.send('nhanvien')
    }

    getList = async (req, res) => {
        const KEY = req.body
        let params = [{name: 'HOTEN', type: 'Nvarchar(50)', value: ' Yến'}]
        if(KEY == ''){
            let rs = await NhanVien.getListNhanVien()
            res.send(json(true, rs))
            return
        }
        let rs = await NhanVien.searchNhanVien(params)
        if(rs.recordset.length == 0){
            res.send(json(false, 'Không có kết quả phù hợp'))   
            console.log(json(false, 'Không có kết quả phù hợp'))
            return
        }
        res.send(json(true, rs.recordset))
    }

    themNv = async (req, res) => {
        const { HOTEN, SDT, CHUCVU } = req.body
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
        const { MANV, HOTEN, SDT, CHUCVU } = req.body
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

    xoaNv = async (req, res) => {
        const MANV = req.body
        let params = [{name: 'MANV', type: 'Char(10)', value: 'NV00000001'}]
        let rs = await NhanVien.deleteNhanVien(params)
        if(rs.rowsAffected > 0){
            res.send(json(true, rs))
        } else {
            res.send(json(false, rs))
        }
    }

    timKiemNv = async (req, res) => {
        const HOTEN = req.body
        let params = [{name: 'HOTEN', type: 'Nvarchar(50)', value: ' Yến'}]
        let rs = await NhanVien.searchNhanVien(params)
        if(rs.recordset.length == 0){
            res.send(json(false, 'Không có kết quả phù hợp'))   
            console.log(json(false, 'Không có kết quả phù hợp'))
            return
        }
        res.send(json(true, rs.recordset))
    }

}

module.exports = new NhanVienControllers