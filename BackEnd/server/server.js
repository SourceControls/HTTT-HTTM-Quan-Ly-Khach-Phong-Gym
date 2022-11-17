const DB = require('./components/SqlDB')
const app = require('./components/app')

//init route
const routes = require('./routes/index.routes')
routes(app)

app.get('/', async (req, res) => {

})
app.listen(3000, () => console.log("Hello World: "))


