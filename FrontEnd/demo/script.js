import server from '../server/main.js'




server.NhanVien.themNhanVien({
  HOTEN: 'Nguyễn Văn B', SDT: '0973343549', CHUCVU: 'NHANVIEN'
}).then((result) => {
  console.log(result);
}).catch((err) => {

});;

// server.KhachHang.themKhachHang({
//   // MAKH: 'KH01',
//   HOTEN: 'Nguyễn Văn B', GIOITINH: 'NAM', NAMSINH: '2001', SDT: '0973343549', HINHANH: './'
// }).then((result) => {
//   console.log(result);
// }).catch((err) => {

// });;