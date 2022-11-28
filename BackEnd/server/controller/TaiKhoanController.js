const json = require('../components/json');
// const bcrypt = require('bcrypt');
const TaiKhoan = require('../modules/TaiKhoan');

class TaiKhoanControllers {
    index(req, res) {
        res.send('TaiKhoan')
    }
    capTaiKhoanOrResetMatKhau = async (req, res) => {
        //có tài khoản rồi thì sẽ chuyển qua resetmk
        let TENDANGNHAP = req.body.TENDANGNHAP;
        let rs = await TaiKhoan.selectTaiKhoan(TENDANGNHAP);
        if (rs.length > 0) {
            //random và mã hóa mật khẩu
            let MATKHAU = Date.now().toString(36);
            let salt = await bcrypt.genSalt(10);
            let encryptedMATKHAU = await bcrypt.hash(MATKHAU, salt);
            rs = await TaiKhoan.updateTaiKhoan(TENDANGNHAP, encryptedMATKHAU);
            console.log("Cấp lại mật khẩu thành công, mật khẩu mới: " + MATKHAU);
            res.send(json(true, "Cấp lại mật khẩu thành công, mật khẩu mới: " + MATKHAU))
            return;
        }
        let MATKHAU = Date.now().toString(36);
        let salt = await bcrypt.genSalt(10);
        let encryptedMATKHAU = await bcrypt.hash(MATKHAU, salt);
        rs = await TaiKhoan.insertTaiKhoan(new TaiKhoan(TENDANGNHAP, encryptedMATKHAU));

        console.log("Cấp tài khoản thành công, mật khẩu:" + MATKHAU);
        res.send(json(true, "Cấp tài khoản thành công, mật khẩu:" + MATKHAU))
    }

    doiMatKhau = async (req, res) => {
        let salt = await bcrypt.genSalt(10);
        let TENDANGNHAP = req.body.TENDANGNHAP;
        let MATKHAU = await bcrypt.hash(req.body.MATKHAUMOI, salt);
        let rs = await TaiKhoan.updateTaiKhoan(TENDANGNHAP, MATKHAU)
        console.log("Đổi mật khẩu tài khoản:" + TENDANGNHAP);
        res.send(json())
    }
    khoaOrMoKhoaTaiKhoan = async (req, res) => {
        let TENDANGNHAP = req.body.TENDANGNHAP;
        let rs = await TaiKhoan.selectTaiKhoan(TENDANGNHAP);
        if (rs.length == 0) {
            console.log(json(false, "Nhân viên không có tài khoản"))
            res.send(json(false, "Nhân viên không có tài khoản"))
            return;
        }
        //mở khóa
        if (rs[0].KHOA) {
            rs = await TaiKhoan.updateTaiKhoan(TENDANGNHAP, '', false);
            console.log("Mở Khóa tài khoản:" + TENDANGNHAP);
            res.send(json(true, "Đã mở khóa tài khoản: " + TENDANGNHAP))
            return;
        }
        //khóa
        rs = await TaiKhoan.updateTaiKhoan(TENDANGNHAP, '', true);
        console.log("Khóa tài khoản:" + TENDANGNHAP);
        res.send(json(true, "Đã khóa tài khoản: " + TENDANGNHAP))
    }
    dangNhap = async (req, res) => {
        let rs = await TaiKhoan.selectTaiKhoan(req.body.TENDANGNHAP);
        if (rs.length == 0) {
            res.send(json(false, "Tài khoản không tồn tại"));
            return json(false, "Tài khoản không tồn tại");
        }
        if (rs[0].KHOA) {
            res.send(json(false, "Tài khoản đã bị khóa"));
            return json(false, "Tài khoản đã bị khóa");
        }
        rs = await bcrypt.compare(req.body.MATKHAU, rs[0].MATKHAU);
        console.log("Đăng nhập: " + rs);
        res.send(json())
    }
}

module.exports = new TaiKhoanControllers