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
    btn.addEventListener("click", () => {
      showPopup("popup-update");
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



