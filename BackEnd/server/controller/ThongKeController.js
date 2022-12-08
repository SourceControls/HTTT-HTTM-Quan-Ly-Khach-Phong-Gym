const DB = require('../components/SqlDb')
const json = require('../components/json')

class ThongKeControllers {
    index(req, res) {
        res.send('Thống kê')
    }

    xemThongKeKh = async (req, res) => {
        const { TUNGAY, DENNGAY } = req.body
        let params = [
<<<<<<< HEAD
            { name: 'TUNGAY', type: 'Date', value: TUNGAY},
            { name: 'DENNGAY', type: 'Date', value: DENNGAY},
=======
            { name: 'TUNGAY', type: 'Date', value: ''},
            { name: 'DENNGAY', type: 'Date', value: ''},
>>>>>>> 29b491d23787988fc26f1391b63e56e112026b92
        ]
        let rs = await DB.excute('SP_THONG_KE_KH', params)
        res.send(json(true, rs.recordset))
    }

    xemThongKeRaVao = async (req, res) => {
        const { TUNGAY, DENNGAY } = req.body
        let params = [
            { name: 'TUNGAY', type: 'Date', value: TUNGAY},
            { name: 'DENNGAY', type: 'Date', value: DENNGAY},
        ]
        let rs = await DB.excute('SP_LUOT_RA_VAO', params)
        res.send(json(true, rs.recordset))
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