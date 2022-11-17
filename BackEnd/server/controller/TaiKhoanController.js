const DB = require('../components/SqlDB')
const json = require('../components/json');
const bcrypt = require('bcrypt');


class TaiKhoanControllers {
    index(req, res) {
        res.send('TaiKhoan')
    }
    capTaiKhoan = async (req, res) => {
        //có tài khoản rồi thì không cấp cho nữa
        let rs = await DB.query(`SELECT * FROM TAIKHOAN WHERE TENDANGNHAP = '${req.body.TENDANGNHAP}'`)
        if (rs.length > 0) {
            // res.send(json(false, "Nhân viên đã có tài khoản trước đó"))
            return json(false, "Nhân viên đã có tài khoản trước đó");
        }
        //random và mã hóa mật khẩu
        let MATKHAU = Date.now().toString(36);
        let salt = await bcrypt.genSalt(10);
        let ecryptedMATKHAU = await bcrypt.hash(MATKHAU, salt);
        rs = await DB.query(`insert into TAIKHOAN(TENDANGNHAP,MATKHAU) values ('${req.body.TENDANGNHAP}','${ecryptedMATKHAU}')`)

        console.log("Cấp tài khoản:" + MATKHAU);
        // res.send(json(true, MATKHAU))
    }
    capLaiMatKhau = async (req, res) => {

        let rs = await DB.query(`SELECT * FROM TAIKHOAN WHERE TENDANGNHAP = '${req.body.TENDANGNHAP}'`)
        if (rs.length == 0) {
            // res.send(json(false, "Nhân viên chưa có tài khoản"))
            return json(false, "Nhân viên chưa có tài khoản");
        }

        //random và mã hóa mật khẩu
        let MATKHAU = Date.now().toString(36);
        let salt = await bcrypt.genSalt(10);
        let ecryptedMATKHAU = await bcrypt.hash(MATKHAU, salt);
        rs = await DB.query(`UPDATE TAIKHOAN SET MATKHAU = '${ecryptedMATKHAU}' WHERE TENDANGNHAP ='${req.body.TENDANGNHAP}'`)

        console.log("Cấp lại mật khẩu:" + MATKHAU);
        // res.send(json(true,MATKHAU))
    }
    doiMatKhau = async (req, res) => {
        let salt = await bcrypt.genSalt(10);
        req.body.MATKHAU = await bcrypt.hash(req.body.MATKHAU, salt);
        let rs = await DB.query(`UPDATE TAIKHOAN SET MATKHAU ='${req.body.MATKHAU}' WHERE TENDANGNHAP='${req.body.TENDANGNHAP}'`)
        console.log("Đổi mật khẩu tài khoản:" + req.body.TENDANGNHAP);
        // res.send(json())
    }
    khoaTaiKhoan = async (req, res) => {
        let rs = await DB.query(`SELECT * FROM TAIKHOAN WHERE TENDANGNHAP = '${req.body.TENDANGNHAP}'`)
        if (rs.length == 0) {
            // res.send(json(false, "Nhân viên không có tài khoản"))
            return json(false, "Nhân viên không có tài khoản");
        }
        if (rs[0].KHOA) {
            // res.send(json(false, "Tài khoản đã bị khóa trước đó"));
            return json(false, "Tài khoản đã bị khóa trước đó");
        }
        rs = await DB.query(`UPDATE TAIKHOAN SET KHOA ='true' WHERE TENDANGNHAP='${req.body.TENDANGNHAP}'`)
        console.log("Khóa tài khoản:" + req.body.TENDANGNHAP);
        // res.send(json())
    }
    moKhoaTaiKhoan = async (req, res) => {
        let rs = await DB.query(`SELECT * FROM TAIKHOAN WHERE TENDANGNHAP = '${req.body.TENDANGNHAP}'`)
        if (rs.length == 0) {
            // res.send(json(false, "Nhân viên không có tài khoản"))
            return json(false, "Nhân viên không có tài khoản");
        }
        if (rs[0].KHOA == false) {
            // res.send(json(false, "Tài khoản không bị khóa"));
            return json(false, "Tài khoản không bị khóa");
        }
        rs = await DB.query(`UPDATE TAIKHOAN SET KHOA ='false' WHERE TENDANGNHAP='${req.body.TENDANGNHAP}'`)
        console.log("Mở Khóa tài khoản:" + req.body.TENDANGNHAP);
        // res.send(json())
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