const DB = require('../components/SqlDb')
class TaiKhoan {
  constructor(TENDANGNHAP, MATKHAU) {
    this.TENDANGNHAP = TENDANGNHAP;
    this.MATKHAU = MATKHAU;
    this.KHOA = false;
  }
  static selectTaiKhoan(TENDANGNHAP, MATKHAU) {
    return DB.query(`SELECT * FROM TAIKHOAN WHERE TENDANGNHAP = '${TENDANGNHAP}'`)
  }
  static insertTaiKhoan(taiKhoan) {
    return DB.query(`insert into TAIKHOAN(TENDANGNHAP,MATKHAU) values ('${taiKhoan.TENDANGNHAP}','${taiKhoan.MATKHAU}')`)
  }
  static updateTaiKhoan(TENDANGNHAP, MATKHAU, KHOA) {
    console.log('update');
    if (MATKHAU.length > 0) {
      return DB.query(`UPDATE TAIKHOAN SET MATKHAU = '${MATKHAU}' WHERE TENDANGNHAP ='${TENDANGNHAP}'`)
    }
    else {
      return DB.query(`UPDATE TAIKHOAN SET KHOA ='${KHOA}' WHERE TENDANGNHAP ='${TENDANGNHAP}'`)
    }
  }
}

module.exports = TaiKhoan