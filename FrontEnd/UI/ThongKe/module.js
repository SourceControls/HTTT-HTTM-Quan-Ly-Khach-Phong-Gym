import server from "../../server/main.js";

async function initNhanVien() {
    let nhanVienBox = document.querySelectorAll('.admin_name span');
    let nhanVien = (await server.NhanVien.getList({ KEY: window.localStorage.getItem('username') })).data[0]
    nhanVienBox[0].innerText = nhanVien.HOTEN;
    nhanVienBox[1].innerText = nhanVien.MANV + ' - ' + nhanVien.CHUCVU;
  }
  initNhanVien()

let btnFilterDT = document.querySelector(".btn-filterDT")
let KH = document.querySelectorAll(".text-block p")[0]
let KHcu = document.querySelectorAll(".text-block p")[1]
let KHmoi = document.querySelectorAll(".text-block p")[2]

server.ThongKe.thongKeKhachHang()
    .then((result) => {
      KH.innerText = result.data[0].TONGKH
      KHcu.innerText = result.data[0].TONGKHCU
      KHmoi.innerText = result.data[0].TONGKHMOI
    })
    .catch((err) => { });


 btnFilterDT.addEventListener("click",()=>{
  let to = document.querySelector("#toDT").value
  let from = document.querySelector("#fromDT").value
    server.ThongKe.thongKeDoanhThu({'TUNGAY': from, 'DENNAGY': to})
    .then((result) => {
      console.log(result.data)
      let list = document.querySelector("#list");
      let out = "";
      for (let record of result.data) {
        out += `
        <tr>
              <td>${record.MAKH}</td>
              <td>${record.HOTEN}</td>
              <td style="padding-left: 22px">${record.SDT}</td>
              <td style="padding-left: 20px">${record.TONGDOANHTHU.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
        </tr>
      `;
      }
      list.innerHTML = out;
    })
    .catch((err) => { });
 })
  