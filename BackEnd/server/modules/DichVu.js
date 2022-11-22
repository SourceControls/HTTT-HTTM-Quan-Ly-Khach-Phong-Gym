const DB = require('../components/SqlDb')

class DichVu {
    constructor(MADV, TENDV, SONGAYSUDUNG, GIA, HIENHANH){
        this.MADV = MADV
        this.TENDV = TENDV
        this.SONGAYSUDUNG = SONGAYSUDUNG
        this.GIA = GIA
        this.HIENHANH = HIENHANH
    }

    static getListDichVu() {
        return DB.query('SELECT * FROM V_DICH_VU')
    }
    static insertDichVu(params) {
        return DB.excute('SP_THEM_DICH_VU', params)
    }
    static updateDichVu(params) {
        return DB.excute('SP_CAP_NHAT_DICH_VU', params)
    }
    static deleteDichVu(params) {
        return DB.excute('SP_XOA_DICH_VU', params)
    }
    static searchDichVu(params) {
        return DB.excute('SP_TIM_KIEM_DICH_VU', params)
    }
}

module.exports = DichVu