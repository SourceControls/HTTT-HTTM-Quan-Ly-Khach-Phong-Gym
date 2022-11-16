
const nhanVienRouters = require('./nhanVien.routes')
const khachHangRouters = require('./khachHang.routes')
const phieuDangKyRouter = require('./phieuDangKy.routes')

function routes(app) {

  app.use('/NhanVien', nhanVienRouters)
  app.use('/KhachHang', khachHangRouters)
  app.use('/PhieuDangKy', phieuDangKyRouter)
}

module.exports = routes