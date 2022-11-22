
const nhanVienRouters = require('./nhanVien.routes')
const khachHangRouters = require('./khachHang.routes')
const phieuDangKyRouter = require('./phieuDangKy.routes')
const phieuThuTienRouter = require('./phieuThuTien.routes')
const dichVuRouter = require('./dichVu.routes')

function routes(app) {

  app.use('/NhanVien', nhanVienRouters)
  app.use('/KhachHang', khachHangRouters)
  app.use('/PhieuDangKy', phieuDangKyRouter)
  app.use('/PhieuThuTien', phieuThuTienRouter)
  app.use('/DichVu', dichVuRouter)
}

module.exports = routes