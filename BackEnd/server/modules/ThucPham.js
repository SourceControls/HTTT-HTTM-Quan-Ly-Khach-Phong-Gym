const DB = require('../components/SqlDb')

class ThucPham {
  constructor(MASP, TENSP, MOTA, HINHANH) {
    this.MASP = MASP
    this.TENSP = TENSP
    this.MOTA = MOTA
    this.HINHANH = HINHANH
  }
  static getListThucPham() {
    return DB.query('SELECT * FROM V_THUC_PHAM')
  }
  static searchThucPham(params) {
    return DB.excute('SP_TIM_KIEM_THUC_PHAM', params)
  }
}

module.exports = ThucPham