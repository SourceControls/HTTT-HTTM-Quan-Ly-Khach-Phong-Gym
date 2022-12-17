import server from '../../server/main.js';
import initTogglePopup from "./initTogglePopup.js";

async function loadList(KEY) {
  const tblKhachHang = document.querySelector('.tbl-khachHang')
  var listKhachHang = await server.KhachHang.getList({ KEY })
  tblKhachHang.innerHTML = ""
  if (!listKhachHang.status) {
    return;
  }
  listKhachHang = listKhachHang.data;
  listKhachHang.forEach(e => {
    //set default image
    if (e.HINHANH.trim().length == 0) {
      e.HINHANH = "./defaultAvt.jpg"
    }
    tblKhachHang.innerHTML += `
               <tr id="${e.MAKH}">
                  <td>${e.MAKH}</td>
                  <td>${e.HOTEN}</td>
                  <td>${e.SDT}</td>
                  <td>${e.GIOITINH}</td>
                  <td>${e.NAMSINH}</td>
                  <td>${e.NGAYTHAMGIA}</td>
                  <td><img class="table-img" src="${e.HINHANH}" alt="AVT" /></td>
                  <td>
                    <div class="btn-container">
                      <i class="bx bxs-edit btn-update" title="Cập nhật thông tin"></i>
                      <i class="bx bx-trash btn-delete"  title="Xóa khách hàng"></i>
                      <i class="bx bx-notepad btn-register" title="Đăng kí dịch vụ"></i>
                      <i class="bx bx-history btn-inbody" title="Lịch sử inbody"></i>
                    </div>
                  </td>
                </tr>
    `
  });
}

export default async function loadListKhachHang(KEY) {
  await loadList(KEY);
  initTogglePopup();
}

