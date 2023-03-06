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
    console.log(stars)
    product.classList = "products--list__product";
    product.innerHTML = `
                    <div class="product--title">
                      <p>${obj.categoryName}</p>
                      <i class="fa-regular fa-heart" onclick="addWishList(this)"></i>
                    </div>
                    <div class="product--image">
                      <img
                        src="${obj.img}"
                        alt="glass"
                      />
                    </div>
                    <div class="stars"
                    ${stars}
                    </div>
                    <div class="product--content">
                      <p class="product--content__name">
                        ${obj.title}
                      </p>
                      <div class="product--content__details">
                        <p>₼<span class="amount">${obj.price}</span></p>
                        <button id="load${obj.id}" value="${obj.id}" onclick="" class="addToCart">Səbətə at</button>
                      </div>
                    </div>
        `;
    document.querySelector(".products--list").appendChild(product);
  });
  addEventToButtons();
}

window.addEventListener("load", async () => {
  // startLoading();
  await onloadFunction();
  getRandomProducts(); //! call the  squentially functions with order when window load
  // endLoading();
  changeButtonsAfterLoad();
});
