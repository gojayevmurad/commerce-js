const productListEl = document.querySelector(".products--list");

const productCount = document.querySelector(".count--showing");

//! display all products in list
function displayProducts(list) {
  list.forEach((productObj) => {
    let product = document.createElement("div");
    product.classList = "products--list__product";
    let scaleClassName;
    let popularity = Math.ceil(productObj.popularity);
    let stars = "";
    (() => {
      for (let i = 0; i < 5; i++) {
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
  <div class="products--list__product--quickview" data-id="${productObj.id}">
    Cəld Baxış
  </div>
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

  <div class="product--content">
    <a href="../singleProduct/singleProduct.html?id=${
      productObj.id
    }" class="product--content__name">

      ${
        productObj.title.length > 32
          ? productObj.title.slice(0, 29) + "..."
          : productObj.title
      }
    </a>
    <div class="stars">
    ${stars}
    </div>
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
    product
      .querySelector(".products--list__product--quickview")
      .addEventListener("click", () => {
        displayQuickView(productObj.id);
      });
  });
  addEventToButtons();
}

//#region Price range
const rangeInput = document.querySelectorAll(".range-input input"),
  priceInput = document.querySelectorAll(".price-input input"),
  range = document.querySelector(".slider .progress");
let priceGap = 50;

priceInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minPrice = parseInt(priceInput[0].value),
      maxPrice = parseInt(priceInput[1].value);

    if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
      if (e.target.className === "input-min") {
        rangeInput[0].value = minPrice;
        range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
      } else {
        rangeInput[1].value = maxPrice;
        range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
      }
    }
  });
});

rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minVal = parseInt(rangeInput[0].value),
      maxVal = parseInt(rangeInput[1].value);

    if (maxVal - minVal < priceGap) {
      if (e.target.className === "range-min") {
        rangeInput[0].value = maxVal - priceGap;
      } else {
        rangeInput[1].value = minVal + priceGap;
      }
    } else {
      priceInput[0].value = minVal;
      priceInput[1].value = maxVal;
      range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
      range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
    }
  });
});
// #endregion Price range

// #region filter
let filterForm = $(".filter--body");
filterForm.addEventListener("submit", getFilterData);
let isPriceChanged = false;

let priceMinRange = $(".range-min");
let priceMaxRange = $(".range-max");
let priceMaxInput = $(".input-min");
let priceMinInput = $(".input-max");

priceMinRange.addEventListener("input", () => (isPriceChanged = true));
priceMaxRange.addEventListener("input", () => (isPriceChanged = true));
priceMinInput.addEventListener("input", () => (isPriceChanged = true));
priceMaxInput.addEventListener("input", () => (isPriceChanged = true));



function getFilterData(e) {
  e.preventDefault();
  let categoryData = e.target.category.value;
  let ratingData = e.target.rating.value;
  let minPriceData = e.target.querySelector(".range-min").value;
  let maxPriceData = e.target.querySelector(".range-max").value;
  let orderData = e.target.order.value;
  let alreadyActive = false;

  let filterFetchUrl = fethcUrl + "/products";

  if (categoryData) {
    filterFetchUrl += `?categoryID=${categoryData}`;
    alreadyActive = true;
  }
  if (ratingData) {
    filterFetchUrl += `${
      alreadyActive ? "&" : "?"
    }popularity_gte=${ratingData}`;
    alreadyActive = true;
  }

  if (isPriceChanged) {
    filterFetchUrl += `${
      alreadyActive ? "&" : "?"
    }price_gte=${minPriceData}&price_lte=${maxPriceData}`;
    alreadyActive = true;
  }

  if (orderData) {
    filterFetchUrl += `${
      alreadyActive ? "&" : "?"
    }_sort=order&_order=${orderData}`;
  }

  fetch(filterFetchUrl)
    .then((res) => res.json())
    .then((data) => {
      $(".products--list").innerHTML = "";
      displayProducts(data);
      alreadyActive = false;
      isPriceChanged = false;
      filterFetchUrl = fethcUrl + "/products";
    });
}




// #endregion filter

window.addEventListener("load", async () => {
  await onloadFunction();
  displayProducts(productList);
  changeButtonsAfterLoad();
  quickviewModal();
  endLoading(); //!!!!!!!!!!!!!!!!!!!!!!
});

document.addEventListener("mousemove", (e) => {
  let filterItem = $(".filter");
  if (e.clientX < 20) {
    filterItem.classList.remove("hide");
    overlay.classList.remove("hide");
  } else if (!filterItem.classList.contains("hide")) {
    //!görünür hal hazırda
    if (e.clientX > 350) {
      filterItem.classList.add("hide");
      overlay.classList.add("hide");
    }
  }
});
