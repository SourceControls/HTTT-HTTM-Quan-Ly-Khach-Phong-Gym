const DB = require('../components/SqlDb')
const json = require('../components/json')

class LichSuVaoPhongControllers {
    index(req, res){
        res.send('Lịch sử vào phòng')
    }

    xemLichSu = async (req, res) => {
        const { KEY } = req.body
        let params = [{ name: 'KEY', type: 'NVarChar(20)', value: KEY }]
        if (KEY == '') {
            let rs = await DB.query('EXEC SP_LICH_SU_VAO_PHONG')
            res.send(json(true, rs))
            return
        }
        let rs = await DB.excute('SP_TIM_KIEM_LICH_SU', params)
        if (rs.recordset.length == 0) {
            res.send(json(false, 'Không có kết quả phù hợp'))
            return
        }
        res.send(json(true, rs.recordset))

    }

    chiTietLichSu = async (req, res) => {
        const { STT } = req.body
        let params = [{ name: 'STT', type: 'Int', value: STT }]
        let rs = await DB.excute('SP_CHI_TIET_LICH_SU', params)
        res.send(json(true, rs.recordset))
    }
}

module.exports = new LichSuVaoPhongControllers