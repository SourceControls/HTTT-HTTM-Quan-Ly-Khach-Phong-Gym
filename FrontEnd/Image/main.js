export default function uploadImg(file) {
  // var file = document.getElementById('input_img').files[0];
  var form = new FormData();
  form.append('image', file);
  return fetch(
    'https://api.imgbb.com/1/upload?key=4d745d471bf35339a4c54af3805742ad',
    {
      method: 'POST',
      mimeType: 'multipart/form-data',
      contentType: false,
      body: form,
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res.data.image.url);
      return res.data.image.url;
    });
}