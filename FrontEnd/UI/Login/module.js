import server from '../../server/main.js'

let btn = document.querySelector(".btn-login");




btn.addEventListener("click", ()=>{
    let pass = document.getElementById("pass").value;
    let account = document.getElementById("account").value;
    let alert = document.getElementById("alert");

    let data= {
        TENDANGNHAP: account,
        MATKHAU: pass
    }

    server.TaiKhoan.dangNhap(data).then((result) => {
        console.log(result);
        if(result.status)
        window.location.replace("../NhanVien/NhanVien.html");
        else if(result.status==0&&result.data=='')
        alert.innerText = "Sai mật khẩu";
        else 
        alert.innerText = result.data;
    }).catch((err) => {
    
    });;
})



