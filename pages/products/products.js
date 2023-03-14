const productListEl = document.querySelector(".products--list");
const productCount = document.querySelector(".count--showing");

//#region pagination

//* pagination elements
let paginationPagesParent = $(".pagination--pages");
let paginationCurrentPage = 1;
let paginationItemsCount = 20;
let paginationPagesCount;

function setPagination(PagesCount, data) {
  paginationPagesParent.innerHTML = "";
  for (let i = 1; i <= PagesCount; i++) {
    let paginationEl = document.createElement("div");
    paginationEl.classList = "pagination--page";
    paginationCurrentPage == i && (paginationEl.classList += " active");
    paginationEl.innerText = i;
    paginationPagesParent.appendChild(paginationEl);
    paginationEl.dataset.index = i;
  }

  if (PagesCount == 1) {
    paginationPagesParent.style.display = "none";
  } else {
    paginationPagesParent.style.display = "flex";
  }

  displayProducts(
    data.slice((paginationCurrentPage - 1) * 20, paginationCurrentPage * 20)
  );
}

function addEventPaginationButtons(data = productList) {
  let paginateButtons = document.querySelectorAll(".pagination--page");

  paginateButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      paginateButtons[paginationCurrentPage - 1].classList.remove("active");
      paginationCurrentPage = btn.dataset.index;
      btn.classList.add("active");

      displayProducts(
        data.slice((paginationCurrentPage - 1) * 20, paginationCurrentPage * 20)
      );
    });
  });
}

//#endregion pagination

// #region display all products in list
function displayProducts(list) {
  productListEl.innerHTML = "";
  if (list.length == 0) {
    productListEl.innerHTML =
      "Axtardığınız kateqoriya üzrə məhsul təəssüf ki yoxdur";
  }

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
  changeButtonsAfterLoad();
  addEventToButtons();
  window.scrollTo(0, 0);
}
// #endregion display all products in list

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
      paginationCurrentPage = 1;
      paginationPagesCount = Math.ceil(data.length / paginationItemsCount);
      setPagination(paginationPagesCount, data);
      addEventPaginationButtons(data);
      alreadyActive = false;
      isPriceChanged = false;
      filterFetchUrl = fethcUrl + "/products";
    });
}

// #endregion filter

window.addEventListener("load", async () => {
  await onloadFunction();
  quickviewModal();
  paginationPagesCount = Math.ceil(productList.length / paginationItemsCount);
  setPagination(paginationPagesCount, productList);
  addEventPaginationButtons();
  setPromotionSection();
  endLoading(); //!!!!!!!!!!!!!!!!!!!!!!
});

document.addEventListener("mousemove", (e) => {
  let filterItem = $(".filter");
  if (e.clientX < 20 && quickview.classList.contains("hide")) {
    filterItem.classList.remove("hide");
    overlay.classList.remove("hide");
  } else if (!filterItem.classList.contains("hide") && e.clientX > 350) {
    filterItem.classList.add("hide");
    overlay.classList.add("hide");
  }
});
