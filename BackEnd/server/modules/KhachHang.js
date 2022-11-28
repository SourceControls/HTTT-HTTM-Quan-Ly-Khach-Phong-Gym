const DB = require('../components/SqlDb')

class KhachHang {
  constructor(MAKH, HOTEN, GIOITINH, NAMSINH, SDT, NGAYTHAMGIA, HINHANH) {
    this.MAKH = MAKH
    this.HOTEN = HOTEN;
    this.GIOITINH = GIOITINH;
    this.NAMSINH = NAMSINH;
    this.SDT = SDT;
    this.NGAYTHAMGIA = NGAYTHAMGIA;
    this.HINHANH = HINHANH;
  }
  static getListKhachHang() {
    return DB.query('select * from V_KHACHHANG')
  }
  static insertKhachHang(params) {
    return DB.excute('SP_THEM_KHACH_HANG', params)
  }
  static updateKhachHang(params) {
    return DB.excute('SP_CAP_NHAT_KHACH_HANG', params)
  }
  static deleteKhachHang(params) {
    return DB.excute('SP_XOA_KHACH_HANG', params)
  }
  static searchKhachHang(params) {
    return DB.excute('SP_TIM_KIEM_KHACH_HANG', params)
  }
  static selectKhachHang(params) {
    return DB.excute('SP_XEM_KHACH_HANG', params)
  }
  static selectInbodyKhachHang(params) {
    return DB.excute('XEM_CHI_SO_INBODY', params)
  }
}

module.exports = KhachHang