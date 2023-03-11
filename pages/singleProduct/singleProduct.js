let category = $(".category");
let productName = $(".product--name");
let productName2 = $(".desc--name");
let mainImage = $(".main-image");
let productMainSlider = $(".product--main__slider--slide");
let price = $(".desc--price");
let orderCount = $(".desc--order");
let stockDetail = $(".desc--stock");
let productNames = [productName, productName2];
let addToCartBtnSingle = $(".single-product__addcart");

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

function createSingleProduct() {
  let obj = productList[id - 1];
  orderCount.innerHTML = obj.order;

  productNames.forEach((name) => {
    name.innerHTML = obj.title;
  });
  price.innerHTML = obj.price;
  category.innerHTML = obj.categoryName;

  mainImage.src = obj.img[0];

  if (obj.inStock) {
    stockDetail.innerHTML = "Mövcuddur";
  } else {
    stockDetail.innerHTML = "Mövcud deyil";
    stockDetail.style.color = "red";
  }

  obj.img.forEach((src) => {
    let image = document.createElement("img");
    image.src = src;
    productMainSlider.append(image);
  });

  if (!obj.inStock) {
    addToCartBtnSingle.disabled = true;
    addToCartBtnSingle.classList += "disabled";
    addToCartBtnSingle.innerText = "Stokda Yoxdur";
  }

  addToCartBtnSingle.id = `load${id}`;
  addToCartBtnSingle.value = id;

  addToCartBtnSingle.addEventListener("click", () => {
    addToCartAndThenChangeButton(id, addToCartBtnSingle);
  });
}

function changeButton() {
  cartItemsList.forEach((cartItem) => {
    if (cartItem.id == productList[id - 1].id) {
      console.log(cartItem);
      changeToCountable(addToCartBtnSingle, +cartItem.count);
    }
  });
}

window.onload = async function () {
  await onloadFunction();
  createSingleProduct();
  endLoading();
  changeButton();
};
