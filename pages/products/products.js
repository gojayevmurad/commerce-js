const productListEl = document.querySelector(".products--list");
const tableView = document.querySelector(".products--decoration__table");
const listView = document.querySelector(".products--decoration__list");
const buttons = [tableView, listView];
const productCount = document.querySelector(".count--showing");

//! products view
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    startLoading(); //!!!!!!!!!!!!!!!!!!!!!!
    if (button.dataset.val == "list") {
      productListEl.classList.add("list");
    } else {
      productListEl.classList.remove("list");
    }
    endLoading(); //!!!!!!!!!!!!!!!!!!!!!!
  });
});

//! display all products in list
function displayProducts(list) {
  productCount.innerHTML = list.length;
  list.forEach((productObj) => {
    let product = document.createElement("div");
    product.classList = "products--list__product";
    let scaleClassName;
    let popularity = Math.ceil(productObj.popularity);
    let stars = "";
    (() => {
      for (let i = 0; i <= 5; i++) {
        if (i <= popularity) {
          stars += '<span class="fa fa-star checked"></span>';
        } else {
          stars += '<span class="fa fa-star unchecked"></span>';
        }
      }
    })();

    //? add
    switch (productObj.categoryID) {
      case 1:
        scaleClassName = "clothing";
        break;
      case 2:
        scaleClassName = "shoes";
        break;
      case 3:
        scaleClassName = "accessories";
        break;
      case 4:
        scaleClassName = "watches";
        break;
      default:
        break;
    }
    product.innerHTML = `
  <div class="product--title">
    <p>${productObj.categoryName}</p>
    <i class="fa-regular fa-heart" onclick="addWishList(this)"></i>
  </div>
  <div class="product--image">
    <img
    class="frontimage"
      src="${productObj.img[0]}"
      alt="glass"
    />
    <img class="backimage" src=${productObj.img[1]} alt="backimage"/>
  </div>
  <div class="stars"
  ${stars}
  </div>
  <div class="product--content">
    <a href="../singleProduct/singleProduct.html?id=${productObj.id}" class="product--content__name">
      ${
        productObj.title.length > 32
          ? productObj.title.slice(0, 29) + "..."
          : productObj.title
      }
    </a>
    <div class="product--content__details">
      <p>₼<span class="amount">${productObj.price}</span></p>
      <button id="load${productObj.id}" value="${productObj.id}" ${
      productObj.inStock ? "" : "disabled"
    } class="addToCart">${
      productObj.inStock ? "Səbətə at" : "Stokda yoxdur"
    }</button>
    </div>
  </div>
`;

    productListEl.appendChild(product);
  });
  addEventToButtons();
}

window.addEventListener("load", async () => {
  await onloadFunction();
  displayProducts(productList);
  changeButtonsAfterLoad();
  endLoading(); //!!!!!!!!!!!!!!!!!!!!!!
});


