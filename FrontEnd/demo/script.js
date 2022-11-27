import server from '../server/main.js'




// server.NhanVien.themNhanVien({
//   HOTEN: 'Nguyễn Văn B', SDT: '0973343549', CHUCVU: 'NHANVIEN'
// }).then((result) => {
//   console.log(result);
// }).catch((err) => {

// });;

// server.KhachHang.themKhachHang({
//   // MAKH: 'KH01',
//   HOTEN: 'Nguyễn Văn B', GIOITINH: 'NAM', NAMSINH: '2001', SDT: '0973343549', HINHANH: './'
// }).then((result) => {
//   console.log(result);
// }).catch((err) => {

// });;

// server.DichVu.xoaDichVu({
//   MADV: 'DV00000010',
//   // TENDV: 'DV01', SONGAYSUDUNG: '60', GIA: '1200000', HIENHANH: 0
// }).then((result) => {
//   console.log(result);
// }).catch((err) => {
// });;


server.PhieuThuTien.thanhToan({
  SOTIENTHU: 300000, MAPDK: 'PDK0000009', MANV: 'NV00000001'
}).then((result) => {
  console.log(result);
}).catch((err) => {
});;



