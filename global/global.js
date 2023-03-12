// console.clear();
let $ = (data) => document.querySelector(data);
let productList = [];
let cartItemsList = [];
let preloader = $(".preloader");
let searchInput = $(".actions--search__input");
let searchList = $(".actions--search__products");
let filteredArr = [];
let viewMore = false;
let countPr = 0;
let overlay = $(".overlay");
let fethcUrl = "http://localhost:3000";

//! get products & cart items from json server
async function onloadFunction() {
  await fetch(`${fethcUrl}/products`)
    .then((res) => res.json())
    .then((products) => {
      productList = products;
    });

  await fetch(`${fethcUrl}/cart`)
    .then((res) => res.json())
    .then((cartItems) => {
      cartItemsList = cartItems;
    });
}

//! add to cart function
function addToCartAndThenChangeButton(id, target) {
  cartItemsList[cartItemsList.length] = { id: id, count: 1 };
  fetch(`${fethcUrl}/cart`, {
    method: "POST",
    body: JSON.stringify({
      id: id,
      count: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).finally((data) => {
    createNotification("success", "Səbətə əlavə olundu");
    changeToCountable(target);
  });
}

//! change add to cart btn
function changeToCountable(target, value = 1) {
  let changeCountDisplay = document.createElement("div");
  changeCountDisplay.classList = "product--content__details--changecount";
  changeCountDisplay.innerHTML = `
      <button  id="${target.value}" class="decrease decrease${target.value}" value="-">-</button>
      <input class="cartItemCount" type="text" disabled value="${value}">
      <button id="${target.value}" class="increase increase${target.value}" value="+">+</button>
      `;
  target.parentNode.replaceChild(changeCountDisplay, target);

  let buttons = [`decrease${target.value}`, `increase${target.value}`];

  buttons.forEach((button) => {
    document.querySelector(`.${button}`).addEventListener("click", (e) => {
      changeCount(e);
    });
  });
}

//! change to add to cart btn
function changeToBtn(target) {
  let addToCartBtn = document.createElement("button");
  addToCartBtn.value = target.value;
  addToCartBtn.setAttribute("value", target.id);
  addToCartBtn.setAttribute("class", "addToCart");
  addToCartBtn.setAttribute("id", `load${target.id}`);
  addToCartBtn.innerText = "Səbətə at";

  target.parentNode.parentNode.replaceChild(addToCartBtn, target.parentNode);
  addToCartBtn.onclick = (e) => {
    addToCartAndThenChangeButton(+target.id, e.target);
  };
}

//! change cart items count
function changeCount(e) {
  let changeCountInput = e.target.parentNode.querySelector(".cartItemCount"),
    oper = e.target.value;
  switch (oper) {
    case "+":
      changeCountInput.value = +changeCountInput.value + 1;
      break;
    case "-":
      changeCountInput.value = +changeCountInput.value - 1;
      break;
    default:
      break;
  }
  if (changeCountInput.value == 0) {
    changeToBtn(e.target);
  }
  cartItemsList.map((el) => {
    if (el.id == e.target.id) {
      if (oper == "-") el.count--;
      if (oper == "+") el.count++;
    }
    cartItemsList = cartItemsList.filter((el) => el.count !== 0);
  });

  if (changeCountInput.value == 0) {
    deleteCartItem(e);
  } else {
    fetch(`${fethcUrl}/cart/${e.target.id}`, {
      method: "PUT",
      body: JSON.stringify({
        count: +changeCountInput.value,
      }),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=UTF-8",
      },
    }).catch((data) => console.log(data));
  }
}

function changeButtonsAfterLoad() {
  if (cartItemsList.length > 0) {
    cartItemsList.forEach((item) => {
      productList.forEach((product) => {
        if (item.id == product.id) {
          let btn = document.querySelector(`#load${item.id}`);
          if (btn) {
            changeToCountable(btn, +item.count);
          }
        }
      });
    });
  } else {
    return;
  }
}

//! add modal to quickview

function quickviewModal() {
  let quickviewItems = document.querySelectorAll(
    ".products--list__product--quickview"
  );
}

//! add event to buttons
function addEventToButtons() {
  let buttons = document.querySelectorAll(".addToCart");

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      addToCartAndThenChangeButton(+e.target.value, e.target);
    });
  });
}

//! notifications
const notifications = document.querySelector(".notifications");

const notifactionDetails = {
  timer: 5000,
  error: {
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e24d4c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
  },
  success: {
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0abf30" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-square"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>',
  },
  warning: {
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e9bd0c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-triangle"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
  },
  info: {
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3498db" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',
  },
  cancel:
    '<svg onclick=deleteNotification(this.parentElement) class="cancel" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"> <line x1="18" y1="6" x2="6" y2="18"></line> <line x1="6" y1="6" x2="18" y2="18"></line> </svg>',
};

const deleteNotification = (toast) => {
  toast.classList.add("hide");
  setInterval(() => {
    toast.remove();
  }, 100);
};

const createNotification = (id, msg) => {
  const notification = document.createElement("li");
  notification.id = id;
  let text = msg,
    svg = notifactionDetails[id].svg;

  const cancelBtn = notifactionDetails.cancel;
  notification.classList = "notification";
  notification.innerHTML = `
        <div class="content">
            <div>
                ${svg}
            </div>
            <p>${text}</p>
        </div>
        ${cancelBtn}
    `;
  notifications.appendChild(notification);
  setTimeout(() => {
    deleteNotification(notification);
  }, 5000);
};

searchInput.addEventListener("input", (e) => {
  filteredArr = [];
  productList.forEach((product) => {
    if (
      e.target.value.trim() != "" &&
      product.title.toLowerCase().includes(e.target.value.toLowerCase().trim())
    ) {
      filteredArr.push(product);
    }
  });

  if (e.target.value.trim() == "") {
    $(".actions--search").classList.add("hide");
    overlay.classList.add("hide");
    searchInput.value = "";
    searchList.innerHTML = "";
    return;
  }

  if (filteredArr.length >= 5) {
    countPr = 5;
    viewMore = true;
  } else {
    countPr = filteredArr.length;
  }

  searchList.innerHTML = "";
  $(".actions--search").classList.remove("hide");
  overlay.classList.remove("hide");
  overlay.addEventListener("click", (e) => {
    $(".actions--search").classList.add("hide");
    overlay.classList.add("hide");
    searchInput.value = "";
  });

  window.addEventListener("scroll", () => {
    $(".actions--search").classList.add("hide");
    overlay.classList.add("hide");
    searchInput.value = "";
  });

  for (let i = 0; i < countPr; i++) {
    let el = filteredArr[i];
    let searchItem = document.createElement("div");
    searchItem.classList = "actions--search__products--item";
    let popularity = Math.ceil(el.popularity);
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
    searchItem.innerHTML = `
      <img src="${el.img[0]}" alt="item">
  
      <div class="content">
        <div class="content__top">
          <p>${el.categoryName}</p>
          <div class="stars">
            ${stars}
          </div>
        </div>
  
        <p class="content__name">
          ${el.title}
        </p>
      </div>
      `;
    let line = document.createElement("div");
    line.classList = "line";
    searchList.append(searchItem, line);
    searchItem.addEventListener("click", (e) => {
      window.location.href = `/pages/singleProduct/singleProduct.html?id=${el.id}`;
    });
  }
});

//! delete cart item

function deleteCartItem(e) {
  fetch(`http://localhost:3000/cart/${e.target.id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .catch((data) => console.log(data))
    .finally((data) => {
      createNotification("error", "Səbətdən silindi");
    });
}

//! end loading

function endLoading() {
  setTimeout(() => {
    preloader.className += " fade";
  }, 500);
  setTimeout(() => {
    preloader.remove();
  }, 700);
}

//! quickview slider

function quickViewSlider() {
  let prevBtn = $(".quickview--prevBtn");
  let nextBtn = $(".quickview--nextBtn");
  let quickviewSliders = document.querySelectorAll(
    ".quickview--modal__slider--slide"
  );
  let currentIndex = 0;
  let lastIndex = quickviewSliders.length - 1;

  quickviewSliders.forEach((slide, index) => {
    slide.style.transform = `translateX(${index * 100}%)`;
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex == lastIndex) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
    quickviewSliders.forEach((slide, index) => {
      let percent = (index - currentIndex) * 100;
      slide.style.transform = `translateX(${percent}%)`;
    });
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex == 0) {
      currentIndex = lastIndex;
    } else {
      currentIndex--;
    }

    quickviewSliders.forEach((slide, index) => {
      let percent = (index - currentIndex) * 100;
      slide.style.transform = `translateX(${percent}%)`;
    });
  });
}

function displayQuickView(id) {
  let item = productList[id - 1];
  let quickview = $(".quickview--modal");
  let quickviewModalSlider = $(".quickview--modal__slider");
  let quickviewProductName = $(".quickview-name");
  let quickviewPrice = $(".quickview-price");
  let quickviewStars = $(".quickview-stars");
  let popularity = Math.ceil(item.popularity);
  let stars = "";

  for (let i = 0; i < item.img.length; i++) {
    let slide = document.createElement("div");
    slide.classList = "quickview--modal__slider--slide";
    slide.innerHTML = `
    <img
    src="${item.img[i]}"
    alt="item ">
    `;
    quickviewModalSlider.appendChild(slide);
  }
  quickviewProductName.innerText = item.title;
  quickviewPrice.innerText = item.price;

  for (let i = 0; i < 5; i++) {
    if (i <= popularity) {
      stars += '<span class="fa fa-star checked"></span>';
    } else {
      stars += '<span class="fa fa-star unchecked"></span>';
    }
  }
  quickviewStars.innerHTML = stars;
  quickViewSlider();

  quickview.classList.remove("hide");
  overlay.classList.remove("hide");
  overlay.addEventListener("click", () => quickviewReset());

  window.addEventListener("scroll", () => quickviewReset());
  window.addEventListener("keydown", (e) => {
    if (e.key == "Escape") quickviewReset();
  });

  function quickviewReset() {
    document
      .querySelectorAll(".quickview--modal__slider--slide")
      .forEach((img) => {
        img.remove();
      });
    overlay.classList.add("hide");
    quickview.classList.add("hide");
  }
}


window.addEventListener('error',()=>{
  document.body.innerHTML = "error"
})