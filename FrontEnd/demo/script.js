import server from '../server/main.js'




server.ThucPhamBoSung.getListMachineLearning({
  TUNGAY: '2022-11-15',
  DENNGAY: '2022-11-20',
}).then((result) => {
  console.log(result);
}).catch((err) => {

});;




