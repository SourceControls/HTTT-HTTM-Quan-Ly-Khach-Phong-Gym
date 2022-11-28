import server from '../../server/main.js'



server.NhanVien.getList({
}).then((result) => {
  let list = document.querySelector("#NhanVienList");
  let out = "";
  for(let nv of result.data){
    out +=`
    <tr>
       <td>${nv.MANV}</td>
       <td>${nv.HOTEN}</td>
       <td style="padding-left: 15px;">${nv.SDT}</td>
       <td style="padding-left: 16px;">${nv.CHUCVU}</td>
       <td>${nv.TAIKHOAN}</td>
        <td>
            <div class="btn-container">
                <i class='bx bxs-edit btn-edit'></i>
                <i class='bx bx-trash'></i>
                <i class='bx bx-user-plus btn-account'></i>
                <i class='bx bx-lock' ></i>
            </div>
        </td>
    </tr>
    `;
  }
  list.innerHTML = out;

  let btn_account = document.querySelectorAll(".btn-account");
  let btn_cancel = document.querySelectorAll(".btn-cancel-form");
  let popup_create_account = document.getElementsByClassName("popup-create-account");
  let popup_reset = document.getElementsByClassName("popup-reset-password");
  let reset_pass = document.getElementsByClassName("reset-pass");
  let reset_name = document.getElementsByClassName("reset-name");
  let create_pass = document.getElementsByClassName("create-pass");
  let create_name = document.getElementsByClassName("create-name");
  var rows =document.getElementsByTagName("tbody")[0].rows;
  
  for (var i = 0; i < btn_account.length; i++) {
    let x=i;
    btn_account[i].addEventListener("click", (event) => {
      var td = rows[x].getElementsByTagName("td")[0].innerText;
      
        let data= {
          TENDANGNHAP: td
        }
        
        server.TaiKhoan.capTaiKhoanOrResetMatKhau(data).then((result) => {
          console.log(result);
          if(result.data.includes("Cấp lại mật khẩu")){
          popup_reset[0].classList.add("show");
          reset_pass[0].value = result.data.split(": ")[1]
          reset_name[0].value = data.TENDANGNHAP
          }
          else{
            popup_create_account[0].classList.add("show");
            create_pass[0].value = result.data.split(":")[1]
            create_name[0].value = data.TENDANGNHAP
          }

        }).catch((err) => {
        
        });;
    });
}

btn_cancel[2].addEventListener("click", () => {
    popup_create_account[0].classList.remove("show");
});
btn_cancel[3].addEventListener("click", () => {
    popup_reset[0].classList.remove("show");
});
}).catch((err) => {

});;




