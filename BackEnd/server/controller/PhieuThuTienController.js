const json = require('../components/json')
const PhieuThuTien = require('../modules/PhieuThuTien')

class PhieuThuTienControllers {
    index(req, res) {
        res.send('Thanh toán')
    }

    themPtt = async (req, res) => {

        const { SOTIENTHU, MAPDK, MANV } = req.body
        let params = [
            { name: 'SOTIENTHU', type: 'Money', value: SOTIENTHU },
            { name: 'MAPDK', type: 'Char(10)', value: MAPDK },
            { name: 'MANV', type: 'Char(10)', value: MANV },
        ]
        let rs = await PhieuThuTien.insertPhieuThuTien(params)
        console.log(rs);
        if (rs.returnValue == 0) {
            // return json(true, rs)
            res.send(json(false, `Phiếu này đã được thanh toán !!!`))
        } else if (rs.returnValue == 1) {
            // return json(true, rs)
            res.send(json(false, `Phiếu này đã hủy`))
            // return json(false, rs)
        } else {
            res.send(json(true, rs))
        }
    }

    xemPtt = async (req, res) => {
        const { MAPDK } = req.body
        let params = [{ name: 'MAPDK', type: 'Char(10)', value: MAPDK }]
        let rs = await PhieuThuTien.selectPhieuThuTien(params)
        if (rs.returnValue == 1) {
            res.send(json(true, rs.recordset))
        } else {
            res.send(json(false, 'Khách hàng chưa thanh toán'))
        }
    }
}

module.exports = new PhieuThuTienControllers