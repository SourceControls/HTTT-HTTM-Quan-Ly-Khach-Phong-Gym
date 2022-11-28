import loadListKhachHang from "./loadListKhachHang.js";


export default function initPopups() {
  const btn_add = document.querySelector(".btn-add");
  const btns_update = document.querySelectorAll(".btn-update");
  const btns_delete = document.querySelectorAll(".btn-delete");
  const btns_register = document.querySelectorAll(".btn-register");
  const btns_inbody = document.querySelectorAll(".btn-inbody");
  const btns_cancel = document.querySelectorAll(".btn-cancel-form");
  const btn_change_password = document.querySelector(".btn-change-password");
  const popups = document.querySelectorAll('.popup');

  function showPopup(popupClass) {
    document.querySelector("." + popupClass).classList.add("show");;
  }

  btn_add.addEventListener("click", () => {
    showPopup("popup-add");
  });
  btns_update.forEach((btn) => {
    btn.addEventListener("click", () => {
      showPopup("popup-update");
    });
  })
  btns_delete.forEach((btn) => {
    btn.addEventListener("click", () => {
      showPopup("popup-delete-confirm");
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

  btn_change_password.addEventListener("click", () => {
    showPopup("popup-change-password");
  });

  btns_cancel.forEach((btn) => {
    btn.addEventListener("click", () => {
      popups.forEach((popup) => {
        if (popup.classList.contains("show"))
          popup.classList.remove("show");
      })
    })
  })



  const searchBar = document.querySelector('.search-bar')
  const searchBtn = document.querySelector('.search-btn')
  searchBtn.addEventListener("click", () => {
    let KEY = searchBar.value;
    if (!KEY) {
      alert("Vui lòng nhập từ khóa");
      return;
    }
    KEY = KEY.trim();
    loadListKhachHang(KEY);
  })
}