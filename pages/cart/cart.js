const table = document.querySelector("table");
let totalPriceCartItems = 0;
let methodPrice = 0;

function createCartItemsTable() {
  if (cartItemsList.length == 0) {
    document.querySelector(".cart").classList.add("hide");
    document.querySelector(".empty--cart").classList.remove("hide");
  } else {
    Array.from(table.childNodes).forEach((el, index) => {
      if (index != 0 && index != 1) {
        el.remove();
      }
    });
    totalPriceCartItems = 0;
    cartItemsList.forEach((cartItem) => {
      productList.forEach((product) => {
        if (cartItem.id == product.id) {
          totalPriceCartItems += cartItem.count * product.price;
          const listItem = document.createElement("tr");
          listItem.innerHTML = `
          <td class="product--details">
                        <img
                          src="${product.img[0]}"
                          alt="asdf"
                        />
                        <div>
                          <p class="product--details__name">
                            ${product.title}
                          </p>
                          <p class="product--details__category">${
                            product.categoryName
                          }</p>
                          <a class="delete" id="${cartItem.id}" href="#">Sil</a>
                        </div>
                      </td>
                      <td class="product--count">
                        <div class="product--count__content">
                          <button id="${cartItem.id}" class="decrease decrease${
            cartItem.id
          }" value="-">-</button>
                          <input class="cartItemCount" type="text"  value="${
                            cartItem.count
                          }" disabled />
                          <button id="${cartItem.id}" class="increase increase${
            cartItem.id
          }" value="+">+</button>
                        </div>
                      </td>
                      <td class="product--price">
                        <p>$ <span class="price-details"> ${
                          product.price
                        }</span></p>
                      </td>
                      <td class="product--total__price">
                        <p>$ <span class="total--price__detail">${(
                          product.price * cartItem.count
                        ).toFixed(2)}</span></p>
                      </td>
`;
          table.appendChild(listItem);
          let buttons = [`decrease${cartItem.id}`, `increase${cartItem.id}`];

          buttons.forEach((button) => {
            document
              .querySelector(`.${button}`)
              .addEventListener("click", (e) => {
                changeCount(e);
                createCartItemsTable();
                setCartPageDetails();
              });
          });
        }
      });
    });
    document.querySelectorAll(".delete").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        cartItemsList = cartItemsList.filter((el) => el.id != e.target.id);
        deleteCartItem(e);
        createCartItemsTable();
        setCartPageDetails();
      });
    });
  }
  endLoading();
}

//* set cart page details

function setCartPageDetails() {
  $(".product--count span").innerHTML = cartItemsList.length;
  $(".cart--content__order--count__pricee").innerHTML =
    totalPriceCartItems.toFixed(2);
  $(".cart--content__checkout--price").innerHTML = (
    methodPrice + totalPriceCartItems
  ).toFixed(2);

  let totalProducts = 0;
  cartItemsList.forEach((item) => {
    totalProducts += item.count;
  });

  $(".cart--content__order--count p:nth-child(1) span").innerHTML =
    totalProducts;
}

$("#shipping").addEventListener("input", (e) => {
  methodPrice = +e.target.value;
  setCartPageDetails();
});

window.addEventListener("load", async () => {
  await onloadFunction();
  createCartItemsTable();
  setCartPageDetails();
  endLoading();
});
