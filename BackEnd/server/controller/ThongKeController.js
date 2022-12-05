const DB = require('../components/SqlDb')
const json = require('../components/json')

class ThongKeControllers {
    index(req, res) {
        res.send('Thống kê')
    }

    xemThongKeKh = async (req, res) => {
        let rs = await DB.query('EXEC SP_THONG_KE_KH')
        res.send(json(true, rs))
    }

    xemThongKeRaVao = async (req, res) => {
        let rs = await DB.query('SELECT * FROM V_LUOT_RA_VAO')
        res.send(json(true, rs))
    }

    xemDoanhThu = async (req, res) => {
        const { TUNGAY, DENNGAY } = req.body
        let params = [
            { name: 'TUNGAY', type: 'Date', value: TUNGAY },
            { name: 'DENNGAY', type: 'Date', value: DENNGAY },
        ]
        let rs = await DB.excute('SP_THONG_KE_DOANH_THU', params)
        res.send(json(true, rs.recordset))
    }
}

module.exports = new ThongKeControllers