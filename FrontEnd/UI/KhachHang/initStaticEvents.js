import loadListKhachHang from "./loadListKhachHang.js";
import server from "../../server/main.js"
import uploadImg from "../../Image/main.js";


function initPopupBtns() {
  function showPopup(popupClass) {
    document.querySelector("." + popupClass).classList.add("show");
  }
  //POPUP thêm khách hàng
  const btn_add = document.querySelector(".btn-add");
  btn_add.addEventListener("click", () => {
    showPopup("popup-add");
  });
  //Popup Đổi mật khẩu
  const btn_change_password = document.querySelector(".btn-change-password");
  btn_change_password.addEventListener("click", () => {
    showPopup("popup-change-password");
  });

  // Tìm kiếm
  const searchBar = document.querySelector('.search-bar')
  searchBar.addEventListener("keyup", () => {
    let KEY = searchBar.value;
    if (KEY) {
      KEY = KEY.trim();
    }
    loadListKhachHang(KEY);
  })
}


function initThemKhachHang() {
  //Thêm khách hàng
  const imageInput_AddPopup = document.querySelector(".popup-add .image-input");
  const image_AddPopup = document.querySelector(".popup-add img");
  imageInput_AddPopup.addEventListener("change", () => {
    var file = imageInput_AddPopup.files[0];
    image_AddPopup.src = URL.createObjectURL(file);
  })
  const add_customer_form = document.querySelector("#add-customer-form");
  add_customer_form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const khachHang = Object.fromEntries(new FormData(e.target));
    if (khachHang.HOTEN.trim().length == 0) {
      alert("Họ tên không được để trống");
      return;
    }
    if (khachHang.NAMSINH.trim().length == 0) {
      alert("Năm sinh không được để trống");
      return;
    }
    if (khachHang.SDT.trim().length == 0) {
      alert("Số điện thoại không được để trống");
      return;
    }
    //nếu k có ảnh thì set ảnh mặc định

    if (khachHang.HINHANH.name != '')
      khachHang.HINHANH = await uploadImg(khachHang.HINHANH)
    else
      khachHang.HINHANH = "./defaultAvt.jpg"
    let rs = await server.KhachHang.themKhachHang(khachHang)

    if (!rs.status) {
      alert(rs.data);
      return
    }
    document.querySelector(".popup-add").classList.remove('show');
    alert("Thêm khách hàng thành công");
    loadListKhachHang();
  });

}

function initCapNhatKhachHang() {
  //Chỉnh sửa khách hàng
  const imageInput_UpdatePopup = document.querySelector(".popup-update .image-input");
  const image_UpdatePopup = document.querySelector(".popup-update img");
  imageInput_UpdatePopup.addEventListener("change", () => {
    var file = imageInput_UpdatePopup.files[0];
    image_UpdatePopup.src = URL.createObjectURL(file);
  })
  const update_customer_form = document.querySelector("#update-customer-form");
  update_customer_form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const khachHang = Object.fromEntries(new FormData(e.target));
    if (khachHang.HOTEN.trim().length == 0) {
      alert("Họ tên không được để trống");
      return;
    }
    if (khachHang.NAMSINH.trim().length == 0) {
      alert("Năm sinh không được để trống");
      return;
    }
    if (khachHang.SDT.trim().length == 0) {
      alert("Số điện thoại không được để trống");
      return;
    }
    //nếu k có ảnh thì set ảnh mặc định
    if (khachHang.HINHANH)
      khachHang.HINHANH = await uploadImg(khachHang.HINHANH)
    else
      khachHang.HINHANH = "./defaultAvt.jpg"
    let rs = await server.KhachHang.capNhatKhachHang(khachHang)
    if (!rs.status) {
      alert(rs.data);
      return
    }
    alert("Thêm khách hàng thành công");
    loadListKhachHang();
  });

}
function initXoaKhachHang() {

  const confirmDeleteBtn = document.querySelector(".btn-delete-form");
  confirmDeleteBtn.addEventListener("click", async (e) => {
    let rs = await server.KhachHang.xoaKhachHang({ MAKH: e.target.MAKH })
    if (!rs.status) {
      alert(rs.data);
      console.log(rs.data);
      return
    }
    document.querySelector(".popup-delete-confirm").classList.remove('show');
    alert("Xóa khách hàng thành công");
    loadListKhachHang();
  })
}
function initDangKiDichVu() {

}
export default function () {
  initPopupBtns();
  initThemKhachHang();
  initCapNhatKhachHang();
  initXoaKhachHang();
  initDangKiDichVu();
}