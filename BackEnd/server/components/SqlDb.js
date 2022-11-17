const sql = require("mssql/msnodesqlv8")
const config = {
    user: 'sa',
    password: '123',
    server: 'localhost',
    database: 'QLPG',
    driver: 'msnodesqlv8'
}


class SqlDB {
    poolPromise = new sql.ConnectionPool(config)
        .connect()
        .then(pool => {
            console.log('Connected to MSSQL')
            return pool
        })
        .catch(err => console.log('Database Connection Failed! Bad Config: ', err)
        )
    select = async (res, query) => {
        try {
            const result = await poolPromise.request()
                .query('select * from KHACHHANG', (err, profileSet) => {
                    if (err) {
                        console.log(err)
                    } else {
                        res.json(profileSet.recordset)
                    }
                })
        } catch (err) {
            res.status(500)
            res.send(err.message)
        }
    }
}

module.exports = new SqlDB();