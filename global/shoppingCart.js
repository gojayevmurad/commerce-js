let shoppingCart = $(".shopping--cart");
let shoppingCartCloseBtn = $(".shopping--cart__close");
let shoppingCartList = $(".shopping--cart__list");
let shoppingCartTotalPrice = $(".suptotal--price");
let shoppingCartOpenBtn = $(".actions--cart");

function renderShoppingCart() {
  shoppingCartList.innerHTML =
    '<h4 class="shopping--cart__list--header">Səbətdəki Məhsullarınız</h4>';
  cartItemsList.forEach((item) => {
    let cartItem = document.createElement("div");
    cartItem.classList = "item";
    cartItem.innerHTML = `
    <img
    src="${productList[item.id - 1].img[0]}"
    alt="product">
    <div class="item--content">
        <h5><a href="#">${productList[item.id - 1].title}</a></h5>
        <p>₼<span class="price">${productList[item.id - 1].price}</span></p>
        <div class="item--content__bottom">
        <div class="cart--actions shoppingcart__buttons">
            <button id="${item.id}" value="-">-</button>
            <input class="cartItemCount" type="number" value="${
              item.count
            }" disabled>
            <button id="${item.id}" value="+">+</button>
        </div>
        <a href="#">Sil</a>
        </div>
    </div>
    `;
    shoppingCartList.appendChild(cartItem);
  });
  document.querySelectorAll(".shoppingcart__buttons button").forEach((item) => {
    item.addEventListener("click", (e) => {
      changeCount(e);
      
    });
  });
}

function showAndSetShoppingCart() {
  if (cartItemsList) {
    shoppingCart.classList.remove("empty");
    let totalPrice = 0;
    cartItemsList.forEach((item) => {
      totalPrice += productList[item.id - 1].price * item.count;
    });
    shoppingCartTotalPrice.innerHTML = "₼" + totalPrice.toFixed(2);
    renderShoppingCart();
  } else {
    shoppingCart.classList.add("empty");
  }
}

shoppingCartOpenBtn.addEventListener("click", () => {
  shoppingCart.classList.remove("hide");
  overlay.classList.remove("hide");
});
shoppingCartCloseBtn.addEventListener("click", () => {
  shoppingCart.classList.add("hide");
  overlay.classList.add("hide");
});

overlay.addEventListener("click", () => {
  shoppingCart.classList.add("hide");
});
