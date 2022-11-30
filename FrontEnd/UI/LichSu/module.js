import server from "../../server/main.js";

let btn_change_password = document.querySelector(".btn-change-password");
let btn_password_form = document.querySelector(".btn-password-form");
let change_password_input = document.getElementsByClassName(
    "change-password-input"
  );
// CHANGE PASSWORD
let data = {
  TENDANGNHAP: "",
  MATKHAUMOI: "",
};
btn_change_password.addEventListener("click", () => {
  popup_change_password[0].classList.add("show");
  btn_password_form.addEventListener("click", () => {
    data.TENDANGNHAP = change_password_input[0].value;
    data.MATKHAUMOI = change_password_input[1].value;
    console.log(data);
    server.TaiKhoan.doiMatKhau(data)
      .then((result) => {
        console.log(result);
        alert("Đổi mật khẩu thành công")
        popup_change_password[0].classList.remove("show");
      })
      .catch((err) => {});
  });
});

btn_cancel[0].addEventListener("click", () => {
  popup_change_password[0].classList.remove("show");
});

// GET LIST
server.LichSuVaoPhong.getList({})
  .then((result) => {
    let list = document.querySelector("#list");
    let out = "";
    console.log(result.data)
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
}).catch((err) => {});

