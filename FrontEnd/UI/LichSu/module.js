import server from "../../server/main.js";

async function initNhanVien() {
  let nhanVienBox = document.querySelectorAll(".admin_name span");
  let nhanVien = (
    await server.NhanVien.getList({
      KEY: window.localStorage.getItem("username"),
    })
  ).data[0];
  console.log(nhanVienBox[0]);
  nhanVienBox[0].innerText = nhanVien.HOTEN;
  nhanVienBox[1].innerText = nhanVien.MANV + " - " + nhanVien.CHUCVU;
}
initNhanVien();

let search = document.querySelector(".search-box input");
let img = document.querySelector(".img-section img");
let input = document.querySelectorAll(".form-control");

let rows = document.getElementsByTagName("tbody")[0].rows;
let luot = document.querySelector(".text p");

//GET tong so luot trong ngay: 
function tinhTongSoLuotTrongNgay(listLichSu) {
  let tongSoLuot = 0;
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = dd + '/' + mm + '/' + yyyy;
  listLichSu.forEach(e => {
    if (today == e.NGAYGIO.trim()) {
      tongSoLuot++;
    }
  });
  return tongSoLuot
}

// GET LIST

server.LichSuVaoPhong.getList({ KEY: "" })
  .then((result) => {
    let list = document.querySelector("#list");
    let out = "";
    for (let record of result.data) {
      out += `
      <tr>
      <td>${record.STT}</td>
      <td>${record.MAKH}</td>
      <td>${record.HOTEN}</td>
      <td>${record.GIOITINH}</td>
      <td>${record.NGAYGIO}</td>
  </tr>
    `;
    }
    list.innerHTML = out;
    // async function img(data) {
    //   if (data.HINHANH != "") data.HINHANH = await uploadImg(data.HINHANH);
    //   else data.HINHANH = document.querySelector(".popup-add img").src;
    // }
    // // THEM SAN PHAM
    // const imageInput_AddPopup = document.querySelector(
    //   ".popup-add .image-input"
    // );
    // const image_AddPopup = document.querySelector(".popup-add img");
    // imageInput_AddPopup.addEventListener("change", () => {
    //   var file = imageInput_AddPopup.files[0];
    //   image_AddPopup.src = URL.createObjectURL(file);
    // });
    luot.innerText = tinhTongSoLuotTrongNgay(result.data);
    for (let i = 0; i < rows.length; i++) {
      rows[i].addEventListener("click", () => {
        server.LichSuVaoPhong.chiTiet({ STT: result.data[i].STT })
          .then((result2) => {
            console.log(result2);
            input[0].value = result2.data[0].MAKH;
            input[1].value = result2.data[0].HOTEN;
            input[2].value = result2.data[0].NGAYTHAMGIA;
            input[3].value = result2.data[0].MAPDK;
            input[4].value = result2.data[0].TENDV;
            input[5].value = result2.data[0].NGAYKT;
            img.src = result2.data[0].HINHANH;
          })
          .catch((err) => { });
      });
    }
  })
  .catch((err) => { });

search.addEventListener("keyup", () => {
  let KEY = search.value;
  if (KEY.length == 0) window.location.reload();
  else if (KEY) {
    KEY = KEY.trim();
    server.LichSuVaoPhong.getList({
      KEY: KEY,
    })
      .then((result) => {
        let list = document.querySelector("#list");
        let out = "";
        for (let record of result.data) {
          out += `
      <tr>
      <td >${record.STT}</td>
      <td>${record.MAKH}</td>
      <td>${record.HOTEN}</td>
      <td>${record.GIOITINH}</td>
      <td>${record.NGAYGIO}</td>
  </tr>
    `;
        }
        list.innerHTML = out;
        console.log(rows.length);
      })
      .catch((err) => { });
  }
});
