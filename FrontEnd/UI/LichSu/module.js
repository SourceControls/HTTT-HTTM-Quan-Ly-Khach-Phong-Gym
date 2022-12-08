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

// GET LIST

server.LichSuVaoPhong.getList({ KEY: "" })
  .then((result) => {
    let list = document.querySelector("#list");
    let out = "";
    for (let record of result.data) {
      out += `
      <tr>
      <td style="padding-left: 10px;">${record.STT}</td>
      <td style="padding-left: 8px;">${record.MAKH}</td>
      <td style="padding-left: 8px;">${record.HOTEN}</td>
      <td style="padding-left: 20px;">${record.GIOITINH}</td>
      <td style="padding-left: 18px;">${record.NGAYGIO}</td>
      <td style="padding-left: 18px;">${record.TONG}</td>
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
    luot.innerText = Number(rows.length);
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
          .catch((err) => {});
      });
    }
  })
  .catch((err) => {});

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
      <td style="padding-left: 10px;">${record.STT}</td>
      <td style="padding-left: 8px;">${record.MAKH}</td>
      <td style="padding-left: 8px;">${record.HOTEN}</td>
      <td style="padding-left: 20px;">${record.GIOITINH}</td>
      <td style="padding-left: 18px;">${record.NGAYGIO}</td>
      <td style="padding-left: 18px;">${record.TONG}</td>
  </tr>
    `;
        }
        list.innerHTML = out;
        console.log(rows.length);
        luot.innerText = Number(rows.length);
      })
      .catch((err) => {});
  }
});
