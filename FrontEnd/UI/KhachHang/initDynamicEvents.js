import loadListKhachHang from "./loadListKhachHang.js";
import server from "../../server/main.js"
import uploadImg from "../../Image/main.js";

function init() {
  const btns_update = document.querySelectorAll(".btn-update");
  const btns_delete = document.querySelectorAll(".btn-delete");
  const btns_register = document.querySelectorAll(".btn-register");
  const btns_inbody = document.querySelectorAll(".btn-inbody");
  const btns_cancel = document.querySelectorAll(".btn-cancel-form");
  const popups = document.querySelectorAll('.popup');

  function showPopup(popupClass) {
    document.querySelector("." + popupClass).classList.add("show");
  }
  btns_update.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      showPopup("popup-update");
      let idKH = e.target.parentElement.parentElement.parentElement.id;
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
      let idKH = e.target.parentElement.parentElement.parentElement.id;
      document.querySelector(".popup-delete-confirm .btn-delete-form").MAKH = idKH;
    });
  })
  btns_register.forEach((btn) => {
    btn.addEventListener("click", () => {
      showPopup("popup-register");
    });
  })
  btns_inbody.forEach((btn) => {
    btn.addEventListener("click", () => {
      showPopup("popup-inbody");
    });
  })

  //thoát popup
  btns_cancel.forEach((btn) => {
    btn.addEventListener("click", () => {
      popups.forEach((popup) => {
        if (popup.classList.contains("show"))
          popup.classList.remove("show");
      })
    })
  })
}


export default function initPopups() {
  init();


}



