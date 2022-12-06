const sql = require("mssql/msnodesqlv8")
const config = {
    user: 'sa',
    password: '123', //123
    server: 'localhost', //localhost
    database: 'QLPG',
    driver: 'msnodesqlv8'
}


class SqlDB {
    query = async (queryStr) => {
        let pool = await sql.connect(config);
        return (await pool.request().query(queryStr)).recordset;
    }
    excute = async (proc, sqlParams) => {
        try {
            let pool = await sql.connect(config)
            let request = pool.request()
            sqlParams.forEach(param => {
                request.input(param.name, param.type, param.value)
            })
            return await request.execute(proc)
                .then(record => { return record })
                .catch(err => { return err.message })
            // return (await request.execute(proc)).recordset;
        }
        catch (err) {
            return err.message
        }
    }
}
const DB = new SqlDB()

module.exports = DB;