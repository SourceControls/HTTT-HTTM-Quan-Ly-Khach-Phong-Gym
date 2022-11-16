const {sql, poolPromise} = require('./component/SqlDb')
const app = require('./component/app')

//init route
const routes = require('./routes/index.routes')
routes(app)

app.get('/', async (req, res) => {
    try {
        const pool = await poolPromise
        const result = await pool.request()
        .query('select * from KHACHHANG', (err, profileSet) =>{
            if(err){
                console.log(err)
            } else {
                let send_data = profileSet.recordset
                res.json(send_data)
            }
        })
    } catch(err){
        res.status(500)
        res.send(err.message)
    }
})
app.listen(3000, () => console.log("Hello World: ", poolPromise))