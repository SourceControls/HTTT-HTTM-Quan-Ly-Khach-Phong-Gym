const app = require('./components/app')

//init route
const routes = require('./routes/index.routes')
// routes(app)

async function a() {
  const cl = require('./controller/TaiKhoanController');
  let req = {
    body: {
      TENDANGNHAP: 'NV03',
      MATKHAU: 'lal8yg1k'
    }
  }
  cl.capTaiKhoan(req).then(rs => console.log(rs));
}
a()
app.get('/', async (req, res) => {
  // console.log(DB.query("SELECT * FROM KHACHHANG"));

})
// app.listen(3000, () => console.log("Hello World: "))


