let shoppingCart = $(".shopping--cart");
let shoppingCartCloseBtn = $(".shopping--cart__close");
let shoppingCartList = $(".shopping--cart__list");
let shoppingCartTotalPrice = $(".suptotal--price");
let shoppingCartOpenBtn = $(".actions--cart");
let reRender = false;

function renderShoppingCart() {
  if (reRender) {
    $(".middle").classList.remove("hide");
  }

  if (cartItemsList.length == 0) {
    shoppingCart.classList.add("empty");
  } else {
    shoppingCart.classList.remove("empty");
  }

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
      reRender = true;
      changeCount(e);
      reRenderRelatedProduct(e);
    });
  });
  setTimeout(() => {
    $(".middle").classList.add("hide");
  }, 900);
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

function reRenderRelatedProduct(e) {
  let productItem = $(`#product${e.target.id}`);

  if (productItem) {
    if (e.target.value == "+") {
      productItem.value = Number(productItem.value) + 1;
    } else {
      if (productItem.value == 1) {
        changeToBtn(productItem.parentNode.querySelector(".decrease"));
      } else {
        productItem.value = Number(productItem.value) - 1;
      }
    }
  }
}

shoppingCartOpenBtn.addEventListener("click", () => {
  shoppingCart.classList.remove("hide");
  overlay.classList.remove("hide");
  isShoppingCartOpen = true;
  document.body.style.overflow = "hidden";
});
shoppingCartCloseBtn.addEventListener("click", () => {
  shoppingCart.classList.add("hide");
  overlay.classList.add("hide");
  isShoppingCartOpen = false;
  document.body.style.overflow = "unset";
});

overlay.addEventListener("click", () => {
  shoppingCart.classList.add("hide");
  isShoppingCartOpen = false;
  document.body.style.overflow = "unset";
});
