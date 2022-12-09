import server from "../../server/main.js";
server.TaiKhoan.doiMatKhau({ TENDANGNHAP: 'NV00000001', MATKHAUMOI: '1' })

async function initNhanVien() {
    let nhanVien = Promise.resolve((await server.NhanVien.getList({ KEY: window.localStorage.getItem('username') })).data[0].CHUCVU)
    nhanVien.then(value => {
        return value; // 👉️ "hello"
    }).catch(err => {
        console.log(err);
    });
}

let btn = document.querySelector(".btn-login");

btn.addEventListener("click", () => {
    let pass = document.getElementById("pass").value;
    let account = document.getElementById("account").value;
    let alert = document.getElementById("alert");

    let data = {
        TENDANGNHAP: account,
        MATKHAU: pass,
    };

    server.TaiKhoan.dangNhap(data)
        .then((result) => {
            console.log(result);
            if (result.status) {
                window.localStorage.setItem("username", account);
                window.location.replace("../NhanVien/NhanVien.html");
                // console.log(initNhanVien())
                // if(initNhanVien().length==6)
                // window.location.replace("../DichVu/DichVu.html");
                // else
                // window.location.replace("../NhanVien/NhanVien.html");
            } else if (result.status == 0 && result.data == "")
                alert.innerText = "Sai mật khẩu";
            else alert.innerText = result.data;
        })
        .catch((err) => { });
});


