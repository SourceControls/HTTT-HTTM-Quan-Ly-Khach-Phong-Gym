const json = require('../components/json')
const ThucPham = require('../modules/ThucPham')

class ThucPhamControllers {
    index(req, res) {
        res.send('Thực phẩm bổ sung')
    }

    getList = async (req, res) => {
        const { KEY } = req.body
        let params = [{name: 'KEY', type: 'Nvarchar(20)', value: KEY}]
        if(!KEY){
            let rs = await ThucPham.getListThucPham()
            res.send(json(true, rs))
            return
        }
        let rs = await ThucPham.searchThucPham(params)
        if(rs.recordset.length == 0){
            res.send(json(false, 'Không có kết quả phù hợp'))
            return
        }
        res.send(json(true, rs.recordset))
    }

}

module.exports = new ThucPhamControllers