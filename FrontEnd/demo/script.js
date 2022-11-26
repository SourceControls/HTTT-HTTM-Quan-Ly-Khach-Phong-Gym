import server from '../server/main.js'

server.NhanVien.getList({
}).then((result) => {
  console.log(result);
}).catch((err) => {

});;