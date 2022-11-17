export default function excute(api, data) {
  return fetch(api, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => {
    return res.json();
  }).catch(function (err) {
    console.log("Error!! " + err);
    return false;
  });
}