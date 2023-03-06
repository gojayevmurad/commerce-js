// add order count
// for (let i = 121; i <= 150; i++) {
//   let num = Math.floor(Math.random() * 1000);
//   fetch(`http://localhost:3000/products/${i}`, {
//     method: "PATCH",
//     body: JSON.stringify({
//       order: num,
//     }),
//     headers: {
//       Accept: "application/json",
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   }).catch((data) => console.log(data)).then(data=> console.log(data))
// }

//! add popularity
// for (let i = 0; i < 4; i++) {
//   let productNum = Math.floor(Math.random() * 150);
//   let num = (Math.random() * 5).toFixed(1);
//   fetch(`http://localhost:3000/products/${i}`, {
//     method: "PATCH",
//     body: JSON.stringify({
//       popularity: +num,
//     }),
//     headers: {
//       Accept: "application/json",
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   })
//     .catch((data) => console.log(data))
//     .then((data) => console.log(data));
// }
