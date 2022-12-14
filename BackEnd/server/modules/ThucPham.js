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
  static insertThucPham(params) {
    return DB.excute('SP_THEM_THUC_PHAM', params)
  }
  static updateThucPham(params) {
    return DB.excute('SP_CAP_NHAT_THUC_PHAM', params)
  }
  static deleteThucPham(params) {
    return DB.excute('SP_XOA_THUC_PHAM', params)
  }
  static searchMachineLearning(TUNGAY, DENNGAY) {
    return DB.query(`select * from V_MACHINE_LEARNING WHERE NGAY BETWEEN '${TUNGAY}' AND '${DENNGAY}'`)
  }
}

module.exports = ThucPham