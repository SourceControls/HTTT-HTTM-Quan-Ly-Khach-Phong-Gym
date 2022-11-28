const json = require('../components/json')
const DichVu = require('../modules/DichVu')

class DichVuControllers {
    index(req, res) {
        res.send('Dịch vụ')
    }

    getList = async (req, res) => {
        const { KEY } = req.body
        let params = [{name: 'KEY', type: 'Nvarchar(20)', value: KEY}]
        if(KEY == ''){
            let rs = await DichVu.getListDichVu()
            res.send(json(true, rs))
            return
        }
        let rs = await DichVu.searchDichVu(params)
        if(rs.recordset.length == 0){
            res.send(json(false, 'Không có kết quả phù hợp'))
            return
        }
        res.send(json(true, rs.recordset))
    }

    themDv = async (req, res) => {
        const { TENDV, SONGAYSUDUNG, GIA, HIENHANH } = req.body
        let params = [
            { name: 'TENDV', type: 'Nvarchar(50)', value: TENDV },
            { name: 'SONGAYSUDUNG', type: 'Int', value: SONGAYSUDUNG },
            { name: 'GIA', type: 'Money', value: GIA },
            { name: 'HIENHANH', type: 'Bit', value: HIENHANH }
        ]
        let rs = await DichVu.insertDichVu(params)
        if (rs.rowsAffected > 0) {
            res.send(json(true, rs))
        } else {
            res.send(json(false, rs))
        }
    }

    capNhatDv = async (req, res) => {
        const { MADV, TENDV, SONGAYSUDUNG, GIA, HIENHANH } = req.body
        let params = [
            { name: 'MADV', type: 'Char(10)', value: MADV },
            { name: 'TENDV', type: 'Nvarchar(50)', value: TENDV },
            { name: 'SONGAYSUDUNG', type: 'Int', value: SONGAYSUDUNG },
            { name: 'GIA', type: 'Money', value: GIA },
            { name: 'HIENHANH', type: 'Bit', value: HIENHANH },
        ]

        let rs = await DichVu.updateDichVu(params)
        if (rs.returnValue == 1) {
            res.send(json(true, rs))
        } else {
            res.send(json(false, 'Dịch vụ đang được sử dụng. Không thể sửa !!'))
        }
    }

    xoaDv = async (req, res) => {
        const { MADV } = req.body
        let params = [{ name: 'MADV', type: 'Char(10)', value: MADV }]
        let rs = await DichVu.deleteDichVu(params)
        if (rs.returnValue == 1) {
            res.send(json(true, rs))
        } else {
            res.send(json(false, 'Dịch vụ đang được sử dụng. Không thể xóa !!'))
        }
    }

    timKiemDv = async (req, res) => {
        const TENDV = req.body
        let params = [{ name: 'TENDV', type: 'Nvarchar(50)', value: TENDV }]
        let rs = await DichVu.searchDichVu(params)
        if (rs.recordset.length == 0) {
            res.send(json(false, rs))
            return json(false, 'Không có kết quả phù hợp')
        }
        res.send(json(true, rs.recordset))
    }
}

module.exports = new DichVuControllers