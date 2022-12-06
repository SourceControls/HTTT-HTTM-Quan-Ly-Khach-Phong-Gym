import server from "../../server/main.js";

async function initNhanVien() {
  let nhanVienBox = document.querySelectorAll(".admin_name span");
  let nhanVien = (
    await server.NhanVien.getList({
      KEY: window.localStorage.getItem("username"),
    })
  ).data[0];
  nhanVienBox[0].innerText = nhanVien.HOTEN;
  nhanVienBox[1].innerText = nhanVien.MANV + " - " + nhanVien.CHUCVU;
}
initNhanVien();

async function loadList(KEY) {
  let list = await server.DichVu.getList({ KEY });
  if (list.status) {
    let HTMLlist = document.querySelector("#list");
    let out = "";
    for (let dv of list.data) {
      out += `
        <tr>
        <td>${dv.MADV}</td>
        <td style="padding-left: 11px">${dv.TENDV}</td>
        <td>${dv.SONGAYSUDUNG}</td>
        <td style="padding-left: 20px">${dv.GIA.toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        })}</td>
        <td style="padding-left: 28px">${
          dv.HIENHANH ? "Đang hiện hành" : "Ngừng hoạt động"
        }</td>
        <td>
          <div class="btn-container">
              <i class="bx bxs-edit btn-edit"></i>
              <i class="bx bx-trash btn-delete"></i>
          </div>
        </td>
      </tr>
      `;
    }
    HTMLlist.innerHTML = out;
  }
}

async function initEvent() {
  /* POPUP ADD */
  let btn_add = document.querySelector(".btn-add");
  let btn_add_form = document.querySelector(".btn-add-form");
  let btn_update_form = document.querySelector(".btn-update-form");
  let btn_delete_form = document.querySelector(".btn-delete-form");
  let btn_edit = document.querySelectorAll(".btn-edit");
  let input = document.querySelectorAll(".form-control");
  let btn_delete = document.querySelectorAll(".btn-delete");
  let btn_cancel = document.querySelectorAll(".btn-cancel-form");
  let popup_add = document.getElementsByClassName("popup-add");
  let popup_edit = document.getElementsByClassName("popup-update");
  let popup_delete_confirm = document.getElementsByClassName(
    "popup-delete-confirm"
  );

  btn_add.addEventListener("click", () => {
    popup_add[0].classList.add("show");
  });

  btn_cancel[0].addEventListener("click", () => {
    popup_add[0].classList.remove("show");
  });

  /* POPUP UPDATE */
  for (var i = 0; i < btn_edit.length; i++) {
    btn_edit[i].addEventListener("click", () => {
      popup_edit[0].classList.add("show");
    });
  }

  btn_cancel[1].addEventListener("click", () => {
    popup_edit[0].classList.remove("show");
  });

  /* POPUP DELETE */
  for (var i = 0; i < btn_delete.length; i++) {
    btn_delete[i].addEventListener("click", () => {
      popup_delete_confirm[0].classList.add("show");
    });
  }
  btn_cancel[3].addEventListener("click", () => {
    popup_delete_confirm[0].classList.remove("show");
  });

// GET HIENHANH
function hienHanh() {
    if (input[2].checked||input[8].checked) return true;
    else return false;
  }
  // THEM DICH VU
btn_add_form.addEventListener("click", () => {
    if (input[0].value.length == 0) alert("Tên không được để trống");
    else if (input[1].value.length == 0){
       alert("Số ngày sử dụng không được để trống");
    }
    else if(isNaN(input[1].value))
    alert("Số ngày sử dụng phải là số")
    else if (input[2].value.length == 0){
      alert("Giá không được để trống");
   }
   else if(isNaN(input[2].value))
   alert("Giá phải là số")
    else {
      let data = {
        TENDV: input[0].value,
        SONGAYSUDUNG: input[1].value,
        GIA: input[2].value,
        HIENHANH: hienHanh()
      };
      server.DichVu.themDichVu(data)
        .then((result) => {
          if (result.data.rowsAffected[0] == 1) {
            popup_add[0].classList.remove("show");
            alert("Thêm dịch vụ thành công");
            window.location.reload();
          } else {
            alert("Thêm dịch vụ thất bại");
          }
        })
        .catch((err) => {});
    }
  });

//   UPDATE DICH VU
var rows = document.getElementsByTagName("tbody")[0].rows;
for (var i = 0; i < btn_edit.length; i++) {
  let x = i;
  btn_edit[i].addEventListener("click", (event) => {
    popup_edit[0].classList.add("show");
    // SET INPUT VALUE
    input[4].value = rows[x].getElementsByTagName("td")[0].innerText;
    input[5].value = rows[x].getElementsByTagName("td")[1].innerText;
    input[6].value = rows[x].getElementsByTagName("td")[2].innerText;
    input[7].value = rows[x].getElementsByTagName("td")[3].innerText.split('.').join("").replace('VND','');
    if (rows[x].getElementsByTagName("td")[4].innerText.includes('Đang hiện hành'))
      input[8].checked = true
    else
      input[8].checked = false

    btn_update_form.addEventListener("click", () => {
        if (input[5].value.length == 0) alert("Tên không được để trống");
        else if (input[6].value.length == 0){
           alert("Số ngày sử dụng không được để trống");
        }
        else if(isNaN(input[6].value))
        alert("Số ngày sử dụng phải là số")
        else if (input[7].value.length == 0){
          alert("Giá không được để trống");
       }
       else if(isNaN(input[7].value))
       alert("Giá phải là số")
      else {
        let data = {
            MADV: input[4].value,
            TENDV: input[5].value,
            SONGAYSUDUNG: input[6].value,
            GIA: input[7].value,
            HIENHANH: hienHanh()
        }
        server.DichVu.capNhatDichVu(data)
          .then((result) => {
            if(result.status){
            popup_edit[0].classList.remove("show");
            alert("Cập nhật dich vụ thành công")
            window.location.reload();
            }
            else{
                popup_edit[0].classList.remove("show");
                alert(result.data)
            }
          })
          .catch((err) => { });
      }
    });
  });
}
//   XOA DICH VU
  for (var i = 0; i < btn_delete.length; i++) {
    let x = i;
    btn_delete[i].addEventListener("click", (event) => {
      popup_delete_confirm[0].classList.add("show");
      var td = rows[x].getElementsByTagName("td")[0].innerText;
      btn_delete_form.addEventListener("click", () => {
        let data = {
          MADV: td,
        };
        server.DichVu.xoaDichVu(data)
          .then((result) => {
            console.log(result)
            if(result.status){
            alert("Xóa dịch vụ thành công")
            window.location.reload();
            popup_delete_confirm[0].classList.remove("show");
            }else {
                popup_delete_confirm[0].classList.remove("show");
                alert(result.data)
            }
          })
          .catch((err) => { });
      });
    });
  }
}


async function loadListDV(KEY) {
  await loadList(KEY);
  initEvent();
}
loadListDV("");

// TÌM KIEM
const searchBar = document.querySelector(".search-box input");
searchBar.addEventListener("keyup", () => {
  let KEY = searchBar.value;
  if (KEY) {
    KEY = KEY.trim();
  }
  loadListDV(KEY);
});

