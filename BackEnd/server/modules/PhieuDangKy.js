const DB = require("../components/SqlDB")

class PhieuDangKy {
    constructor(MAPDK, NGAYDK, NGAYBD, NGAYKT, TILEKM, TONGTIEN, TRANGTHAI, MAKH, MANVLAP, MADV, MANVHUY){
        this.MAPDK = MAPDK
        this.NGAYDK = NGAYDK
        this.NGAYBD = NGAYBD
        this.NGAYKT = NGAYKT
        this.TILEKM = TILEKM
        this.TONGTIEN = TONGTIEN
        this.TRANGTHAI = TRANGTHAI
        this.MAKH = MAKH
        this.MANVLAP = MANVLAP
        this.MADV = MADV
        this.MANVHUY = MANVHUY
    }

    static getListPhieuDangKy() {
        return DB.query('select * from V_PHIEUDK')
    }
    static insertPhieuDangKy(params) {
        return DB.excute('SP_DANG_KY_DICH_VU', params)
    }
    static cancelPhieuDangKy(params) {
        return DB.excute('SP_HUY_PHIEU_DANG_KY', params)
    }
    static selectPhieuDangKy(params) {
        return DB.excute('SP_XEM_PHIEU_DANG_KY', params)
    }
    static searchPhieuDangKy(params) {
        return DB.excute('SP_TIM_KIEM_PHIEU_DANG_KY', params)
    }
}

module.exports = PhieuDangKy