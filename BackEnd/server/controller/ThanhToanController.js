const DB = require('../components/SqlDb')
const json = require('../components/json')

class ThanhToanControllers {
    index(req, res) {
        res.send('Thanh toán')
    }

    themPtt = async (req, res) => {
        const { maPdk, maNv } = req.body
        let params = [
            {name: 'MAPDK', type: 'Char(10)', value: 'PDK0000002'},
            {name: 'MANV', type: 'Char(10)', value: 'NV01'},
        ]
        let rs = await DB.excute('SP_THEM_PHIEU_THU_TIEN', params)
        if(rs.rowsAffected > 0){
            // return json(true, rs)
            res.send(json(true, rs))
        } else {
            // return json(false, rs)
            res.send(json(false, rs))
        }
    }

    xemPtt = async (req, res) => {
        let params = [{name: 'MAPDK', type: 'Char(10)', value: 'PDK0000002'}]
        let rs = await DB.excute('SP_XEM_PHIEU_THU_TIEN', params)
        res.send(json(true, rs.recordset))
    }
}

module.exports = new ThanhToanControllers