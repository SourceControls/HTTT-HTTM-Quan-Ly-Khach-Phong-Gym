
const taiKhoanRouters = require('./taiKhoan.routes')
const nhanVienRouters = require('./nhanVien.routes')
const khachHangRouters = require('./khachHang.routes')
const phieuDangKyRouter = require('./phieuDangKy.routes')
const phieuThuTienRouter = require('./phieuThuTien.routes')
const dichVuRouter = require('./dichVu.routes')
const lichSuRouter = require('./lichSuVaoPhong.routes')
const thongKeRouter = require('./thongKe.routes')
const thucPhamRouter = require('./thucPham.routes')
const lichSuMuaHangRouter = require('./lichSuMuaHang.routes')


function routes(app) {

  app.use('/TaiKhoan', taiKhoanRouters)
  app.use('/NhanVien', nhanVienRouters)
  app.use('/KhachHang', khachHangRouters)
  app.use('/PhieuDangKy', phieuDangKyRouter)
  app.use('/PhieuThuTien', phieuThuTienRouter)
  app.use('/DichVu', dichVuRouter)
  app.use('/ThongKe', thongKeRouter)
  app.use('/LichSu', lichSuRouter)
  app.use('/ThucPham', thucPhamRouter)
  app.use('/LichSuMuaHang', lichSuMuaHangRouter)
}

module.exports = routes