const app = require('./components/app')

//init route
const routes = require('./routes/index.routes')
routes(app)


app.listen(8080, () => console.log("App running 8080"))


