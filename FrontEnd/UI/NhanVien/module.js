import server from "../../server/main.js";


server.NhanVien.getList({})
  .then((result) => {
    let list = document.querySelector("#NhanVienList");
    let out = "";
    for (let nv of result.data) {
      out += `
    <tr>
       <td>${nv.MANV}</td>
       <td>${nv.HOTEN}</td>
       <td style="padding-left: 15px;">${nv.SDT}</td>
       <td style="padding-left: 16px;">${nv.CHUCVU}</td>
       <td style="padding-left: 20px;">${nv.TAIKHOAN}</td>
        <td>
            <div class="btn-container">
                <i class='bx bxs-edit btn-edit'></i>
                <i class='bx bx-trash btn-delete'></i>
                <i class='bx bx-user-plus btn-account'></i>
                <i class='bx bx-lock btn-lock' ></i>
            </div>
        </td>
    </tr>
    `;
    }
    list.innerHTML = out;
    // BTN
    let btn_account = document.querySelectorAll(".btn-account");
    let btn_cancel = document.querySelectorAll(".btn-cancel-form");
    let btn_add = document.querySelector(".btn-add");
    let btn_edit = document.querySelectorAll(".btn-edit");
    let btn_delete = document.querySelectorAll(".btn-delete");
    let btn_lock = document.querySelectorAll(".btn-lock");
    let btn_change_password = document.querySelector(".btn-change-password");
    let btn_password_form = document.querySelector(".btn-password-form");
    let btn_update_form = document.querySelector(".btn-update-form");
    let btn_add_form = document.querySelector(".btn-add-form");
    let btn_lock_form = document.querySelector(".btn-lock-form");
    let btn_unlock_form = document.querySelector(".btn-unlock-form");
    let btn_notTK_form = document.querySelector(".btn-notTK-form");
    let btn_delete_form = document.querySelector(".btn-delete-form");

    // POPUP
    let popup_edit = document.getElementsByClassName("popup-update");
    let popup_create_account = document.getElementsByClassName(
      "popup-create-account"
    );
    let popup_reset = document.getElementsByClassName("popup-reset-password");
    let popup_add = document.getElementsByClassName("popup-add");
    let popup_delete_confirm = document.getElementsByClassName(
      "popup-delete-confirm"
    );
    let popup_lock = document.getElementsByClassName("popup-lock");
    let popup_unlock = document.getElementsByClassName("popup-unlock");
    let popup_notTK = document.getElementsByClassName("popup-notTK");
    // INPUT
    let reset_pass = document.getElementsByClassName("reset-pass");
    let reset_name = document.getElementsByClassName("reset-name");
    let update_input = document.getElementsByClassName("update-input");
    let add_input = document.getElementsByClassName("add-input");
    let create_pass = document.getElementsByClassName("create-pass");
    let change_password_input = document.getElementsByClassName(
      "change-password-input"
    );
    let create_name = document.getElementsByClassName("create-name");

    function getChucVu() {
      if (update_input[3].checked || add_input[2].checked) return "QUANLY";
      else return "TIEPTAN";
    }



    // THEM NHAN VIEN
    btn_add.addEventListener("click", () => {
      popup_add[0].classList.add("show");
      btn_add_form.addEventListener("click", () => {
        let data3 = {
          HOTEN: add_input[0].value,
          SDT: add_input[1].value,
          CHUCVU: getChucVu(),
        };
        console.log(data3);
        server.NhanVien.themNhanVien(data3)
          .then((result) => {
            console.log(result);
            popup_add[0].classList.remove("show");
            // window.location.reload()
          })
          .catch((err) => {});
      });
    });
    
    var rows = document.getElementsByTagName("tbody")[0].rows;

    // CAP NHAT NHAN VIEN
    for (var i = 0; i < btn_edit.length; i++) {
      let x = i;
      btn_edit[i].addEventListener("click", (event) => {
        popup_edit[0].classList.add("show");
        var td = rows[x].getElementsByTagName("td")[0].innerText;
        update_input[0].value = td;
        btn_update_form.addEventListener("click", () => {
          let data3 = {
            MANV: td,
            HOTEN: update_input[1].value,
            SDT: update_input[2].value,
            CHUCVU: getChucVu(),
          };
          console.log(data3);
          server.NhanVien.capNhatNhanVien(data3)
            .then((result) => {
              console.log(result);
              alert("Cập nhật nhân viên thành công")
              window.location.reload();
              popup_edit[0].classList.remove("show");
            })
            .catch((err) => {});
        });
      });
    }

    // CAP TK AND OR RESET MK
    for (var i = 0; i < btn_account.length; i++) {
      let x = i;
      btn_account[i].addEventListener("click", (event) => {
        var td = rows[x].getElementsByTagName("td")[0].innerText;

        let data1 = {
          TENDANGNHAP: td,
        };

        server.TaiKhoan.capTaiKhoanOrResetMatKhau(data1)
          .then((result) => {
            console.log(result);
            if (result.data.includes("Cấp lại mật khẩu")) {
              popup_reset[0].classList.add("show");
              reset_pass[0].value = result.data.split(": ")[1];
              reset_name[0].value = data1.TENDANGNHAP;
            } else {
              popup_create_account[0].classList.add("show");
              create_pass[0].value = result.data.split(":")[1];
              create_name[0].value = data1.TENDANGNHAP;
            }
          })
          .catch((err) => {});
      });
    }

    // XOA NHAN VIEN
    for (var i = 0; i < btn_delete.length; i++) {
      let x = i;
      btn_delete[i].addEventListener("click", (event) => {
        popup_delete_confirm[0].classList.add("show");
        var td = rows[x].getElementsByTagName("td")[0].innerText;
        btn_delete_form.addEventListener("click", () => {
          let data4 = {
            MANV: td,
          };
          console.log(data4);
          server.NhanVien.xoaNhanVien(data4)
            .then((result) => {
              console.log(result);
              alert("Xóa nhân viên thành công")
              window.location.reload();
              popup_delete_confirm[0].classList.remove("show");
            })
            .catch((err) => {});
        });
      });
    }
    // CHANGE PASSWORD
    let data2 = {
      TENDANGNHAP: "",
      MATKHAUMOI: "",
    };
    btn_change_password.addEventListener("click", () => {
      popup_change_password[0].classList.add("show");
      btn_password_form.addEventListener("click", () => {
        data2.TENDANGNHAP = change_password_input[0].value;
        data2.MATKHAUMOI = change_password_input[1].value;
        console.log(data2);
        server.TaiKhoan.doiMatKhau(data2)
          .then((result) => {
            console.log(result);
            alert(result.data)
            popup_change_password[0].classList.remove("show");
          })
          .catch((err) => {});
      });
    });

        // LOCK/UNLOCK TK
        for (var i = 0; i < btn_lock.length; i++) {
          let x = i;
          btn_lock[i].addEventListener("click", (event) => {
            var td = rows[x].getElementsByTagName("td")[0].innerText;
    
            let data2 = {
              TENDANGNHAP: td,
            };
    
            server.TaiKhoan.khoaOrMoKhoaTaiKhoan(data2)
              .then((result) => {
                console.log(result);
                if (result.data.includes("Đã khóa tài khoản")) {
                  popup_lock[0].classList.add("show");
                  btn_lock_form.addEventListener("click", () => {
                    popup_lock[0].classList.remove("show");
                    // window.location.reload();
                  });
                }
                 else if (result.data.includes("Đã mở khóa tài khoản")) {
                  popup_unlock[0].classList.add("show");
                  btn_unlock_form.addEventListener("click", () => {
                    popup_unlock[0].classList.remove("show");
                    // window.location.reload();
                  });
                }
                 else {
                  popup_notTK[0].classList.add("show");
                  btn_notTK_form.addEventListener("click", () => {
                    popup_notTK[0].classList.remove("show");
                    window.location.reload();
                  });
                }
                
              })
              .catch((err) => {});
          });
        }

    btn_cancel[2].addEventListener("click", () => {
      popup_create_account[0].classList.remove("show");
      window.location.reload();
    });
    btn_cancel[3].addEventListener("click", () => {
      popup_reset[0].classList.remove("show");
      window.location.reload();
    });
    btn_cancel[5].addEventListener("click", () => {
      popup_change_password[0].classList.remove("show");
      window.location.reload();
    });
    btn_cancel[4].addEventListener("click", () => {
      popup_delete_confirm[0].classList.remove("show");
      window.location.reload();
    });
    btn_cancel[6].addEventListener("click", () => {
      popup_lock[0].classList.remove("show");
      window.location.reload();
    });
    btn_cancel[7].addEventListener("click", () => {
      popup_unlock[0].classList.remove("show");
      window.location.reload();
    });
  })
  .catch((err) => {});
