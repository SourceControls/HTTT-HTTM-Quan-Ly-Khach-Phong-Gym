let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".sidebarBtn");
sidebarBtn.onclick = function () {
    sidebar.classList.toggle("active");
    if (sidebar.classList.contains("active")) {
        sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else
        sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
}
/* POPUP ADD */
let btn_add = document.querySelector(".btn-add");
let btn_edit = document.querySelectorAll(".btn-edit");
let btn_delete = document.querySelectorAll(".btn-delete");
let btn_register = document.querySelectorAll(".btn-register");
let btn_cancel = document.querySelectorAll(".btn-cancel-form");
let btn_change_password = document.querySelector(".btn-change-password");
let popup_add = document.getElementsByClassName("popup-add");
let popup_edit = document.getElementsByClassName("popup-update");
let popup_register = document.getElementsByClassName("popup-register");
let popup_change_password = document.getElementsByClassName("popup-change-password");
let popup_delete_confirm = document.getElementsByClassName("popup-delete-confirm");

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

/* POPUP REGISTER */
for (var i = 0; i < btn_register.length; i++) {
    btn_register[i].addEventListener("click", () => {
        popup_register[0].classList.add("show");
    });
}

btn_cancel[2].addEventListener("click", () => {
    popup_register[0].classList.remove("show");
});

/* POPUP CHANGE PASSWORD */
btn_change_password.addEventListener("click", () => {
    popup_change_password[0].classList.add("show");
});

btn_cancel[3].addEventListener("click", () => {
    popup_change_password[0].classList.remove("show");
});


for (var i = 0; i < btn_delete.length; i++) {
    btn_delete[i].addEventListener('click', () => {
        popup_delete_confirm[0].classList.add("show");
    });
}
btn_cancel[4].addEventListener("click", () => {
    popup_delete_confirm[0].classList.remove("show");
});