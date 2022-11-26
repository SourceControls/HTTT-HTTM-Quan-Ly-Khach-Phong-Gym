let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".sidebarBtn");
sidebarBtn.onclick = function () {
    sidebar.classList.toggle("active");
    if (sidebar.classList.contains("active")) {
        sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else
        sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
}
/* BUTTON CLICK */
let btn_cancel = document.querySelectorAll(".btn-cancel-form");
let btn_pay = document.querySelector(".btn-pay");
let btn_change_password = document.querySelector(".btn-change-password");
let btn_view_payment = document.querySelector(".btn-view");
let btn_cancel_register = document.querySelector(".btn-cancel");


/* POPUP */

let popup_change_password = document.getElementsByClassName("popup-change-password");
let popup_payment = document.getElementsByClassName("popup-payment");
let popup_view_payment = document.getElementsByClassName("popup-view-payment");
let popup_delete_confirm = document.getElementsByClassName("popup-delete-confirm");


/* POPUP PAYMENT */
btn_pay.addEventListener("click", () => {
    popup_payment[0].classList.add("show");
});

btn_cancel[0].addEventListener("click", () => {
    popup_payment[0].classList.remove("show");
});

/* POPUP CHANGE PASSWORD */
btn_change_password.addEventListener("click", () => {
    popup_change_password[0].classList.add("show");
});

btn_cancel[1].addEventListener("click", () => {
    popup_change_password[0].classList.remove("show");
});
/* POPUP VIEW PAYMENT */
btn_view_payment.addEventListener("click", () => {
    popup_view_payment[0].classList.add("show");
});

btn_cancel[2].addEventListener("click", () => {
    popup_view_payment[0].classList.remove("show");
});
/* POPUP DELETE CONFIRM*/
btn_cancel_register.addEventListener("click", () => {
    popup_delete_confirm[0].classList.add("show");
});

btn_cancel[3].addEventListener("click", () => {
    popup_delete_confirm[0].classList.remove("show");
});
