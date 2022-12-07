import server from "../../server/main.js";

async function initNhanVien() {
    let nhanVienBox = document.querySelectorAll('.admin_name span');
    let nhanVien = (await server.NhanVien.getList({ KEY: window.localStorage.getItem('username') })).data[0]
    nhanVienBox[0].innerText = nhanVien.HOTEN;
    nhanVienBox[1].innerText = nhanVien.MANV + ' - ' + nhanVien.CHUCVU;
  }
  initNhanVien()

let btnFilterDT = document.querySelector(".btn-filterDT")
let doanhThuLabel = document.querySelector(".right p")
let btnReset = document.querySelectorAll(".btn-reset")
let KH = document.querySelectorAll(".text-block p")[0]
let KHcu = document.querySelectorAll(".text-block p")[1]
let KHmoi = document.querySelectorAll(".text-block p")[2]

// RESET
for(let i=0;i< btnReset.length;i++){
  btnReset[i].addEventListener("click", ()=>{
    window.location.reload()
  })
}



server.ThongKe.thongKeKhachHang()
    .then((result) => {
      KH.innerText = result.data[0].TONGKH
      KHcu.innerText = result.data[0].TONGKHCU
      KHmoi.innerText = result.data[0].TONGKHMOI
      /* PIE CHART*/

google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    var data1 = google.visualization.arrayToDataTable([
        ['Gender', 'Person'],
        ['Nam', result.data[0].NAM],
        ['Nữ', result.data[0].NU]
    ]);
    var data2 = google.visualization.arrayToDataTable([
        ['Age', 'Person'],
        ['6-14', result.data[0]['6-14']],
        ['15-24', result.data[0]['15-24']],
        ['Trên 24', result.data[0]['> 24']]
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
    })
    .catch((err) => { });


// THONG KE DOANH THU
    server.ThongKe.thongKeDoanhThu({'TUNGAY': ' ', 'DENNGAY': ' '})
    .then((result) => {
      console.log(result)
      let list = document.querySelector("#list");
      let out = "";
      for (let record of result.data) {
        out += `
        <tr>
              <td>${record.MAKH}</td>
              <td>${record.HOTEN}</td>
              <td style="padding-left: 22px">${record.SDT}</td>
              <td style="padding-left: 20px">${record.TONGDOANHTHU.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
        </tr>
      `;
      }
      list.innerHTML = out;
      // label TONG DOANH THU
let sum = 0
var rows = document.querySelector("#list").rows;
        for (let i = 0; i < rows.length; i++) {
          sum += Number(rows[i].getElementsByTagName("td")[3].innerText.split('.').join("").replace('VND',''))
          // console.log(rows[i].getElementsByTagName("td")[3].innerText.split('.').join("").replace('VND',''))
          }
          doanhThuLabel.innerText = sum.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
    })
    .catch((err) => { });

// DOANH THU LOC BUTTON
 btnFilterDT.addEventListener("click",()=>{
  let to = document.querySelector("#toDT").value
  let from = document.querySelector("#fromDT").value
    server.ThongKe.thongKeDoanhThu({'TUNGAY': from, 'DENNGAY': to})
    .then((result) => {
      console.log(result.data)
      let list = document.querySelector("#list");
      let out = "";
      for (let record of result.data) {
        out += `
        <tr>
              <td>${record.MAKH}</td>
              <td>${record.HOTEN}</td>
              <td style="padding-left: 22px">${record.SDT}</td>
              <td style="padding-left: 20px">${record.TONGDOANHTHU.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
        </tr>
      `;
      }
      list.innerHTML = out;
    })
    .catch((err) => { });

    
 })
  

