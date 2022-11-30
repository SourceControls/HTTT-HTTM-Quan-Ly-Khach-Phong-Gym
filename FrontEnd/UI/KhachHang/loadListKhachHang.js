import server from '../../server/main.js';
import initDynamicEvents from "./initDynamicEvents.js";

async function loadList(KEY) {
  const tblKhachHang = document.querySelector('.tbl-khachHang')
  var listKhachHang = await server.KhachHang.getList({ KEY })
  tblKhachHang.innerHTML = ""
  if (!listKhachHang.status) {
    return;
  }
  listKhachHang = listKhachHang.data;
  listKhachHang = listKhachHang.sort((a, b) => (a.MAKH > b.MAKH) ? -1 : 0);
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
                      <i class="bx bxs-edit btn-update"></i>
                      <i class="bx bx-trash btn-delete"></i>
                      <i class="bx bx-notepad btn-register"></i>
                      <i class="bx bx-history btn-inbody"></i>
                    </div>
                  </td>
                </tr>
    `
  });
}

export default async function loadListKhachHang(KEY) {
  await loadList(KEY);
  initDynamicEvents();
}

