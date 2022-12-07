import server from "../../server/main.js";
import uploadImg from "../../Image/main.js";

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
  let list = await server.ThucPhamBoSung.getList({ KEY });
  if (list.status) {
    let HTMLlist = document.querySelector("#list");
    let out = "";
    for (let sp of list.data) {
      out += `
        <tr>
        <td style="width: 10%">${sp.MASP}</td>
        <td>${sp.TENSP}</td>
        <td>
        ${sp.MOTA}
        </td>
        <td>
            <img class="table-img"
                src=${sp.HINHANH}
                alt="AVT" />
        </td>
        <td>
            <div style="padding-left: 15px" class="btn-container">
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

async function initEvents() {
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
  btn_cancel[2].addEventListener("click", () => {
    popup_delete_confirm[0].classList.remove("show");
  });

  var rows = document.getElementsByTagName("tbody")[0].rows;
  async function img(data) {
    if (data.HINHANH != "") data.HINHANH = await uploadImg(data.HINHANH);
    else data.HINHANH = document.querySelector(".popup-add img").src;
  }
  // THEM SAN PHAM
  const imageInput_AddPopup = document.querySelector(".popup-add .image-input");
  const image_AddPopup = document.querySelector(".popup-add img");
  imageInput_AddPopup.addEventListener("change", () => {
    var file = imageInput_AddPopup.files[0];
    image_AddPopup.src = URL.createObjectURL(file);
  });
  btn_add_form.addEventListener("click", () => {
    // alert("hello")
    if (input[0].value.length == 0) {
      alert("Tên sản phẩm không được để trống");
    } else if (input[1].value.length == 0) {
      alert("Mô tả sản phẩm không được để trống");
    } else {
      let data = {
        TENSP: input[0].value,
        MOTA: input[1].value,
        HINHANH: "",
      };
      img(data);
      server.ThucPhamBoSung.themSanPham(data)
        .then((result) => {
          console.log(result);
          if (result.status) {
            popup_add[0].classList.remove("show");
            alert("Thêm sản phẩm thành công");
            window.location.reload();
          } else {
            alert("Thêm sản phẩm thất bại");
          }
        })
        .catch((err) => {});
    }
  });

  // CAP NHAT SAN PHAM
  for (var i = 0; i < btn_edit.length; i++) {
    let x = i;
    btn_edit[i].addEventListener("click", (event) => {
      popup_edit[0].classList.add("show");
      // SET INPUT VALUE
      input[3].value = rows[x].getElementsByTagName("td")[0].innerText;
      input[4].value = rows[x].getElementsByTagName("td")[1].innerText;
      input[5].value = rows[x].getElementsByTagName("td")[2].innerText;
      // input[7].value = rows[x].getElementsByTagName("td")[3].innerText.split('.').join("").replace('VND','');

      btn_update_form.addEventListener("click", () => {
        if (input[3].value.length == 0)
          alert("Tên sản phẩm không được để trống");
        else if (input[4].value.length == 0) {
          alert("Mô tả sản phẩm không được để trống");
        } else {
          let data = {
            MASP: input[3].value,
            TENSP: input[4].value,
            MOTA: input[5].value,
            HINHANH: '',
          };
          img(data)
          server.ThucPhamBoSung.capNhatSanPham(data)
            .then((result) => {
              console.log(result);
              if (result.status) {
                popup_edit[0].classList.remove("show");
                alert("Cập nhật sản phẩm thành công");
                window.location.reload();
              } else {
                popup_edit[0].classList.remove("show");
                alert("Cập nhật sản phẩm thất bại");
              }
            })
            .catch((err) => {});
        }
      });
    });
  }
  // XOA SAN PHAM
  for (var i = 0; i < btn_delete.length; i++) {
    let x = i;
    btn_delete[i].addEventListener("click", (event) => {
      popup_delete_confirm[0].classList.add("show");
      var td = rows[x].getElementsByTagName("td")[0].innerText;
      btn_delete_form.addEventListener("click", () => {
        let data = {
          MASP: td,
        };
        server.ThucPhamBoSung.xoaSanPham(data)
          .then((result) => {
            if (result.status) {
              alert("Xóa sản phẩm thành công");
              window.location.reload();
              popup_delete_confirm[0].classList.remove("show");
            } else {
              popup_delete_confirm[0].classList.remove("show");
              alert(result.data);
            }
          })
          .catch((err) => {});
      });
    });
  }
}
async function loadListSP(KEY) {
  await loadList(KEY);
  initEvents();
}
loadListSP('');

const searchBar = document.querySelector(".search-box input");
searchBar.addEventListener("keyup", () => {
  let KEY = searchBar.value;
  if (KEY) {
    KEY = KEY.trim();
  }
  loadListSP(KEY);
});
