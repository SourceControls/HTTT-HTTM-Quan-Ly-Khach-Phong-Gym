import server from "../../server/main.js"


function initSideBar() {
    let sidebar = document.querySelector(".sidebar");
    let sidebarBtn = document.querySelector(".sidebarBtn");
    sidebarBtn.onclick = function () {
        sidebar.classList.toggle("active");
        if (sidebar.classList.contains("active")) {
            sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
        } else
            sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
}
async function initDoiMatKhau() {
    const change_password_form = document.querySelector("#change-password-form");
    change_password_form.addEventListener("submit", async (e) => {
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.target));
        data.TENDANGNHAP = window.localStorage.getItem('username');
        if (data.MATKHAUMOI != data.NHAPLAIMATKHAU) {
            alert("Mật khẩu mới không trùng nhau!");
            return
        }
        console.log(data);
        let rs = await server.TaiKhoan.dangNhap({ TENDANGNHAP: data.TENDANGNHAP, MATKHAU: data.MATKHAUCU });
        if (!rs.status) {
            alert("Mật khẩu cũ không đúng");
            return;
        }
        rs = await server.TaiKhoan.doiMatKhau(data)
        if (!rs.status) {
            alert(rs.data);
            return;
        }

        alert("Đổi mật khẩu thành công!");

    })
}
async function initNhanVien() {
    let nhanVienBox = document.querySelectorAll('.admin_name span');
    let nhanVien = (await server.NhanVien.getList({ KEY: window.localStorage.getItem('username') })).data[0]
    nhanVienBox[0].innerText = nhanVien.HOTEN;
    nhanVienBox[1].innerText = nhanVien.MANV + ' - ' + nhanVien.CHUCVU;

}



initSideBar();
initDoiMatKhau();
initNhanVien()