import server from "../../server/main.js";

let search = document.querySelector(".search");
async function initNhanVien() {
  let nhanVienBox = document.querySelectorAll('.admin_name span');
  let nv_delete = document.querySelector('.nv-delete-input');
  let nv_pay = document.querySelectorAll('.pay-input')[5];
  let nhanVien = (await server.NhanVien.getList({ KEY: window.localStorage.getItem('username') })).data[0]
  nhanVienBox[0].innerText = nhanVien.HOTEN;
  nhanVienBox[1].innerText = nhanVien.MANV + ' - ' + nhanVien.CHUCVU;
  nv_delete.value = nhanVien.MANV
  nv_pay.value = nhanVien.MANV
}
initNhanVien()

let data = {
  TENDANGNHAP: "",
  MATKHAUMOI: "",
};


// GET LIST
server.PhieuDangKy.getList({ KEY: "" })
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
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10)
      dd = '0' + dd;
    if (mm < 10)
      mm = '0' + mm;
    today = dd + '/' + mm + '/' + yyyy;
    var rows = document.getElementsByTagName("tbody")[0].rows;
    for (let i = 0; i < rows.length; i++) {
      rows[i].addEventListener("click", () => {
        panel_input[0].value = rows[i].getElementsByTagName("td")[0].innerText;
        panel_input[1].value = rows[i].getElementsByTagName("td")[2].innerText;
        pay_input[0].value = rows[i].getElementsByTagName("td")[1].innerText;
        pay_input[1].value = rows[i].getElementsByTagName("td")[0].innerText;
        pay_input[2].value = today;
        pay_input[3].value = rows[i].getElementsByTagName("td")[4].innerText;
        pay_input[4].value = rows[i].getElementsByTagName("td")[9].innerText;
        pay_input[5].value = nv.innerText;
      });
    }

    // XEM PHIEU THU TIEN
    btn_view_payment.addEventListener("click", () => {
      if (panel_input[0].value.length == 0 && panel_input[1].value.length == 0)
        alert("Vui lòng chọn phiếu đăng ký");
      else {
        server.PhieuThuTien.detail({ MAPDK: panel_input[0].value })
          .then((result) => {
            if (result.status) {
              view_payment_input[0].innerText = Object.values(result.data[0])[0];
              view_payment_input[1].innerText = Object.values(result.data[0])[4];
              view_payment_input[2].innerText = Object.values(result.data[0])[2];
              view_payment_input[3].innerText = Object.values(result.data[0])[1];
              view_payment_input[4].innerText = Object.values(result.data[0])[5];
              view_payment_input[5].innerText = Object.values(result.data[0])[3];
              view_payment_input[6].innerText = Object.values(result.data[0])[6];
              popup_view_payment[0].classList.add("show");
            } else
              alert(result.data);
          })
          .catch((err) => { });
      }
    });



    //HUY DANG KY
    btn_cancel_register.addEventListener("click", () => {
      if (panel_input[0].value.length == 0 && panel_input[1].value.length == 0)
        alert("Vui lòng chọn phiếu đăng ký");
      else {
        popup_delete_confirm[0].classList.add("show");
        nv_delete_input[0].value = nv.innerText;
        btn_delete_form.addEventListener("click", () => {
          server.PhieuDangKy.huyPhieuDangKy({
            MAPDK: panel_input[0].value,
            MANVHUY: nv.innerText,
          })
            .then((result) => {
              if (result.status) {
                popup_delete_confirm[0].classList.remove("show");
                alert("Hủy đăng ký thành công");
                window.location.reload();
              } else {
                popup_delete_confirm[0].classList.remove("show");
                alert(result.data);
              }
            })
            .catch((err) => { });
        })
      }
    });

    //THANH TOAN
    btn_pay.addEventListener("click", () => {
      if (panel_input[0].value.length == 0 && panel_input[1].value.length == 0)
        alert("Vui lòng chọn phiếu đăng ký");
      else {
        console.log(pay_input[4].value)
        popup_payment[0].classList.add("show");
        btn_pay_form.addEventListener("click", () => {
          server.PhieuThuTien.thanhToan({
            SOTIENTHU: pay_input[4].value,
            MAPDK: panel_input[0].value,
            MANVHUY: nv.innerText
          })
            .then((result) => {
              if (result.status) {
                popup_payment[0].classList.remove("show");
                alert("Thanh toán thành công");
                window.location.reload();
              } else {
                popup_payment[0].classList.remove("show");
                alert(result.data);
              }
            })
            .catch((err) => { });
        })
      }
    });

  })
  .catch((err) => { });




search.addEventListener("keyup", () => {
  let KEY = search.value;
  if (KEY.length == 0)
    window.location.reload()
  else if (KEY) {
    KEY = KEY.trim();
    server.PhieuDangKy.getList({ "KEY": KEY })
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
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10)
          dd = '0' + dd;
        if (mm < 10)
          mm = '0' + mm;
        today = dd + '/' + mm + '/' + yyyy;
        var rows = document.getElementsByTagName("tbody")[0].rows;
        for (let i = 0; i < rows.length; i++) {
          rows[i].addEventListener("click", () => {
            panel_input[0].value = rows[i].getElementsByTagName("td")[0].innerText;
            panel_input[1].value = rows[i].getElementsByTagName("td")[2].innerText;
            pay_input[0].value = rows[i].getElementsByTagName("td")[1].innerText;
            pay_input[1].value = rows[i].getElementsByTagName("td")[0].innerText;
            pay_input[2].value = today;
            pay_input[3].value = rows[i].getElementsByTagName("td")[4].innerText;
            pay_input[4].value = rows[i].getElementsByTagName("td")[9].innerText;
            pay_input[5].value = nv.innerText;
          });
        }

        // XEM PHIEU THU TIEN
        btn_view_payment.addEventListener("click", () => {
          if (panel_input[0].value.length == 0 && panel_input[1].value.length == 0)
            alert("Vui lòng chọn phiếu đăng ký");
          else {
            server.PhieuThuTien.detail({ MAPDK: panel_input[0].value })
              .then((result) => {
                if (result.status) {
                  view_payment_input[0].innerText = Object.values(result.data[0])[0];
                  view_payment_input[1].innerText = Object.values(result.data[0])[2];
                  view_payment_input[2].innerText = Object.values(result.data[0])[4];
                  view_payment_input[3].innerText = Object.values(result.data[0])[1];
                  view_payment_input[4].innerText = Object.values(result.data[0])[5];
                  view_payment_input[5].innerText = Object.values(result.data[0])[3];
                  view_payment_input[6].innerText = Object.values(result.data[0])[6];
                  popup_view_payment[0].classList.add("show");
                } else
                  alert(result.data);
              })
              .catch((err) => { });
          }
        });



        //HUY DANG KY
        btn_cancel_register.addEventListener("click", () => {
          if (panel_input[0].value.length == 0 && panel_input[1].value.length == 0)
            alert("Vui lòng chọn phiếu đăng ký");
          else {
            popup_delete_confirm[0].classList.add("show");
            nv_delete_input[0].value = nv.innerText;
            btn_delete_form.addEventListener("click", () => {
              server.PhieuDangKy.huyPhieuDangKy({
                MAPDK: panel_input[0].value,
                MANVHUY: nv.innerText,
              })
                .then((result) => {
                  if (result.status) {
                    popup_delete_confirm[0].classList.remove("show");
                    alert("Hủy đăng ký thành công");
                    window.location.reload();
                  } else {
                    popup_delete_confirm[0].classList.remove("show");
                    alert(result.data);
                  }
                })
                .catch((err) => { });
            })
          }
        });

        //THANH TOAN
        btn_pay.addEventListener("click", () => {
          if (panel_input[0].value.length == 0 && panel_input[1].value.length == 0)
            alert("Vui lòng chọn phiếu đăng ký");
          else {
            console.log(pay_input[4].value)
            popup_payment[0].classList.add("show");
            btn_pay_form.addEventListener("click", () => {
              server.PhieuThuTien.thanhToan({
                SOTIENTHU: pay_input[4].value,
                MAPDK: panel_input[0].value,
                MANVHUY: nv.innerText
              })
                .then((result) => {
                  if (result.status) {
                    popup_payment[0].classList.remove("show");
                    alert("Thanh toán thành công");
                    window.location.reload();
                  } else {
                    popup_payment[0].classList.remove("show");
                    alert(result.data);
                  }
                })
                .catch((err) => { });
            })
          }
        });

      })
      .catch((err) => { });
  }
})