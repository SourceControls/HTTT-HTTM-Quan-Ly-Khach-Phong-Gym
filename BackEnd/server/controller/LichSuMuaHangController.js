const DB = require('../components/SqlDb')
const json = require('../components/json')

class LichSuMuaHangControllers {
    index(req, res) {
        res.send('Lịch sử mua hàng')
    }

    getList = async (req, res) => {
        const { KEY } = req.body
        let params = [{name: 'KEY', type: 'Nvarchar(20)', value: KEY}]
        if(KEY == ''){
            let rs = await DB.query('SELECT * FROM V_LICH_SU_MUA_HANG')
            res.send(json(true, rs))
            return
        }
        let rs = await DB.excute('SP_TIM_KIEM_LSMH', params)
        if(rs.recordset.length == 0){
            res.send(json(false, 'Không có kết quả phù hợp'))
            return
        }
        res.send(json(true, rs.recordset))
    }

    insert = async (req, res) => {
        // MATCHSUGGEST: 0: tự mua, 1: Máy gợi ý
        const { STT, MASP, MATCHSUGGEST } = req.body
        let params = [
            {name: 'STT', type: 'Int', value: STT},
            {name: 'MASP', type: 'Char(10)', value: MASP},
            {name: 'MATCHSUGGEST', type: 'Bit', value: MATCHSUGGEST}
        ]
        let rs = await DB.excute('SP_THEM_LICH_SU_MUA_HANG', params)
        if(rs.returnValue == 1){
            res.send(json(true, rs))
            return
        }
        res.send(json(false, rs))
    }
}

module.exports = new LichSuMuaHangControllers