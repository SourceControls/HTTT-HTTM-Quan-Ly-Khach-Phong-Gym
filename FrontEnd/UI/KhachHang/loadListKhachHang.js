import server from '../../server/main.js';
import initPopupBtns from "./initPopupBtns.js";

export default async function loadListKhachHang(KEY) {

  const tblKhachHang = document.querySelector('.tbl-khachHang')
  var listKhachHang = await server.KhachHang.getList({ KEY })
  tblKhachHang.innerHTML = ""
  if (!listKhachHang.status) {
    return;
  }
  listKhachHang = listKhachHang.data;
  listKhachHang = listKhachHang.sort((a, b) => (a.MAKH > b.MAKH) ? -1 : 0);
  listKhachHang.forEach(e => {
    if (e.HINHANH.trim().length == 0) {
      e.HINHANH = "./defaultAvt.jpg"
      console.log("emptyimg");
    }
    tblKhachHang.innerHTML += `
               <tr id="${e.MAKH}">
                  <td>${e.MAKH}</td>
                  <td>${e.HOTEN}</td>
                  <td style="padding-left: 15px">${e.SDT}</td>
                  <td style="padding-left: 13px">${e.GIOITINH}</td>
                  <td style="padding-left: 15px">${e.NAMSINH}</td>
                  <td style="padding-left: 20px">${e.NGAYTHAMGIA}</td>
                  <td><img class="table-img" src="${e.HINHANH}" alt="AVT" /></td>
                  <td>
                    <div class="btn-container">
                      <i class="bx bxs-edit btn-update"></i>
                      <i class="bx bx-trash btn-delete"></i>
                      <i class="bx bx-notepad btn-register"></i>
                      <i class="bx bx-history btn-inbody"></i>
                    </div>
                  </td>
                </tr>
    `
  });
  initPopupBtns();
}