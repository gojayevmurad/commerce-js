let imgs = document.querySelectorAll(".parallax");
let swiperController = $(".swiper--controller");
let currentIndex = 0;
let lastIndex = imgs.length - 1;
let nextSlide = $(".nextBtn");
let prevSlide = $(".prevBtn");
let designCircles = document.querySelectorAll(".design--circle");

nextSlide.addEventListener("click", nextSlideFunc);

prevSlide.addEventListener("click", () => {
  if (currentIndex == 0) {
    currentIndex = lastIndex;
  } else {
    currentIndex--;
  }

  changeSlider();
});

function nextSlideFunc() {
  if (currentIndex == lastIndex) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }

  changeSlider();
}

//! get random products for display like top sales
function getRandomProducts() {
  let randomNums = [];
  for (let i = 0; i < 4; i++) {
    randomNums.push(Math.floor(Math.random() * 150));
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
      for (let i = 0; i <= 5; i++) {
        if (i <= popularity) {
          stars += '<span class="fa fa-star checked"></span>';
        } else {
          stars += '<span class="fa fa-star unchecked"></span>';
        }
      }
    })();
    console.log(stars);
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
                      <div class="stars"
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

  setInterval(() => {
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
}

setLandingSwiper();

window.addEventListener("load", async () => {
  await onloadFunction();
  getRandomProducts(); //! call the  squentially functions with order when window load
  endLoading();
  changeButtonsAfterLoad();
});
