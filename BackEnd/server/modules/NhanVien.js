const DB = require('../components/SqlDb')

class NhanVien {
    constructor(MANV, HOTEN, SDT, CHUCVU) {
        this.MANV = MANV
        this.HOTEN = HOTEN
        this.SDT = SDT
        this.CHUCVU = CHUCVU
    }

    static getListNhanVien() {
        return DB.query('SELECT * FROM V_XEM_NHAN_VIEN')
    }
    static insertNhanVien(params) {
        return DB.excute('SP_THEM_NHAN_VIEN', params)
    }
    static updateNhanVien(params) {
        return DB.excute('SP_CAP_NHAT_NHAN_VIEN', params)
    }
    static deleteNhanVien(params) {
        return DB.excute('SP_XOA_NHAN_VIEN', params)
    }
    static searchNhanVien(params) {
        return DB.excute('SP_TIM_KIEM_NHAN_VIEN', params)
    }
}

module.exports = NhanVien