import server from '../server/main.js'




server.NhanVien.themNhanVien({
  HOTEN: 'Nguyễn Văn B', SDT: '0973343549', CHUCVU: 'TIEPTAN'
}).then((result) => {
  console.log(result);
}).catch((err) => {

});;




