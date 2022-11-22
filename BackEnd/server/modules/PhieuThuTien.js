const DB = require('../components/SqlDb')

class PhieuThuTien {
    constructor(MAPTT, SOTIENTHU, NGAYTHU, MAPDK, MANV) {
        this.MAPTT = MAPTT
        this.SOTIENTHU = SOTIENTHU
        this.NGAYTHU = NGAYTHU
        this.MAPDK = MAPDK
        this.MANV = MANV
    }

    static insertPhieuThuTien(params) {
        return DB.excute('SP_THEM_PHIEU_THU_TIEN', params)
    }
    static selectPhieuThuTien(params) {
        return DB.excute('SP_XEM_PHIEU_THU_TIEN', params)
    }
}

module.exports = PhieuThuTien