
import initSideBar from "./initSideBar.js";
import initPopupSubmition from "./initPopupSubmition.js";
import loadListKhachHang from "./loadListKhachHang.js";
import server from "../../server/main.js";


async function initUser() {
  let nhanVienBox = document.querySelectorAll('.admin_name span');
  let nhanVien = (await server.NhanVien.getList({ KEY: window.localStorage.getItem('username') })).data[0]
  nhanVienBox[0].innerText = nhanVien.HOTEN;
  nhanVienBox[1].innerText = nhanVien.MANV + ' - ' + nhanVien.CHUCVU;
}

initSideBar();
initPopupSubmition();
loadListKhachHang();
initUser();
