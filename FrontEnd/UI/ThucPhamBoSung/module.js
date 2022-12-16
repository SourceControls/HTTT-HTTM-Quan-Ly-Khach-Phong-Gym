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
      if (sp.HINHANH && sp.HINHANH.trim().length == 0) {
        sp.HINHANH = 'defaultAvt.jpg'
      }
      out += `
        <tr>
        <td style="width: 10%">${sp.MASP}</td>
        <td>${sp.TENSP}</td>
        <td style="width:50%;text-align:justify">
        ${sp.MOTA}
        </td>
        <td>
            <img class="table-img"
                src=${sp.HINHANH}
                alt="AVT" />
        </td>
        <td>
            <div style="padding-left: 15px" class="btn-container">
                <i class="bx bxs-edit btn-edit" title="Cập nhật sản phẩm"></i>
                <i class="bx bx-trash btn-delete" title="Xóa sản phẩm"></i>
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
  let btn_update_form = document.querySelector("#update-product-form");
  let btn_delete_form = document.querySelector(".btn-delete-form");
  let btn_edit = document.querySelectorAll(".btn-edit");
  let input = document.querySelectorAll(".form-control");
  let btn_delete = document.querySelectorAll(".btn-delete");
  let btn_cancel = document.querySelectorAll(".btn-cancel");
  let popup_add = document.getElementsByClassName("popup-add");
  let popup_edit = document.getElementsByClassName("popup-update");
  let popup_delete_confirm = document.getElementsByClassName(
    "popup-delete-confirm"
  );
  let btn_mol_file = document.querySelector('.btn-mol-file');
  btn_mol_file.onclick = () => {
    let file = document.querySelector('.mol-file');
    if (!file.files) {
      alert("Chưa chọn file")
      return;
    }
    if (!file.files[0].name.includes('.mol')) {
      alert("File không hợp lệ")
      return;
    }
    server.KhachHang.updateModel(file.files[0]).then(rs => {
      if (rs.message)
        alert(rs.message)
      else
        alert("Cập nhật thất bại")
    })
  }
  btn_add.addEventListener("click", () => {
    popup_add[0].classList.add("show");
  });

  btn_cancel[0].addEventListener("click", () => {
    popup_add[0].classList.remove("show");
  });

  /* POPUP UPDATE */
  for (var i = 0; i < btn_edit.length; i++) {
    btn_edit[i].addEventListener("click", (e) => {
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

  function ThemSp() {

    const imageInput_AddPopup = document.querySelector(".popup-add .image-input");
    const image_AddPopup = document.querySelector(".popup-add img");
    const add_product_form = document.querySelector("#add-product-form");

    //handle ảnh
    imageInput_AddPopup.addEventListener("change", () => {
      var file = imageInput_AddPopup.files[0];
      image_AddPopup.src = URL.createObjectURL(file);
    })
    add_product_form.addEventListener("submit", async (e) => {
      console.log('submited add SP');
      e.preventDefault();
      const sp = Object.fromEntries(new FormData(e.target));
      if (sp.TENSP.trim().length == 0) {
        alert("Tên sản phẩm không được để trống");
        return;
      }
      if (sp.MOTA.trim().length == 0) {
        alert("Mô tả không được để trống");
        return;
      }
      //nếu k có ảnh thì set ảnh mặc định

      if (sp.HINHANH.name != '')
        sp.HINHANH = await uploadImg(sp.HINHANH)
      else
        sp.HINHANH = document.querySelector('.popup-add img').src;

      server.ThucPhamBoSung.themSanPham(sp).then((result) => {
        if (!result.status) {
          alert(result.data);
          return
        }
        document.querySelector(".popup-add").classList.remove('show');
        alert("Thêm sản phẩm thành công");
        loadListSP("");
      })

    });

  }
  // THEM SAN PHAM
  ThemSp()

  // CAP NHAT SAN PHAM

  for (var i = 0; i < btn_edit.length; i++) {
    let x = i;
    btn_edit[i].addEventListener("click", (event) => {
      popup_edit[0].classList.add("show");
      // SET INPUT VALUE
      input[3].value = rows[x].getElementsByTagName("td")[0].innerText;
      input[4].value = rows[x].getElementsByTagName("td")[1].innerText;
      input[5].value = rows[x].getElementsByTagName("td")[2].innerText;
      server.ThucPhamBoSung.getList({ 'KEY': rows[x].getElementsByTagName("td")[0].innerText }).then((rs) => {
        // console.log(rs.data[0].HINHANHrs.data[0].HINHANH)
        document.querySelector(".popup-update img").src = rs.data[0].HINHANH;
      })
      const imageInput_UpdatePopup = document.querySelector(".popup-update .image-input");
      const image_UpdatePopup = document.querySelector(".popup-update img");
      imageInput_UpdatePopup.addEventListener("change", () => {
        var file = imageInput_UpdatePopup.files[0];
        image_UpdatePopup.src = URL.createObjectURL(file);
      })
    })
    // input[7].value = rows[x].getElementsByTagName("td")[3].innerText.split('.').join("").replace('VND','');
  }

  btn_update_form.addEventListener("submit", async (e) => {
    console.log('submited update KH');
    e.preventDefault();
    e.stopImmediatePropagation()
    const tp = Object.fromEntries(new FormData(e.target));
    tp.MASP = document.querySelector("#MASP").value;
    if (tp.TENSP.trim().length == 0) {
      alert("Tên sản phẩm không được để trống");
      return;
    }
    if (tp.MOTA.trim().length == 0) {
      alert("Mô tả không được để trống");
      return;
    }
    //nếu k có ảnh thì set ảnh mặc định
    if (tp.HINHANH.name != '')
      tp.HINHANH = await uploadImg(tp.HINHANH)
    else
      tp.HINHANH = document.querySelector('.popup-update img').src;

    let update = await server.ThucPhamBoSung.capNhatSanPham(tp)
    if (!update.status) {
      alert(rs.data);
      popup_edit[0].classList.remove("show");
    }
    alert("Cập nhật thành công!");
    popup_edit[0].classList.remove("show");
    loadListSP('');
    // server.ThucPhamBoSung.capNhatSanPham(tp).then((rs)=>{
    //   if (!rs.status) {
    //     alert(rs.data);
    //     popup_edit[0].classList.remove("show");
    //   }
    //   alert("Cập nhật thành công!");
    //   popup_edit[0].classList.remove("show");
    //   loadListSP('');
    // })
  });

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
              loadListSP("");
              popup_delete_confirm[0].classList.remove("show");
            } else {
              popup_delete_confirm[0].classList.remove("show");
              alert(result.data);
            }
          })
          .catch((err) => { });
      });
    });
  }

  // XUAT FILE

  let link = document.querySelector(".btn-export")
  link.addEventListener("click", (e) => {
    let from = document.querySelector(".from").value
    let to = document.querySelector(".to").value
    e.preventDefault()
    if (from > to) {
      alert("Thời gian không hợp lệ!")
      e.preventDefault()
      return
    }
    if (from.length == 0 || to.length == 0) {
      alert("Bạn chưa nhập thời gian!")
      e.preventDefault()
      return
    }
    tableToCSV()
  })

  function downloadCSVFile(csv_data) {
    var BOM = "\uFEFF";
    var csv_data = BOM + csv_data;
    let CSVFile = new Blob([csv_data], { type: "text/csv" });

    var temp_link = document.createElement('a');

    temp_link.download = "Machine Learning";
    var url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;

    temp_link.style.display = "none";
    document.body.appendChild(temp_link);
    temp_link.click();
    document.body.removeChild(temp_link);
  }
  function tableToCSV() {
    let from = document.querySelector(".from").value
    let to = document.querySelector(".to").value
    let csv = ['MAKH,TUOI,GIOITINH,BMI,TILEMO,TILOCO,MASP,NGAY,GOIY_THANHCONG']
    server.ThucPhamBoSung.getListMachineLearning({ 'TUNGAY': from, 'DENNGAY': to }).then((result) => {
      for (let rs of result.data) {
        csv.push(rs.MAKH + ',' + rs.TUOI + ',' + rs.GIOITINH + ',' + rs.BMI + ',' + rs.TILEMO + ',' + rs.TILECO + ',' + rs.MASP + ',' + rs.NGAY + ',' + rs.GOIY_THANHCONG)
      }
      downloadCSVFile(csv.join("\n"))
    })
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
