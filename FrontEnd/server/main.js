import excute from "./Excutor.js";

class Server {
  TaiKhoan = {
    capTaiKhoanOrResetMatKhau(data) {
      //key = TENDANGNHAP
      let api = 'http://localhost:8080/TaiKhoan/CapTaiKhoanOrResetMatKhau'
      return excute(api, data)
    },
    doiMatKhau(data) {
      //key = TENDANGNHAP, MATKHAUMOI
      let api = 'http://localhost:8080/TaiKhoan/DoiMatKhau'
      return excute(api, data)
    },
    dangNhap(data) {
      //key = TENDANGNHAP, MATKHAU
      let api = 'http://localhost:8080/TaiKhoan/DangNhap'
      return excute(api, data)
    }
  }
  NhanVien = {
    getList(data) {
      //key = KEY
      let api = 'http://localhost:8080/NhanVien/GetList'
      return excute(api, data)
    }
  }

}


export default new Server();

// let insertData = {
//   MAGV: 'GV01',
//   HOTEN: 'Bùi Tuấn Hùng',
//   EMAIL: 'Hungbuituan1@gmail.com',
//   SDT: '0973343541'
//  } 


