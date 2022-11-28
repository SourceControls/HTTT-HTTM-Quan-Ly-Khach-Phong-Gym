import server from "../../server/main.js";

let btn_change_password = document.querySelector(".btn-change-password");
let btn_view_payment = document.querySelector(".btn-view");
let btn_delete_form = document.querySelector(".btn-delete-form");
let btn_password_form = document.querySelector(".btn-password-form");
let change_password_input = document.getElementsByClassName(
  "change-password-input"
);

let panel_input = document.getElementsByClassName("panel-input");
let nv_delete_input = document.getElementsByClassName("nv-delete-input");
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
        alert("Đổi mật khẩu thành công");
        popup_change_password[0].classList.remove("show");
      })
      .catch((err) => {});
  });
});

btn_cancel[0].addEventListener("click", () => {
  popup_change_password[0].classList.remove("show");
});

// GET LIST
server.PhieuDangKy.getList({})
  .then((result) => {
    let list = document.querySelector("#list");
    let out = "";
    for (let record of result.data) {
      out += `
      <tr>
        <td style="padding-left: 3px;">${record.MAPDK}</td>
        <td style="padding-left: 3px;">${record.MAKH}</td>
        <td style="padding-left: 16px;">${record.HOTEN}</td>
        <td style="padding-left: 16px;">${record.SDT}</td>
        <td style="padding-left: 16px;">${record.TENDV}</td>
        <td style="padding-left: 20px;">${record.NGAYDK}</td>
        <td style="padding-left: 18px;">${record.NGAYBD}</td>
        <td style="padding-left: 20px;">${record.NGAYKT}</td>
        <td style="padding-left: 33px;">${record.TRANGTHAI}</td>
        <td style="padding-left: 33px;">${record.TONGTIEN}</td>
  </tr>
    `;
    }
    list.innerHTML = out;

    //   HIEN THI THONG TIN DUOI INPUT
    var rows = document.getElementsByTagName("tbody")[0].rows;
    for (let i = 0; i < rows.length; i++) {
      rows[i].addEventListener("click", () => {
        panel_input[0].value = rows[i].getElementsByTagName("td")[0].innerText;
        panel_input[1].value = rows[i].getElementsByTagName("td")[2].innerText;
      });
    }

    // XEM PHIEU THU TIEN
    btn_view_payment.addEventListener("click", () => {
      popup_view_payment[0].classList.add("show");
      server.PhieuThuTien.detail({ MAPDK: panel_input[0].value })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {});
    });

    btn_cancel[2].addEventListener("click", () => {
      popup_view_payment[0].classList.remove("show");
    });

    //HUY DANG KY
    btn_cancel_register.addEventListener("click", () => {
      console.log(panel_input[0].value);
      console.log(panel_input[1].value);
      if (
        panel_input[0].value.length == 0 &&
        panel_input[1].value.length == 0
      ) {
        alert("Vui lòng chọn phiếu đăng ký trước khi hủy!!");
        window.location.reload();
      } else if (
        panel_input[0].value.length != 0 &&
        panel_input[1].value.length != 0
      ) {
        popup_delete_confirm[0].classList.add("show");
        btn_delete_form.addEventListener("click", () => {
          server.PhieuDangKy.huyPhieuDangKy({
            MAPDK: panel_input[0].value,
            MANVHUY: nv_delete_input[0].innerText,
          })
            .then((result) => {
              console.log(result);
              popup_delete_confirm[0].classList.remove("show");
              alert(result.data)
              window.location.reload()
            })
            .catch((err) => {});
        });
      }
    });

    btn_cancel[3].addEventListener("click", () => {
      popup_delete_confirm[0].classList.remove("show");
    });
  })
  .catch((err) => {});
