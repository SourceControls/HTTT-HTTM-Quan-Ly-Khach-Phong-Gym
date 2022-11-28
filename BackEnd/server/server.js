const app = require('./components/app')

//init route
const routes = require('./routes/index.routes')
routes(app)

// async function a() {
//   const cl = require('./controller/TaiKhoanController');
//   let req = {
//     body: {
//       TENDANGNHAP: 'NV03',
//       MATKHAU: '123'
//     }
//   }
//   cl.dangNhap(req).then(rs => console.log(rs));
// }
// a()

// async function a() {
//   const cl = require('./controller/KhachHangController');
//   let req = {
//     body: {
//       hoTen: 'Nguyễn Thành Tân', 
//       gioiTinh: 'Nam',
//       namSinh: '2001', 
//       sdt: '03199399', 
//       hinhAnh: 'esssss'
//     }
//   }
//   cl.themKh(req).then(rs => console.log(rs))
// }
// a()
// app.get('/', async (req, res) => {
//   // console.log(DB.query("SELECT * FROM KHACHHANG"));

// })
app.listen(3000, () => console.log("App running"))


