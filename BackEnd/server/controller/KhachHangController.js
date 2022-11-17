const { sql, poolPromise } = require('../components/SqlDb')


class KhachHangControllers {
    index(req, res) {
        res.send('Khach Hang')
    }
    getList = async (req, res) => {
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .query('select * from KHACHHANG', (err, profileSet) => {
                    if (err) {
                        console.log(err)
                    } else {
                        let send_data = profileSet.recordset
                        console.log(send_data)
                    }
                })
        } catch (err) {
            res.status(500)
            res.send(err.message)
        }
        res.send('Hiển thị danh sách khách hàng thành công')
    }

    insert = async (req, res) => {
        res.send('Thêm khách hàng thành công')
    }
}

module.exports = new KhachHangControllers