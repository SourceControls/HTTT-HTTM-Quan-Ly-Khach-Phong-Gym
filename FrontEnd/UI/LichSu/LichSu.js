let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".sidebarBtn");

sidebarBtn.onclick = function () {
    sidebar.classList.toggle("active");
    if (sidebar.classList.contains("active")) {
        sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else
        sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");

}


let btn_cancel = document.querySelectorAll(".btn-cancel-form");
let btn_change_password = document.querySelector(".btn-change-password");


let popup_change_password = document.getElementsByClassName("popup-change-password");


/* POPUP CHANGE PASSWORD */
btn_change_password.addEventListener("click", () => {
    popup_change_password[0].classList.add("show");
});

btn_cancel[0].addEventListener("click", () => {
    popup_change_password[0].classList.remove("show");
});
