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
let popup_change_password = document.getElementsByClassName("popup-change-password");
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

/* POPUP ADD */
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

/* POPUP CREATE ACCOUNT */
for (var i = 0; i < btn_account.length; i++) {
    btn_account[i].addEventListener("click", () => {
        popup_create_account[0].classList.add("show");
    });
}

btn_cancel[2].addEventListener("click", () => {
    popup_create_account[0].classList.remove("show");
});


/* POPUP DELETE CONFIRM */
for (var i = 0; i < btn_delete.length; i++) {
    btn_delete[i].addEventListener('click', () => {
        popup_delete_confirm[0].classList.add("show");
    });
}
btn_cancel[4].addEventListener("click", () => {
    popup_delete_confirm[0].classList.remove("show");
});


/* POPUP CHANGE PASSWORD */
btn_change_password.addEventListener("click", () => {
    popup_change_password[0].classList.add("show");
});

btn_cancel[5].addEventListener("click", () => {
    btn_change_password[0].classList.remove("show");
});

// // /* POPUP LOCK */
// for (var i = 0; i < btn_lock.length; i++) {
//     btn_lock[i].addEventListener('click', () => {
//         popup_lock[0].classList.add("show");
//     });
// }
// btn_lock_form.addEventListener("click", () => {
//     popup_lock[6].classList.remove("show");
// });
// // /* POPUP UNLOCK */
// for (var i = 0; i < btn_lock.length; i++) {
//     btn_lock[i].addEventListener('click', () => {
//         popup_unlock[0].classList.add("show");
//     });
// }
// btn_unlock_form.addEventListener("click", () => {
//     popup_unlock[0].classList.remove("show");
// });
// // /* POPUP LOCK */
// for (var i = 0; i < btn_lock.length; i++) {
//     btn_lock[i].addEventListener('click', () => {
//         popup_lock[0].classList.add("show");
//     });
// }
// btn_lock_form.addEventListener("click", () => {
//     popup_lock[6].classList.remove("show");
// });



