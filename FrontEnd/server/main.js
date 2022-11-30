import excute from "./Excutor.js";

class Server {
  TaiKhoan = {
    capTaiKhoanOrResetMatKhau(data = {}) {
      //key = TENDANGNHAP
      let api = 'http://localhost:8080/TaiKhoan/CapTaiKhoanOrResetMatKhau'
      return excute(api, data)
    },
    doiMatKhau(data = {}) {
      //key = TENDANGNHAP, MATKHAUMOI
      let api = 'http://localhost:8080/TaiKhoan/DoiMatKhau'
      return excute(api, data)
    },
    dangNhap(data = {}) {
      //key = TENDANGNHAP, MATKHAU
      let api = 'http://localhost:8080/TaiKhoan/DangNhap'
      return excute(api, data)
    },
    khoaOrMoKhoaTaiKhoan(data = {}) {
      //key = TENDANGNHAP
      let api = 'http://localhost:8080/TaiKhoan/KhoaOrMoKhoaTaiKhoan'
      return excute(api, data)
    }
  }
  NhanVien = {
    getList(data = {}) {
      //key = KEY or {}
      let api = 'http://localhost:8080/NhanVien/GetList'
      return excute(api, data)
    },
    themNhanVien(data = {}) {
      //key =  HOTEN, SDT, CHUCVU
      let api = 'http://localhost:8080/NhanVien/Insert'
      return excute(api, data)
    },
    capNhatNhanVien(data = {}) {
      //key = MANV, HOTEN, SDT, CHUCVU
      let api = 'http://localhost:8080/NhanVien/Update'
      return excute(api, data)
    },
    xoaNhanVien(data = {}) {
      //key = MANV
      let api = 'http://localhost:8080/NhanVien/Delete'
      return excute(api, data)
    }
  }
  KhachHang = {
    getList(data) {
      //key = KEY or {}
      let api = 'http://localhost:8080/KhachHang/GetList'
      return excute(api, data)
    },
    themKhachHang(data = {}) {
      //key = HOTEN, GIOITINH, NAMSINH, SDT, HINHANH
      let api = 'http://localhost:8080/KhachHang/Insert'
      return excute(api, data)
    },
    capNhatKhachHang(data = {}) {
      //key = MAKH, HOTEN, GIOITINH, NAMSINH, SDT, HINHANH
      let api = 'http://localhost:8080/KhachHang/Update'
      return excute(api, data)
    },
    xoaKhachHang(data = {}) {
      //key = MAKH
      let api = 'http://localhost:8080/KhachHang/Delete'
      return excute(api, data)
    },
    getListInbody(data = {}) {
      //key = MAKH
      let api = 'http://localhost:8080/KhachHang/Inbody'
      return excute(api, data)
    },
  }
  PhieuDangKy = {
    getList(data = {}) {
      //key = KEY
      let api = 'http://localhost:8080/PhieuDangKy/GetList'
      return excute(api, data)
    },
    dangKyDichVu(data = {}) {
      //key = TILEKM, TONGTIEN, MAKH, MANV, MADV
      let api = 'http://localhost:8080/PhieuDangKy/Create'
      return excute(api, data)
    },
    huyPhieuDangKy(data = {}) {
      //key =  MAPDK, MANVHUY
      let api = 'http://localhost:8080/PhieuDangKy/Cancel'
      return excute(api, data)
    },

  }
  PhieuThuTien = {
    thanhToan(data = {}) {
      //key =  SOTIENTHU, MAPDK, MANV
      let api = 'http://localhost:8080/PhieuThuTien/Insert'
      return excute(api, data)
    },
    detail(data = {}) {
      //key = MAPDK
      let api = 'http://localhost:8080/PhieuThuTien/Detail'
      return excute(api, data)
    },

  }
  DichVu = {
    getList(data = {}) {
      //key =  SOTIENTHU, MAPDK, MANV
      let api = 'http://localhost:8080/DichVu/GetList'
      return excute(api, data)
    },
    themDichVu(data = {}) {
      //key =  TENDV, SONGAYSUDUNG, GIA 
      let api = 'http://localhost:8080/DichVu/Insert'
      return excute(api, data)
    },
    capNhatDichVu(data = {}) {
      //key = MADV, TENDV, SONGAYSUDUNG, GIA, HIENHANH
      let api = 'http://localhost:8080/DichVu/Update'
      return excute(api, data)
    },
    xoaDichVu(data = {}) {
      //key = MADV
      let api = 'http://localhost:8080/DichVu/Delete'
      return excute(api, data)
    },

  }
  LichSuVaoPhong = {
    getList(data = {}) {
      //key =  KEY
      let api = 'http://localhost:8080/LichSu/GetList'
      return excute(api, data)
    },
    chiTiet(data = {}) {
      //key =  STT(ID lịch sử vào phòng)
      let api = 'http://localhost:8080/LichSu/Detail'
      return excute(api, data)
    }
  }
  ThongKe = {
    thongKeKhachHang(data = {}) {
      let api = 'http://localhost:8080/ThongKe/ThongKeKh'
      return excute(api, data)
    },
    thongKeDoanhThu(data = {}) {
      let api = 'http://localhost:8080/ThongKe/DoanhThu'
      return excute(api, data)
    },
    thongKeRaVao(data = {}) {
      //key = TUNGAY, DENNGAY
      let api = 'http://localhost:8080/ThongKe/RaVao'
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


