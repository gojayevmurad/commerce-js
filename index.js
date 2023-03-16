let imgs = document.querySelectorAll(".parallax");
let swiperController = $(".swiper--controller");
let currentIndex = 0;
let lastIndex = imgs.length - 1;
let nextSlide = $(".nextBtn");
let prevSlide = $(".prevBtn");
let designCircles = document.querySelectorAll(".design--circle");
let interval = "";

nextSlide.addEventListener("click", () => nextSlideFunc());

function nextSlideFunc() {
  if (currentIndex == lastIndex) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }

  changeSlider();
}

prevSlide.addEventListener("click", () => {
  if (currentIndex == 0) {
    currentIndex = lastIndex;
  } else {
    currentIndex--;
  }
  changeSlider();
});

//! get random products for display like top sales
function getRandomProducts() {
  let randomNums = [];
  for (let i = 0; i < 5; i++) {
    let randomNum = Math.floor(Math.random() * 150);
    if (productList[randomNum].inStock && !randomNums.includes(randomNum)) {
      randomNums.push(randomNum);
    } else {
      i--;
    }
  }

  randomNums.forEach((num) => {
    productList.filter((item) => {
      return item.id != num;
    });
  });

  randomNums.forEach((num) => {
    let obj = productList[num];
    let product = document.createElement("div");
    let popularity = Math.ceil(obj.popularity);
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
    product.classList = "products--list__product";
    product.innerHTML = `
                    <div class="products--list__product--quickview" data-id="${
                      obj.id
                    }">
                      Cəld Baxış
                    </div>
                    <div class="product--title">
                      <p>${obj.categoryName}</p>
                      <i class="fa-regular fa-heart" onclick="addWishList(this)"></i>
                    </div>
                    <div class="product--image">
                    <img class="frontimage" src="${obj.img[0]}" alt="glass" />
                    <img class="backimage" src=${obj.img[1]} alt="backimage"/>
                    </div>

                    <div class="product--content">
                      <a href="/pages/singleProduct/singleProduct.html?id=${
                        obj.id
                      }" class="product--content__name">
                      ${
                        obj.title.length > 32
                          ? obj.title.slice(0, 29) + "..."
                          : obj.title
                      }
                      </a>
                      <div class="stars">
                      ${stars}
                      </div>
                      <div class="product--content__details">
                        <p>₼<span class="amount">${obj.price}</span></p>
                        <button id="load${obj.id}" value="${obj.id}" ${
      obj.inStock ? "" : "disabled"
    } onclick="" class="addToCart">${
      obj.inStock ? "Səbətə at" : "Stokda yoxdur"
    }</button>
                      </div>
                    </div>
        `;
    document.querySelector(".products--list").appendChild(product);
    product
      .querySelector(".products--list__product--quickview")
      .addEventListener("click", () => {
        displayQuickView(obj.id);
      });
  });

  addEventToButtons();
}

function setLandingSwiper() {
  imgs.forEach((img, index) => {
    let swiperControllerDot = document.createElement("div");
    swiperControllerDot.classList = "swiper--controller__dot";
    if (index == 0) {
      swiperControllerDot.classList += " active";
    }
    swiperController.appendChild(swiperControllerDot);
    swiperControllerDot.addEventListener("click", () => {
      currentIndex = index;
      changeSlider();
    });
  });

  document.addEventListener("mousemove", function (event) {
    var x = event.clientX / window.innerWidth;
    var y = event.clientY / window.innerHeight;
    designCircles.forEach((circle) => {
      circle.style.transform = "translate(" + x * 50 + "px, " + y * 50 + "px)";
    });
    imgs.forEach((img) => {
      img.style.transform = "translate(-" + x * 50 + "px, -" + y * 50 + "px)";
    });
  });

  createInterval();
}

function createInterval() {
  clearInterval(interval);

  interval = setInterval(() => {
    nextSlideFunc();
  }, 4000);
}

function changeSlider() {
  let dots = document.querySelectorAll(".swiper--controller__dot");
  imgs.forEach((img) => {
    img.parentNode.classList.add("hide");
  });
  dots.forEach((dot) => {
    dot.classList.remove("active");
  });
  dots[currentIndex].classList.add("active");
  imgs[currentIndex].parentNode.classList.remove("hide");
  createInterval();
}

async function getBlogs() {
  let blogs = [];
  let blogList = $(".blogs--list");
  let randomNums = [];
  while (true) {
    let random = Math.ceil(Math.random() * 6);
    if (!randomNums.includes(random)) {
      randomNums.push(random);
    }

    if (randomNums.length == 3) {
      console.log(randomNums);
      break;
    }
  }
  await fetch(
    fethcUrl +
      `/blogs?id=${randomNums[0]}&id=${randomNums[1]}&id=${randomNums[2]}`
  )
    .then((res) => res.json())
    .then((data) => {
      blogs = data;
      console.log(blogs);
    });

  blogs.forEach((blogObj) => {
    let blogEl = document.createElement("div");
    blogEl.classList = "blogs--list__blog";
    blogEl.innerHTML = `
    
    <div class="blogs--list__blog--img">
      <a href="./pages/singleBlog/singleBlog.html?id=${blogObj.id}">
        <img
        src="${blogObj.img}"
        alt="8 Casual Trouser Styles">
      </a>
    </div>
    <div class="blogs--list__blog--content">
    <h4>
      Yazı tarixi <span class="date">${blogObj.date}</span>
    </h4>
    <h2 class="blog--title">
      <a href="./pages/singleBlog/singleBlog.html?id=${blogObj.id}">${
      blogObj.title.length > 23
        ? blogObj.title.slice(0, 20) + "..."
        : blogObj.title
    }</a>
    </h2>
    <div class="blog--desc">
      It is accompanied by a case that can contain up to three different diffusers and can be used for dry …
    </div>
    <button>Oxumağa Davam</button>
    </div>
    
    `;

    blogList.appendChild(blogEl);
    blogEl
      .querySelector(".blogs--list__blog--content button")
      .addEventListener("click", () => {
        window.location =
          window.location.origin +
          `/pages/singleBlog/singleBlog.html?id=${blogObj.id}`;
      });
  });
}
getBlogs();
setLandingSwiper();

window.addEventListener("load", async () => {
  await onloadFunction();
  getRandomProducts(); //! call the  squentially functions with order when window load
  changeButtonsAfterLoad();
  setPromotionSection();
  showAndSetShoppingCart();
  endLoading();
});
