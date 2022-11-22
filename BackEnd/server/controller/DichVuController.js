const json = require('../components/json')
const DichVu = require('../modules/DichVu')

class DichVuControllers {
    index(req, res) {
        res.send('Dịch vụ')
    }

    getList = async (req, res) => {
        let rs = await DichVu.getListDichVu()
        res.send(json(true, rs))
    }

    themDv = async (req, res) => {
        const { TENDV, SONGAYSUDUNG, GIA, HIENHANH } = req.body
        let params = [
            {name: 'TENDV', type: 'Nvarchar(50)', value: 'Gói tập 6 tháng'},
            {name: 'SONGAYSUDUNG', type: 'Int', value: '180'},
            {name: 'GIA', type: 'Money', value: '1700000'},
            {name: 'HIENHANH', type: 'Bit', value: 0}
        ]
        let rs = await DichVu.insertDichVu(params)
        if(rs.rowsAffected > 0){
            res.send(json(true, rs))
        } else {
            res.send(json(false, rs))
        }
    }

    capNhatDv = async (req, res) => {
        const { MADV, TENDV, SONGAYSUDUNG, GIA, HIENHANH } = req.body
        let params = [
            {name: 'MADV', type: 'Char(10)', value: 'DV00000003'},
            {name: 'TENDV', type: 'Nvarchar(50)', value: 'Gói tập 365 ngày'},
            {name: 'SONGAYSUDUNG', type: 'Int', value: '365'},
            {name: 'GIA', type: 'Money', value: '3400000'},
            {name: 'HIENHANH', type: 'Bit', value: 1},
        ]

        let rs = await DichVu.updateDichVu(params)
        if(rs.returnValue == 1) {
            res.send(json(true, rs))
        } else {
            res.send(json(false, 'Dịch vụ đang được sử dụng. Không thể sửa !!'))
        }
    }

    xoaDv = async (req, res) => {
        const MADV = req.body
        let params = [{name: 'MADV', type: 'Char(10)', value: 'DV00000003'}]
        let rs = await DichVu.deleteDichVu(params)
        if(rs.returnValue == 1) {
            res.send(json(true, rs))
        } else {
            res.send(json(false, 'Dịch vụ đang được sử dụng. Không thể xóa !!'))
        }
    }

    timKiemDv = async (req, res) => {
        const TENDV = req.body
        let params = [{name: 'TENDV', type: 'Nvarchar(50)', value: 'a'}]
        let rs = await DichVu.searchDichVu(params)
        if(rs.recordset.length == 0){
            res.send(json(false, rs))   
            return json(false, 'Không có kết quả phù hợp')
        }
        res.send(json(true, rs.recordset))
    }
}

module.exports = new DichVuControllers