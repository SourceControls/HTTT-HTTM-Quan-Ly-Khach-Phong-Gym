import server from '../server/main.js'




// server.KhachHang.updateModel({}).then((result) => {
//   console.log(result);
// }).catch((err) => {

// });;

var btn = document.querySelector('button')
btn.onclick = () => {
  let file = document.querySelector('input').files[0];
  server.KhachHang.updateModel(file).then((result) => {
    console.log(result);
  }).catch((err) => {

  });;
}



