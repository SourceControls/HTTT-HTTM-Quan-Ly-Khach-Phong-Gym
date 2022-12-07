import server from '../server/main.js'




server.ThucPhamBoSung.xoaSanPham({
  MASP: 'TP00000003',
  TENSP: 'Whey 5.02lbs', MOTA: 'Tăng cân tăng cơ, giảm mỡ', HINHANH: './'
}).then((result) => {
  console.log(result);
}).catch((err) => {

});;




