function addItem(
  productID,
  productTitle,
  productImg,
  productPrice,
  productCategoryID
) {
  fetch("http://localhost:3000/products", {
    method: "POST",
    body: JSON.stringify({
      id: productID,
      title: productTitle,
      img: productImg,
      price: productPrice,
      categoryID: productCategoryID,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}

const id = document.querySelector(".id"),
  title = document.querySelector(".title"),
  img = document.querySelector(".img"),
  price = document.querySelector(".price"),
  categoryId = document.querySelector(".category--id");

document.querySelector("#submit").addEventListener("click", (e) => {
  addItem(id.value, title.value, img.value, price.value, +categoryId.value);
  e.preventDefault();
});
