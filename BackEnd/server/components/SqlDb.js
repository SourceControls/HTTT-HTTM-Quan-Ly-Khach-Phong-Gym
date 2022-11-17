const sql = require("mssql/msnodesqlv8")
const config = {
    user: 'sa',
    password: '123',
    server: 'localhost',
    database: 'QLPG',
    driver: 'msnodesqlv8'
}


class SqlDB {
    query = async (queryStr) => {
        let pool = await sql.connect(config);
        return (await pool.request().query(queryStr)).recordset;
    }
}
const DB = new SqlDB()

module.exports = DB;