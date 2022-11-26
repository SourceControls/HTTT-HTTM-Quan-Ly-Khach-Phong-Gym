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

/* PIE CHART*/
google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {

            var data1 = google.visualization.arrayToDataTable([
                ['Gender', 'Person'],
                ['Nam', 30],
                ['Nữ', 11]
            ]);
            var data2 = google.visualization.arrayToDataTable([
                ['Gender', 'Person'],
                ['18-25', 10],
                ['26-35', 25],
                ['Trên 35', 6]
            ]);

            var option1 = {
                title: 'Giới tính'
            };
            var option2 = {
                title: 'Độ tuổi'
            };

            var chart1 = new google.visualization.PieChart(document.getElementById('piechart1'));
            var chart2 = new google.visualization.PieChart(document.getElementById('piechart2'));

            chart1.draw(data1, option1);
            chart2.draw(data2, option2);
        }

/* LINE CHART */
var xValues = ['7-9AM','10-12AM','1-3AM','4-7AM'];
var yValues = [12,8,20,10];

new Chart("lineChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(0,0,255,1.0)",
      borderColor: "rgba(0,0,255,0.1)",
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    scales: {
      yAxes: [{ticks: {min: 0, max:100}}],
    }
  }
});
