const DB = require('../components/SqlDB')
const json = require('../components/json');
const bcrypt = require('bcrypt');


class TaiKhoanControllers {
    index(req, res) {
        res.send('TaiKhoan')
    }
    capTaiKhoanOrResetMatKhau = async (req, res) => {
        //có tài khoản rồi thì sẽ chuyển qua resetmk
        let rs = await DB.query(`SELECT * FROM TAIKHOAN WHERE TENDANGNHAP = '${req.body.TENDANGNHAP}'`)
        if (rs.length > 0) {
            //random và mã hóa mật khẩu
            let MATKHAU = Date.now().toString(36);
            let salt = await bcrypt.genSalt(10);
            let ecryptedMATKHAU = await bcrypt.hash(MATKHAU, salt);
            rs = await DB.query(`UPDATE TAIKHOAN SET MATKHAU = '${ecryptedMATKHAU}' WHERE TENDANGNHAP ='${req.body.TENDANGNHAP}'`)
            console.log("Cấp lại mật khẩu thành công, mật khẩu mới: " + MATKHAU);
            // res.send(json(true,"Cấp lại mật khẩu thành công, mật khẩu mới: " + MATKHAU))
            return;
        }
        //random và mã hóa mật khẩu
        let MATKHAU = Date.now().toString(36);
        let salt = await bcrypt.genSalt(10);
        let ecryptedMATKHAU = await bcrypt.hash(MATKHAU, salt);
        rs = await DB.query(`insert into TAIKHOAN(TENDANGNHAP,MATKHAU) values ('${req.body.TENDANGNHAP}','${ecryptedMATKHAU}')`)

        console.log("Cấp tài khoản thành công, mật khẩu:" + MATKHAU);
        // res.send(json(true, "Cấp tài khoản thành công, mật khẩu:" + MATKHAU))
    }

    doiMatKhau = async (req, res) => {
        let salt = await bcrypt.genSalt(10);
        req.body.MATKHAU = await bcrypt.hash(req.body.MATKHAU, salt);
        let rs = await DB.query(`UPDATE TAIKHOAN SET MATKHAU ='${req.body.MATKHAU}' WHERE TENDANGNHAP='${req.body.TENDANGNHAP}'`)
        console.log("Đổi mật khẩu tài khoản:" + req.body.TENDANGNHAP);
        // res.send(json())
    }
    khoaOrMoKhoaTaiKhoan = async (req, res) => {
        let rs = await DB.query(`SELECT * FROM TAIKHOAN WHERE TENDANGNHAP = '${req.body.TENDANGNHAP}'`)
        if (rs.length == 0) {
            console.log(json(false, "Nhân viên không có tài khoản"))
            // res.send(json(false, "Nhân viên không có tài khoản"))
            return;
        }
        if (rs[0].KHOA) {
            rs = await DB.query(`UPDATE TAIKHOAN SET KHOA ='false' WHERE TENDANGNHAP='${req.body.TENDANGNHAP}'`)
            console.log("Mở Khóa tài khoản:" + req.body.TENDANGNHAP);
            // res.send(json(true,"Đã mở khóa tài khoản: " + req.body.TENDANGNHAP))
            return;
        }
        rs = await DB.query(`UPDATE TAIKHOAN SET KHOA ='true' WHERE TENDANGNHAP='${req.body.TENDANGNHAP}'`)
        console.log("Khóa tài khoản:" + req.body.TENDANGNHAP);
        // res.send(json(true,"Đã khóa tài khoản: " + req.body.TENDANGNHAP))
    }
    dangNhap = async (req, res) => {
        let rs = await DB.query(`SELECT * FROM TAIKHOAN WHERE TENDANGNHAP = '${req.body.TENDANGNHAP}'`)
        if (rs.length == 0) {
            // res.send(json(false, "Tài khoản không tồn tại"));
            return json(false, "Tài khoản không tồn tại");
        }
        if (rs[0].KHOA) {
            // res.send(json(false, "Tài khoản đã bị khóa"));
            return json(false, "Tài khoản đã bị khóa");
        }
        rs = await bcrypt.compare(req.body.MATKHAU, rs[0].MATKHAU);
        console.log("Đăng nhập: " + rs);
        // res.send(json())
    }
}

module.exports = new TaiKhoanControllers