import server from "../../server/main.js"
import { initBtnSubmitMuaHang } from "./initPopupSubmition.js";

var lastInbodyID = -1;


function showPopup(popupClass) {
  document.querySelector(".container").setAttribute("style", "filter: brightness(0.6) blur(3px);");
  document.querySelector("." + popupClass).classList.add("show");
}
function getParentId(e) {
  return e.target.parentElement.parentElement.parentElement.id;
}

export default function init() {
  const btns_update = document.querySelectorAll(".btn-update");
  const btns_delete = document.querySelectorAll(".btn-delete");
  const btns_register = document.querySelectorAll(".btn-register");
  const btns_inbody = document.querySelectorAll(".btn-inbody");
  const btns_cancel = document.querySelectorAll(".btn-cancel-form");
  const popups = document.querySelectorAll('.popup');
  const btn_add = document.querySelector(".btn-add");
  const btn_chon_TPBS = document.querySelector(".btn-chon-TPBS");
  //Show
  btn_add.addEventListener("click", () => {
    showPopup("popup-add");
  });
  btn_chon_TPBS.addEventListener("click", async () => {
    let tblTPBS = document.querySelectorAll(".tbl-thucPhamBoSung")[1];
    console.log(tblTPBS);
    let listTPBS = (await server.ThucPhamBoSung.getList()).data;
    tblTPBS.innerHTML = '';
    listTPBS.forEach(e => {
      tblTPBS.innerHTML += `
      <tr>
          <td style="width: 10%">${e.MASP}</td>
          <td>${e.TENSP}</td>
          <td style="width: 40%">
            ${e.MOTA}
          </td>
          <td style="position: relative">
            <img
              class="table-img"
              src="${e.HINHANH}"
              alt="ANHSP" />
            <i class="bx bxs-cart-add btn-muahang" id="${lastInbodyID}.${e.MASP}" title="Ghi nhận mua hàng"></i>
          </td>
      </tr>
                `
    })
    initBtnSubmitMuaHang(false);
    showPopup("popup-TPBS");
    document.querySelector(".popup-inbody").classList.remove('show');
  })
  btns_update.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      showPopup("popup-update");
      let idKH = getParentId(e);
      document.querySelector(".popup-update .btn-update-form").MAKH = idKH;

      //load infor khách hàng lên form
      let khachHang = await server.KhachHang.getList({ KEY: idKH });
      khachHang = khachHang.data[0];
      if (khachHang.HINHANH.trim().length == 0) {
        khachHang.HINHANH = './defaultAvt.jpg'
      }
      document.querySelector(".popup-update .MAKH").innerText = khachHang.MAKH.trim();
      document.querySelector(".popup-update .NGAYTHAMGIA").innerText = khachHang.NGAYTHAMGIA.trim();
      document.querySelector(".popup-update .HOTEN").value = khachHang.HOTEN.trim();
      document.querySelector(".popup-update .SDT").value = khachHang.SDT.trim();
      document.querySelector(".popup-update .NAMSINH").value = khachHang.NAMSINH.trim();
      document.querySelector(".popup-update .HINHANH").value = '';
      document.querySelector(".popup-update img").src = khachHang.HINHANH.trim();
      if (khachHang.GIOITINH.toUpperCase().trim() == "NAM") {
        document.querySelectorAll(".popup-update .GIOITINH")[0].checked = true;
      }
      else {
        document.querySelectorAll(".popup-update .GIOITINH")[1].checked = true;
      }
    });
  })
  btns_delete.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      showPopup("popup-delete-confirm");
      let idKH = getParentId(e);
      document.querySelector(".popup-delete-confirm .btn-delete-form").MAKH = idKH;
    });
  })
  btns_register.forEach((btn) => {
    btn.addEventListener("click", async (e) => {

      //load thông tin khách hàng
      let idKH = getParentId(e);
      let khachHang = await server.KhachHang.getList({ KEY: idKH });
      khachHang = khachHang.data[0];
      if (khachHang.HINHANH.trim().length == 0) {
        khachHang.HINHANH = './defaultAvt.jpg'
      }
      document.querySelector(".popup-register .MAKH").value = idKH;
      document.querySelector(".popup-register .MANV").value = 'NV00000001';
      document.querySelector(".popup-register img").src = khachHang.HINHANH.trim();
      //load thông tin dịch vụ
      let dichVu = await server.DichVu.getList();
      let dichVuDropDown = document.querySelector(".listDichVu");
      dichVuDropDown.innerHTML = '';
      let tileKMInput = document.querySelector('.TILEKM');
      //load data vào dropdown

      dichVu.data.forEach(dichVu => {
        if (!dichVu.HIENHANH)
          return;
        let option = document.createElement("option");
        option.text = dichVu.TENDV;
        option.value = dichVu.MADV;
        option.gia = dichVu.GIA;
        dichVuDropDown.add(option);
        document.querySelector(".giaDichVu").value = dichVuDropDown.selectedOptions[0].gia.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
        tinhTongTien()
      })

      function tinhTongTien() {
        let tileKM = tileKMInput.value;
        if (!isNumber(tileKM)) {
          tileKMInput.value = 0;
          tileKM = 0;
        }
        if (tileKM > 100) {
          tileKMInput.value = 100;
          tileKM = 100;
        }
        if (tileKM < 0) {
          tileKMInput.value = 0;
          tileKM = 0;
        }

        document.querySelector(".giaDichVu").value = (dichVuDropDown.selectedOptions[0].gia).toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
        document.querySelector(".TONGTIEN").value = (dichVuDropDown.selectedOptions[0].gia * (1 - tileKM / 100)).toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
      }
      function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }
      //hiển thị lại giá và tính lại tổng tiền mỗi khi chọn dv
      dichVuDropDown.addEventListener("change", () => {
        tinhTongTien()
      })
      //tính lại tổng tiền khi đổi khuyến mại
      tileKMInput.addEventListener("change", () => {
        tinhTongTien()
      })
      showPopup("popup-register");
    });
  })
  btns_inbody.forEach((btn) => {
    //tải list inbody
    btn.addEventListener("click", async (e) => {
      let idKH = getParentId(e);
      let khachHang = (await server.KhachHang.getList({ KEY: idKH })).data[0];
      if (khachHang.HINHANH.trim().length == 0)
        khachHang.HINHANH = './defaultAvt.jpg'
      document.querySelector('.popup-inbody .MAKH').innerText = idKH;
      document.querySelector('.popup-inbody img').src = khachHang.HINHANH;
      document.querySelector('.popup-inbody .HOTEN').innerText = khachHang.HOTEN;
      //add inbody row
      let lichSuInbody = (await server.KhachHang.getListInbody({ MAKH: idKH })).data;
      let tblLichSuInbody = document.querySelector('.inbody-table tbody');
      tblLichSuInbody.innerHTML = '';
      lichSuInbody.forEach(e => {
        let row = tblLichSuInbody.insertRow(-1);

        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);
        let cell7 = row.insertCell(6);
        cell1.innerHTML = e.NGAYGIO
        cell2.innerHTML = e.CHIEUCAO
        cell3.innerHTML = e.CANNANG
        cell4.innerHTML = e.TILE_MO
        cell5.innerHTML = e.TILE_NUOC
        cell6.innerHTML = e.KHOILUONG_CO
        cell7.innerHTML = e.BMI.toFixed(1)
      })
      let lastInbody = lichSuInbody[lichSuInbody.length - 1];
      // lastInbody.
      lastInbody.TILEMO = lastInbody.TILE_MO;
      lastInbody.TILECO = (lastInbody.KHOILUONG_CO * 100 / lastInbody.CANNANG).toFixed(2);
      lastInbodyID = lastInbody.STT;
      let listSPGoiY = await server.KhachHang.recommend(lastInbody)
      let tblSPGoiY = document.querySelector('.inbody-recomend tbody');
      tblSPGoiY.innerHTML = '';
      listSPGoiY.forEach(async (e) => {
        let sp = (await server.ThucPhamBoSung.getList({ KEY: e.MASP })).data;
        //add thuc pham bo sung row
        sp.forEach(e => {
          //thêm sản phẩm vào
          tblSPGoiY.innerHTML += `
            <tr>
                  <td style="width: 10%">${e.MASP}</td>
                  <td>${e.TENSP}</td>
                  <td style="width: 40%">
                    ${e.MOTA}
                  </td>
                  <td style="position: relative">
                    <img
                      class="table-img"
                      src="${e.HINHANH}"
                      alt="ANHSP" />
                    <i class="bx bxs-cart-add btn-muahang-suggest" id="${lastInbody.STT}.${e.MASP}" title="Ghi nhận mua hàng"></i>
                  </td>
                </tr>
          `
        })
        initBtnSubmitMuaHang();

      });
      showPopup("popup-inbody");
    });
  })

  //hide popup
  btns_cancel.forEach((btn) => {
    btn.addEventListener("click", () => {
      popups.forEach((popup) => {
        if (popup.classList.contains("show")) {
          popup.classList.remove("show");
          document.querySelector(".container  ").setAttribute("style", " filter: brightness(1) blur(0px);");
        }
      })
    })
  })
}





